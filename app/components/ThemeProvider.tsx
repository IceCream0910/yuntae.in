"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { flushSync } from "react-dom";

type Theme = "system" | "light" | "dark";
const ThemeContext = createContext<{ theme: Theme; changeTheme: (theme: Theme) => void }>({ theme: "system", changeTheme: () => {} });
const storageKey = "yuntae-theme";
const systemThemeQuery = "(prefers-color-scheme: dark)";

export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>("system");
    const request = useRef(0);
    const activeTransition = useRef<ViewTransition | null>(null);
    useEffect(() => {
        const saved = document.documentElement.dataset.themePreference;
        if (saved === "light" || saved === "dark") setTheme(saved);
        const media = window.matchMedia(systemThemeQuery);
        const update = () => {
            const preference = document.documentElement.dataset.themePreference ?? "system";
            document.documentElement.dataset.theme = preference === "system" ? (media.matches ? "dark" : "light") : preference;
        };
        update();
        media.addEventListener("change", update);
        return () => media.removeEventListener("change", update);
    }, []);

    const changeTheme = (next: Theme) => {
        const root = document.documentElement;
        const resolved = next === "system" ? (window.matchMedia(systemThemeQuery).matches ? "dark" : "light") : next;
        const id = ++request.current;
        const apply = () => {
            if (id !== request.current) return;
            setTheme(next);
            root.dataset.themePreference = next;
            root.dataset.theme = next === "system" ? (window.matchMedia(systemThemeQuery).matches ? "dark" : "light") : next;
            try { localStorage.setItem(storageKey, next); } catch { /* Theme still works when storage is unavailable. */ }
        };

        activeTransition.current?.skipTransition();
        if (!document.startViewTransition || root.dataset.theme === resolved || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            apply();
            return;
        }

        const transition = document.startViewTransition(() => flushSync(apply));
        activeTransition.current = transition;
        const clear = () => {
            if (activeTransition.current === transition) activeTransition.current = null;
        };
        void transition.finished.then(clear, clear);
    };
    return <ThemeContext.Provider value={{ theme, changeTheme }}>{children}</ThemeContext.Provider>;
}
