import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
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

    <div className="mt-14 grid gap-5 md:grid-cols-2">
      {eventCatalog.map((e) => (
        <Link
          key={e.n}
          to={`/register/${e.id}`}
          className={`group relative flex w-full flex-col overflow-hidden rounded-[1.75rem] ${e.tone} shadow-card transition-transform hover:-translate-y-1`}
          aria-label={`Open registration page for ${e.name}`}
        >
          <div className="relative h-72 overflow-hidden">
            <img
              src={e.img}
              alt={e.name}
              loading="lazy"
              width={1024}
              height={1280}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-xs font-medium text-foreground">
              {e.n} / 04
            </div>
            <div className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-accent text-accent-foreground shadow-soft transition-transform group-hover:rotate-45">
              <ArrowUpRight className="h-5 w-5" />
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-4 p-6 md:p-7">
            <img src={e.logo} alt={e.name} className="h-10 w-auto object-contain" loading="lazy" />
            <h3 className="font-display text-3xl leading-tight">{e.name}</h3>
            <p className="text-sm opacity-80">{e.tag}</p>
            <div className="mt-auto flex flex-wrap gap-2">
              {e.focus.map((f) => (
                <span key={f} className="rounded-full border border-current/20 px-3 py-1 text-xs uppercase tracking-wider opacity-80">
                  {f}
                </span>
              ))}
            </div>
          </div>
        </Link>
      ))}
    </div>
  </section>
);
