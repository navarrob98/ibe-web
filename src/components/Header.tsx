"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { IconMenu, IconClose, IconArrowUpRight } from "./Icons";
import { site } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur border-b border-line" : "bg-white border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-[68px] max-w-[1180px] items-center justify-between px-5 sm:px-8">
        <Link href="/" className="shrink-0" aria-label="Inicio — IBE Biomedical Solutions">
          <Image
            src="/brand/logo-horizontal.png"
            alt="IBE Biomedical Solutions"
            width={421}
            height={119}
            priority
            className="h-9 w-auto sm:h-10"
          />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="link-underline text-[0.92rem] font-medium text-ink/80 hover:text-navy"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link href="/#contacto" className="btn btn-primary">
            Solicitar diagnóstico
            <IconArrowUpRight width={16} height={16} />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded text-navy lg:hidden"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
        >
          {open ? <IconClose /> : <IconMenu />}
        </button>
      </div>

      {/* Panel móvil */}
      <div
        className={`lg:hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        <div
          className={`fixed inset-0 top-[68px] z-40 bg-navy-ink/30 transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />
        <div
          className={`fixed inset-x-0 top-[68px] z-40 origin-top border-b border-line bg-white px-5 transition-all duration-300 ${
            open ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"
          }`}
        >
          <nav className="flex flex-col py-2">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between border-b border-line-soft py-4 text-base font-medium text-navy-ink"
              >
                {item.label}
                <IconArrowUpRight width={18} height={18} className="text-slate-light" />
              </Link>
            ))}
          </nav>
          <Link
            href="/#contacto"
            onClick={() => setOpen(false)}
            className="btn btn-primary my-5 w-full"
          >
            Solicitar diagnóstico
          </Link>
        </div>
      </div>
    </header>
  );
}
