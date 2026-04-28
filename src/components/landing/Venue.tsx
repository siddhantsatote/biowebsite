import { CalendarDays, MapPin, Clock, Ticket } from "lucide-react";
import venueImage from "@/assets/Yashobhoomi Bioenergy Global 2026.webp";

export const Venue = () => (
  <section id="venue" className="container-x py-20 md:py-28">
    <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
      <div className="overflow-hidden rounded-[1.75rem] border border-foreground/10 bg-card/80 shadow-card">
        <div className="relative h-[280px] overflow-hidden md:h-[380px]">
          <img
            src={venueImage}
            alt="Yashobhoomi Bioenergy Global 2026 venue"
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-black/10" />
          <div className="absolute left-5 top-5 rounded-full border border-white/25 bg-black/30 px-3 py-1 text-xs uppercase tracking-[0.16em] text-white backdrop-blur-sm">
            Venue preview
          </div>
          <div className="absolute bottom-5 left-5 right-5 max-w-xl text-white">
            <h2 className="display text-4xl md:text-5xl">
              Welcome to <em>Yashobhoomi</em>
            </h2>
            <p className="mt-2 text-sm text-white/85 md:text-base">
              BioEnergy Global 2026 is hosted at IICC Dwarka, one of India&apos;s most premium convention venues.
            </p>
          </div>
        </div>

        <div className="grid gap-4 p-5 md:grid-cols-2 md:p-6">
          {[
            { i: CalendarDays, l: "Dates", v: "29 – 30 – 31 July 2026" },
            { i: Clock, l: "Hours", v: "10:00 – 18:30 IST daily" },
            { i: MapPin, l: "Address", v: "IICC Yashobhoomi, Dwarka Sec-25, New Delhi" },
            { i: Ticket, l: "Entry", v: "Trade & business visitors only · Pre-register required" },
          ].map(({ i: Icon, l, v }) => (
            <div key={l} className="flex items-start gap-3 rounded-2xl border border-border/60 bg-background/70 p-4">
              <Icon className="mt-0.5 h-5 w-5 text-accent" />
              <div>
                <div className="text-[11px] uppercase tracking-[0.2em] text-foreground/50">{l}</div>
                <div className="mt-1 font-medium leading-snug">{v}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-[1.75rem] border border-foreground/10 bg-ink text-ink-foreground shadow-card">
        <div className="border-b border-white/10 px-6 py-5 md:px-8 md:py-6">
          <span className="chip border-white/15 bg-white/5 text-white/80">Venue location</span>
          <h3 className="mt-4 font-display text-3xl md:text-4xl">Find us on the map</h3>
          <p className="mt-2 max-w-xl text-sm text-white/75 md:text-base">
            Use the map below for navigation and arrival planning. The location is centered on Yashobhoomi, Dwarka, New Delhi.
          </p>
        </div>

        <div className="aspect-[16/11] w-full border-b border-white/10 bg-black/20">
          <iframe
            title="Google Maps location for Yashobhoomi Bioenergy Global 2026"
            src="https://www.google.com/maps?q=Yashobhoomi%20IICC%20Dwarka%20Sector%2025%20New%20Delhi&output=embed"
            className="h-full w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div className="grid divide-y divide-white/10 md:grid-cols-3 md:divide-x md:divide-y-0">
          {[
            { d: "Day 01", date: "29 July", t: "Opening keynote · Global leaders forum · Exhibitor preview" },
            { d: "Day 02", date: "30 July", t: "Bioenergy summit · Policy roundtables · Investor mixer" },
            { d: "Day 03", date: "31 July", t: "Waste-to-Energy day · Tech demos · Closing awards" },
          ].map((s) => (
            <div key={s.d} className="px-6 py-6 md:px-6">
              <div className="font-display text-3xl text-accent">{s.d}</div>
              <div className="text-xs uppercase tracking-[0.2em] opacity-60">{s.date}</div>
              <p className="mt-3 text-sm opacity-90">{s.t}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
