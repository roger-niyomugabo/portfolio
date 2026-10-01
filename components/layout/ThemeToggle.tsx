"use client";

import { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && (resolvedTheme ?? theme) === "dark";

  const toggleTheme = () => {
    const next = isDark ? "light" : "dark";
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion || typeof document.startViewTransition !== "function") {
      setTheme(next);
      return;
    }

    // Cross-fade the page between themes. flushSync makes next-themes swap the
    // class on <html> inside the transition rather than after it has started.
    document.startViewTransition(() => {
      flushSync(() => setTheme(next));
    });
  };

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={toggleTheme}
      className={cn(
        "relative inline-flex h-9 w-9 items-center justify-center text-fg transition-opacity hover:opacity-60",
        className
      )}
    >
      <Sun
        className={cn(
          "h-5 w-5 transition-all",
          isDark ? "rotate-90 scale-0" : "rotate-0 scale-100"
        )}
      />
      <Moon
        className={cn(
          "absolute h-5 w-5 transition-all",
          isDark ? "rotate-0 scale-100" : "-rotate-90 scale-0"
        )}
      />
    </button>
  );
}
