"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { IconMenu, IconClose, IconArrowUpRight } from "./Icons";
import { site } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

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

  // Cierre con Escape y devolución de foco al botón que abrió el menú.
  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    const firstLink = panelRef.current?.querySelector("a");
    (firstLink as HTMLElement | null)?.focus();
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  function closeMenu() {
    setOpen(false);
    toggleRef.current?.focus();
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur border-b border-line" : "bg-white border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-[68px] max-w-[1300px] items-center justify-between px-5 sm:px-8">
        <Link href="/" className="shrink-0" aria-label="Inicio — IBEX Biomedical Solutions">
          <Image
            src="/brand/logo-horizontal.png"
            alt="IBEX Biomedical Solutions"
            width={1200}
            height={300}
            priority
            className="h-9 w-auto sm:h-10"
          />
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-6 xl:flex">
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

        <div className="hidden items-center gap-3 xl:flex">
          <Link href={site.portalUrl} className="btn btn-ghost-accent">
            Portal de Clientes
            <IconArrowUpRight width={16} height={16} />
          </Link>
          <Link href="/#contacto" className="btn btn-primary">
            Solicitar información
            <IconArrowUpRight width={16} height={16} />
          </Link>
        </div>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 items-center justify-center rounded text-navy xl:hidden"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          aria-controls="mobile-nav-panel"
        >
          {open ? <IconClose /> : <IconMenu />}
        </button>
      </div>

      {/* Panel móvil */}
      <div className="xl:hidden" aria-hidden={!open}>
        <div
          className={`fixed inset-0 top-[68px] z-40 bg-navy-ink/30 transition-opacity duration-300 ${
            open ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          onClick={closeMenu}
        />
        <div
          id="mobile-nav-panel"
          ref={panelRef}
          inert={!open}
          className={`fixed inset-x-0 top-[68px] z-40 origin-top border-b border-line bg-white px-5 transition-all duration-300 ${
            open ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"
          }`}
        >
          <nav aria-label="Menú móvil" className="flex flex-col py-2">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="flex min-h-[44px] items-center justify-between border-b border-line-soft py-4 text-base font-medium text-navy-ink"
              >
                {item.label}
                <IconArrowUpRight width={18} height={18} className="text-slate-light" />
              </Link>
            ))}
          </nav>
          <div className="my-5 flex flex-col gap-3">
            <Link href="/#contacto" onClick={closeMenu} className="btn btn-primary w-full">
              Solicitar información
            </Link>
            <Link href={site.portalUrl} onClick={closeMenu} className="btn btn-ghost-accent w-full">
              Portal de Clientes
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
