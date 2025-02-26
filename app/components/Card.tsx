interface CardProps {
    children: React.ReactNode;
    className?: string;
    size?: string;
}

function getSizeClass(size: string): string {
    switch (size) {
        case "2x1":
            return "col-span-1 row-span-1 lg:col-span-2";
        case "1x1":
        default:
            return "col-span-1 row-span-1";
    }
}

export default function Card({ children, className, size }: CardProps) {
    const sizeClass = size ? getSizeClass(size) : "";
    return (
        <div className={`bg-[var(--secondary)] text-[var(--foreground)] rounded-3xl p-6 overflow-hidden ${sizeClass} ${className}`}>
            <div className={`${size === "1x1" ? "aspect-square" : "aspect-square lg:aspect-auto"} flex flex-col`}>
                {children}
            </div>
        </div>
    );
}
