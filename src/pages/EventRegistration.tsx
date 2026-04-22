import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { EventRegistrationForm } from "@/components/landing/Registration";
import { eventCatalog } from "@/lib/events";
import NotFound from "./NotFound";

const EventRegistration = () => {
  const { eventId } = useParams();
  const selectedEvent = eventCatalog.find((event) => event.id === eventId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [eventId]);

  if (!selectedEvent) {
    return <NotFound />;
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="container-x py-7 md:py-8 lg:max-w-5xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full border border-foreground/15 px-4 py-2 text-sm font-medium transition hover:bg-foreground/5"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all events
        </Link>

        <div className="mt-4 overflow-hidden rounded-[1.35rem] border border-border/70 bg-card shadow-card">
          <div className="grid gap-0 md:grid-cols-[0.75fr_1.25fr]">
            <img
              src={selectedEvent.img}
              alt={selectedEvent.name}
              className="h-36 w-full object-cover md:h-full"
              loading="lazy"
            />
            <div className="p-3.5 md:p-4">
              <p className="chip px-2.5 py-1 text-[0.65rem] tracking-[0.14em]">Event {selectedEvent.n} of 04</p>
              <img
                src={selectedEvent.logo}
                alt={selectedEvent.name}
                className="mt-2.5 h-8 w-auto object-contain"
                loading="lazy"
              />
              <h1 className="mt-2.5 font-display text-xl leading-tight md:text-2xl">{selectedEvent.name}</h1>
              <p className="mt-1 max-w-md text-xs text-foreground/75 md:text-sm">{selectedEvent.tag}</p>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {selectedEvent.focus.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-foreground/15 bg-background px-2 py-0.5 text-[0.62rem] uppercase tracking-wider"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-x pb-12 md:pb-16">
        <EventRegistrationForm event={selectedEvent} />
      </section>
    </main>
  );
};

export default EventRegistration;
