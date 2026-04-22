import heroImg from "@/assets/hero-bioenergy.jpg";

export const CTA = () => (
  <section className="container-x py-20 md:py-28">
    <div className="relative overflow-hidden rounded-[2rem] shadow-card">
      <img src={heroImg} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-br from-ink/85 via-ink/60 to-primary/70" />
      <div className="relative grid gap-10 p-8 md:grid-cols-2 md:p-16">
        <div className="text-ink-foreground">
          <span className="chip border-ink-foreground/20 bg-ink-foreground/5 text-ink-foreground/80">Register now</span>
          <h2 className="display mt-5 text-5xl md:text-6xl">
            Be part of <em>India's</em> energy transition.
          </h2>
          <p className="mt-5 max-w-md opacity-80">
            Visitor passes are complimentary for trade and business attendees. Click any event card to open its dedicated registration form.
          </p>
          <a
            href="#events"
            className="mt-6 inline-flex rounded-xl bg-accent px-5 py-3 text-sm font-medium text-accent-foreground transition hover:opacity-90"
          >
            Open events and register
          </a>
        </div>
        <div className="grid content-start gap-3 rounded-2xl border border-background/20 bg-background/95 p-6 backdrop-blur md:p-8">
          <h3 className="font-display text-2xl">How registration works</h3>
          <p className="text-sm text-foreground/70">1. Open the Events section.</p>
          <p className="text-sm text-foreground/70">2. Click the event card you want to attend.</p>
          <p className="text-sm text-foreground/70">3. Fill in the pop-up attendee form and submit.</p>
          <p className="mt-2 text-xs text-foreground/55">You can register for multiple events by submitting each event form.</p>
        </div>
      </div>
    </div>
  </section>
);
