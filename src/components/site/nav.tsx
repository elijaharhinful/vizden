import Link from "next/link";
import { NAV_ITEMS, whatsappUrl } from "@/lib/content";
import { cn } from "@/lib/utils";

export function SiteNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 sm:px-10">
        <Link
          href="#home"
          className="font-display text-xl font-extrabold tracking-tight"
        >
          <span className="text-brand">/</span> VizDen
        </Link>

        <ul className="hidden items-center gap-9 text-sm md:flex">
          {NAV_ITEMS.filter((i) => !("cta" in i && i.cta)).map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="group relative text-foreground/80 transition-colors hover:text-foreground"
              >
                {item.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-brand transition-all duration-300 group-hover:w-full" />
              </Link>
            </li>
          ))}
        </ul>

        <a
          href={whatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "border border-brand px-5 py-2 text-sm font-medium text-foreground",
            "transition-colors hover:bg-brand hover:text-brand-foreground",
          )}
        >
          Enter the Den
        </a>
      </nav>
    </header>
  );
}
