"use client";

const links = [
    {
        label: "GitHub",
        href: "https://github.com/icecream0910",
        external: true,
    },
    {
        label: "Blog",
        href: "https://blog.yuntae.in",
        external: true,
    },
    {
        label: "Email",
        href: "mailto:hey@yuntae.in",
        external: false,
    },
    {
        label: "Resume",
        href: "/resume",
        external: false,
    }
];

export default function SocialLinks({ className = "" }: { className?: string }) {
    return (
        <div className={`flex items-center gap-4 ${className}`} aria-label="외부 링크">
            {links.map((link) => (
                <a
                    key={link.label}
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    aria-label={link.label}
                    title={link.label}
                    className="text-lg font-medium text-gray-500 underline decoration-dotted decoration-zinc-400 transition-colors hover:text-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 dark:decoration-zinc-600"
                >
                    {link.label}
                </a>
            ))}
        </div>
    );
}
