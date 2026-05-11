import React, { useEffect, useRef, useState } from "react";
import styles from "./card-text.module.scss";

interface ICardText {
    text: string;
}

const CardText: React.FC<ICardText> = ({ text }) => {
    const [isWrapped, setIsWrapped] = useState(true);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setIsWrapped(true);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (<div ref={ref} className={styles.cardContainer} onClick={() => setIsWrapped(!isWrapped)}>
        <p className={isWrapped ? styles.wrapped : ""}>{text}</p>
    </div>);
}

export default CardText;