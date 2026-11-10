"use client";

import { useEffect, useId, useRef, useState } from "react";
import IonIcon from "@reacticons/ionicons";
import { useTheme } from "./ThemeProvider";

const options = [
    { value: "system", label: "시스템", icon: "desktop-outline" },
    { value: "light", label: "라이트", icon: "sunny-outline" },
    { value: "dark", label: "다크", icon: "moon-outline" },
] as const;

export default function ThemePicker({ opensUp = false }: { opensUp?: boolean }) {
    const { theme, changeTheme } = useTheme();
    const [open, setOpen] = useState(false);
    const menuId = useId();
    const pickerRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const selected = options.find(option => option.value === theme) ?? options[0];

    useEffect(() => {
        if (!open) return;
        const onPointerDown = (event: PointerEvent) => {
            if (!pickerRef.current?.contains(event.target as Node)) setOpen(false);
        };
        document.addEventListener("pointerdown", onPointerDown);
        return () => document.removeEventListener("pointerdown", onPointerDown);
    }, [open]);

    const closeAndFocus = () => {
        setOpen(false);
        triggerRef.current?.focus({ preventScroll: true });
    };

    return (
        <div
            ref={pickerRef}
            className="relative shrink-0 self-start print:hidden"
            onBlur={event => {
                if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget)) setOpen(false);
            }}
            onKeyDown={event => {
                if (open && event.key === "Escape") {
                    event.preventDefault();
                    event.stopPropagation();
                    closeAndFocus();
                }
            }}
        >
            <button
                ref={triggerRef}
                type="button"
                aria-label="테마 설정"
                aria-describedby={`${menuId}-current`}
                aria-expanded={open}
                aria-controls={open ? menuId : undefined}
                onClick={() => setOpen(value => !value)}
                className="flex h-11 w-11 items-center justify-center rounded-full text-xl transition-colors hover:bg-[var(--secondary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
                <IonIcon name={selected.icon} aria-hidden="true" />
                <span className="sr-only" id={`${menuId}-current`}>{selected.label}</span>
            </button>
            {open && (
                <div
                    id={menuId}
                    role="group"
                    aria-label="화면 테마"
                    data-placement={opensUp ? "above" : "below"}
                    className={`theme-picker-popup absolute z-30 w-40 rounded-2xl border border-black/10 bg-[var(--background)] p-1.5 shadow-lg dark:border-white/15 ${opensUp ? "bottom-full left-0 mb-2" : "right-0 top-full mt-2"}`}
                >
                    {options.map(option => (
                        <button
                            key={option.value}
                            type="button"
                            aria-pressed={option.value === theme}
                            onClick={() => {
                                closeAndFocus();
                                if (option.value !== theme) changeTheme(option.value);
                            }}
                            className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-sm transition-colors hover:bg-[var(--secondary)] focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 ${option.value === theme ? "bg-[var(--secondary)] font-semibold" : ""}`}
                        >
                            <IonIcon name={option.icon} className="text-base" aria-hidden="true" />
                            <span>{option.label}</span>
                            {option.value === theme && <IonIcon name="checkmark-outline" className="ml-auto text-base" aria-hidden="true" />}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
