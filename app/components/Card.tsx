interface CardProps {
    children: React.ReactNode;
    className?: string;
    size?: string;
    index?: number;
    onReveal?: () => void;
    tone?: string;
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

export default function Card({ children, className = "", size, index = 0, onReveal, tone }: CardProps) {
    const sizeClass = size ? getSizeClass(size) : "";
    const shouldReduceMotion = useReducedMotion();

    return (
        <motion.article
            className={`${tone ? `widget-card widget-${tone}` : "bg-[var(--secondary)] text-[var(--foreground)] rounded-3xl p-6 overflow-hidden"} ${sizeClass} ${className}`}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 28, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
                duration: shouldReduceMotion ? 0 : 0.62,
                delay: shouldReduceMotion ? 0 : Math.min(index * 0.055, 0.35),
                ease: [0.22, 1, 0.36, 1],
            }}
            onAnimationComplete={onReveal}
            whileHover={shouldReduceMotion ? undefined : { y: -5, transition: { type: "spring", stiffness: 300, damping: 22, delay: 0 } }}
        >
            <div className={`${size === "1x1" ? "aspect-square" : "aspect-square lg:aspect-auto"} flex flex-col ${tone ? "widget-content" : ""}`}>
                {children}
            </div>
        </motion.article>
    );
}
