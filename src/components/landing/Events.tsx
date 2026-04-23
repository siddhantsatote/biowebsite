import { ArrowUpRight, BadgeCheck, CalendarClock, Ticket } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { eventCatalog } from "@/lib/events";

export const Events = () => (
  <section id="events" className="container-x py-20 md:py-28">
    <div className="flex flex-wrap items-end justify-between gap-6">
      <div className="max-w-2xl">
        <span className="chip">Four events · One venue</span>
        <h2 className="display mt-5 text-5xl md:text-7xl">
          One ticket. <em>Four worlds</em><br />of clean energy.
        </h2>
      </div>
      <p className="max-w-sm text-foreground/70">
        Curated tracks designed for industry, government and academia — moving from research to deployment under one roof.
      </p>
    </div>

    <div className="mt-8 grid gap-3 rounded-2xl border border-border/70 bg-card/70 p-4 text-sm shadow-soft md:grid-cols-3 md:p-5">
      <div className="flex items-start gap-2.5">
        <span className="mt-0.5 grid h-7 w-7 place-items-center rounded-full bg-accent/15 text-accent">
          <CalendarClock className="h-4 w-4" />
        </span>
        <p className="text-foreground/80"><span className="font-medium text-foreground">Step 1:</span> Pick your event track.</p>
      </div>
      <div className="flex items-start gap-2.5">
        <span className="mt-0.5 grid h-7 w-7 place-items-center rounded-full bg-primary/15 text-primary">
          <Ticket className="h-4 w-4" />
        </span>
        <p className="text-foreground/80"><span className="font-medium text-foreground">Step 2:</span> Click Register and submit details.</p>
      </div>
      <div className="flex items-start gap-2.5">
        <span className="mt-0.5 grid h-7 w-7 place-items-center rounded-full bg-emerald-600/15 text-emerald-700">
          <BadgeCheck className="h-4 w-4" />
        </span>
        <p className="text-foreground/80"><span className="font-medium text-foreground">Step 3:</span> Download your QR entry pass instantly.</p>
      </div>
    </div>

    <div className="mt-14 grid gap-5 md:grid-cols-2">
      {eventCatalog.map((e) => (
        <article
          key={e.n}
          className={`group relative flex w-full flex-col overflow-hidden rounded-[1.75rem] border border-border/40 ${e.tone} shadow-card transition-transform duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_-18px_hsl(var(--foreground)/0.45)]`}
        >
          <Link to={`/events/${e.id}`} aria-label={`Open event details for ${e.name}`}>
            <div className="relative h-72 overflow-hidden">
              <img
                src={e.img}
                alt={e.name}
                loading="lazy"
                width={1024}
                height={1280}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/10" />
              <div className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-xs font-medium text-foreground">
                {e.n} / 04
              </div>
              <div className="absolute bottom-4 left-4 rounded-full border border-white/40 bg-black/35 px-3 py-1 text-xs uppercase tracking-[0.14em] text-white backdrop-blur-sm">
                Limited seats
              </div>
              <div className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-accent text-accent-foreground shadow-soft transition-transform group-hover:rotate-45">
                <ArrowUpRight className="h-5 w-5" />
              </div>
            </div>
          </Link>
          <div className="flex flex-1 flex-col gap-4 p-6 md:p-7">
            <img src={e.logo} alt={e.name} className="h-10 w-auto self-start object-contain" loading="lazy" />
            <div>
              <h3 className="font-display text-3xl leading-tight">{e.name}</h3>
              <p className="mt-1 text-sm opacity-80">{e.subtitle}</p>
              <p className="mt-2 text-sm opacity-80">For: {e.audience}</p>
            </div>
            <div className="mt-auto flex flex-wrap gap-2">
              {e.focus.map((f) => (
                <span key={f} className="rounded-full border border-current/20 px-3 py-1 text-xs uppercase tracking-wider opacity-80">
                  {f}
                </span>
              ))}
            </div>
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-foreground/65">Tap register to generate your visitor pass</p>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Button asChild className="h-10 rounded-full px-5">
                <Link to={`/register/${e.id}`}>Register Now</Link>
              </Button>
              <Link
                to={`/events/${e.id}`}
                className="inline-flex items-center gap-1 text-sm font-medium underline-offset-4 transition hover:underline"
              >
                View details
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  </section>
);
