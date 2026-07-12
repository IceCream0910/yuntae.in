interface CardProps {
    children: React.ReactNode;
    className?: string;
    size?: string;
    index?: number;
    onReveal?: () => void;
}

import { motion, useReducedMotion } from "framer-motion";

function getSizeClass(size: string): string {
    switch (size) {
        case "2x1":
            return "col-span-1 row-span-1 lg:col-span-2";
        case "1x1":
        default:
            return "col-span-1 row-span-1";
    }
}

export default function Card({ children, className = "", size, index = 0, onReveal }: CardProps) {
    const sizeClass = size ? getSizeClass(size) : "";
    const shouldReduceMotion = useReducedMotion();

    return (
        <motion.article
            className={`bg-[var(--secondary)] text-[var(--foreground)] rounded-3xl p-6 overflow-hidden ${sizeClass} ${className}`}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 28, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
                duration: shouldReduceMotion ? 0 : 0.62,
                delay: shouldReduceMotion ? 0 : index * 0.085,
                ease: [0.22, 1, 0.36, 1],
            }}
            onAnimationComplete={onReveal}
        >
            <div className={`${size === "1x1" ? "aspect-square" : "aspect-square lg:aspect-auto"} flex flex-col`}>
                {children}
            </div>
        </motion.article>
    );
}
