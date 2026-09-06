"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Theme = "system" | "light" | "dark";
const ThemeContext = createContext<{ theme: Theme; changeTheme: (theme: Theme) => void }>({ theme: "system", changeTheme: () => {} });
const storageKey = "yuntae-theme";

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>("system");
    useEffect(() => {
        const saved = document.documentElement.dataset.themePreference;
        if (saved === "light" || saved === "dark") setTheme(saved);
        const media = window.matchMedia("(prefers-color-scheme: dark)");
        const update = () => {
            const preference = document.documentElement.dataset.themePreference ?? "system";
            document.documentElement.dataset.theme = preference === "system" ? (media.matches ? "dark" : "light") : preference;
        };
        update();
        media.addEventListener("change", update);
        return () => media.removeEventListener("change", update);
    }, []);

    const changeTheme = (next: Theme) => {
        setTheme(next);
        document.documentElement.dataset.themePreference = next;
        document.documentElement.dataset.theme = next === "system" ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light") : next;
        try { localStorage.setItem(storageKey, next); } catch { /* Theme still works when storage is unavailable. */ }
    };
    return <ThemeContext.Provider value={{ theme, changeTheme }}>{children}</ThemeContext.Provider>;
}

export function ThemeSwitch() {
    const { theme, changeTheme } = useContext(ThemeContext);
    return (
        <div className="flex shrink-0 gap-1 rounded-full border border-black/5 bg-[var(--secondary)] p-1 dark:border-white/10" role="group" aria-label="화면 테마">
            {([{ value: "system", label: "시스템 테마", icon: "◐" }, { value: "light", label: "라이트 테마", icon: "☀" }, { value: "dark", label: "다크 테마", icon: "☾" }] as const).map(option => (
                <button key={option.value} onClick={() => changeTheme(option.value)} aria-label={option.label} aria-pressed={theme === option.value} title={option.label} className={`flex h-8 w-8 items-center justify-center rounded-full text-base transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${theme === option.value ? "bg-[var(--background)] shadow-sm" : "opacity-50 hover:opacity-100"}`}>{option.icon}</button>
            ))}
        </div>
    );
}
