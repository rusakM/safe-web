import { readFile, access, constants } from 'node:fs/promises';
import { EncodingOption } from 'node:fs';

export async function checkExist(location: string): Promise<boolean> {
    return await access(location, constants.R_OK)
        .then(() => true)
        .catch(() => false);
}

export async function read(location: string, encoding: EncodingOption = 'utf-8'): Promise<string | Buffer<ArrayBuffer>> {
    try {
        if (await checkExist(location)) {
            return await readFile(location, encoding);
        }
        return null;
    } catch {
        return null;
    }
}
