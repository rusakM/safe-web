#!/usr/bin/env node

/**
 * Antigravity CLI Command Gate Hook
 * Automatically permits safe inspection/test commands while strictly blocking destructive operations.
 */

let inputData = '';

process.stdin.setEncoding('utf8');

process.stdin.on('data', (chunk) => {
    inputData += chunk;
});

process.stdin.on('end', () => {
    try {
        if (!inputData.trim()) {
            process.stdout.write(JSON.stringify({ decision: 'ask' }));
            return;
        }

        const payload = JSON.parse(inputData);
        const commandLine = payload?.toolCall?.args?.CommandLine?.trim() || '';

        // 1. HARD DENY - Destructive commands
        const blockedPatterns = [
            /\bgit\s+push\b/i,
            /\bgit\s+reset\b/i,
            /\bgit\s+clean\b/i,
            /\bgit\s+checkout\s+--/i,
            /\brm\s+(-[a-zA-Z]*r[a-zA-Z]*f|-[a-zA-Z]*f[a-zA-Z]*r|--recursive)\b/i,
            /\bsudo\b/i,
            /\bmkfs\b/i,
            /\bmongosh\b/i,
            /\bmongo\s/i,
            /\bredis-cli\b/i,
            /\bdocker\s+exec\b/i
        ];

        for (const pattern of blockedPatterns) {
            if (pattern.test(commandLine)) {
                process.stdout.write(JSON.stringify({
                    decision: 'deny',
                    reason: `Operacja zablokowana przez politykę bezpieczeństwa SafeWeb: ${commandLine}`
                }));
                return;
            }
        }

        // 2. AUTO-ALLOW - Safe read, file copy and test commands
        const allowedPatterns = [
            /^(ls|dir)(\s+.*)?$/,
            /^(cat|head|tail|grep|find|pwd|which|echo|wc|sed)(\s+.*)?$/,
            /^(cp|mkdir|mv|touch)(\s+.*)?$/,
            /^git\s+(status|diff|log|branch|show)(\s+.*)?$/,
            /^(node|npm|npx)\s+(-v|--version)$/,
            /^(npm\s+test|npx\s+vitest)(\s+.*)?$/,
            /^npm\s+run\s+(test|lint|build)(\s+.*)?$/,
            /^(npx\s+)?tsc(\s+.*)?$/
        ];

        for (const pattern of allowedPatterns) {
            if (pattern.test(commandLine)) {
                process.stdout.write(JSON.stringify({
                    decision: 'allow'
                }));
                return;
            }
        }

        // 3. ASK - Everything else requires standard confirmation
        process.stdout.write(JSON.stringify({
            decision: 'ask',
            reason: `Wymaga potwierdzenia użytkownika: ${commandLine}`
        }));
    } catch (err) {
        process.stdout.write(JSON.stringify({
            decision: 'ask',
            reason: `Błąd parsowania hooka: ${err?.message || 'Nieznany błąd'}`
        }));
    }
});
