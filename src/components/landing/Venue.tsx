import { CalendarDays, MapPin, Clock, Ticket } from "lucide-react";

export const Venue = () => (
  <section id="venue" className="container-x py-20 md:py-28">
    <div className="grid gap-10 md:grid-cols-12">
      <div className="md:col-span-5">
        <span className="chip">Venue & schedule</span>
        <h2 className="display mt-5 text-5xl md:text-6xl">
          Three days at <em>Yashobhoomi</em>.
        </h2>
        <p className="mt-6 text-foreground/70">
          IICC Dwarka, Sector 25, New Delhi — India's largest convention destination, minutes from IGI Airport.
        </p>
        <ul className="mt-8 space-y-4 text-sm">
          {[
            { i: CalendarDays, l: "Dates", v: "29 – 30 – 31 July 2026" },
            { i: Clock, l: "Hours", v: "10:00 – 18:30 IST daily" },
            { i: MapPin, l: "Address", v: "IICC Yashobhoomi, Dwarka Sec-25, New Delhi" },
            { i: Ticket, l: "Entry", v: "Trade & business visitors only · Pre-register required" },
          ].map(({ i: Icon, l, v }) => (
            <li key={l} className="flex items-start gap-3 border-b border-foreground/10 pb-4">
              <Icon className="mt-0.5 h-5 w-5 text-accent" />
              <div>
                <div className="text-[11px] uppercase tracking-[0.2em] text-foreground/50">{l}</div>
                <div className="font-medium">{v}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="md:col-span-7">
        <div className="overflow-hidden rounded-[1.75rem] border border-foreground/10 bg-ink text-ink-foreground shadow-card">
          <div className="grid divide-y divide-ink-foreground/10">
            {[
              { d: "Day 01", date: "29 July", t: "Opening keynote · Global leaders forum · Exhibitor preview" },
              { d: "Day 02", date: "30 July", t: "Bioenergy summit · Policy roundtables · Investor mixer" },
              { d: "Day 03", date: "31 July", t: "Waste-to-Energy day · Tech demos · Closing awards" },
            ].map((s) => (
              <div key={s.d} className="grid grid-cols-[auto_1fr] items-center gap-6 px-6 py-7 md:px-10">
                <div>
                  <div className="font-display text-4xl text-accent">{s.d}</div>
                  <div className="text-xs uppercase tracking-[0.2em] opacity-60">{s.date}</div>
                </div>
                <p className="text-sm md:text-base opacity-90">{s.t}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);
