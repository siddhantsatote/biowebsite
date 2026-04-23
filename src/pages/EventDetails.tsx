import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, BadgeCheck, Sparkles, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { eventCatalog } from "@/lib/events";

const EventDetails = () => {
  const { eventId } = useParams();
  const selectedEvent = eventCatalog.find((event) => event.id === eventId);

  if (!selectedEvent) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="container-x py-8 md:py-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-foreground/15 px-4 py-2 text-sm font-medium transition hover:bg-foreground/5"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to all events
          </Link>

          <Button asChild className="h-10 rounded-full px-5">
            <Link to={`/register/${selectedEvent.id}`}>
              Register for this event
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <article className="mt-5 overflow-hidden rounded-[1.5rem] border border-border/70 bg-card/70 shadow-card">
          <div className="relative h-56 md:h-[22rem]">
            <img
              src={selectedEvent.img}
              alt={selectedEvent.name}
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/15" />
            <div className="absolute left-5 top-5 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold tracking-[0.12em] text-foreground">
              Event {selectedEvent.n} of 04
            </div>
            <div className="absolute bottom-5 left-5 right-5 md:max-w-3xl">
              <img src={selectedEvent.logo} alt={selectedEvent.name} className="h-10 w-auto object-contain" loading="lazy" />
              <h1 className="mt-3 font-display text-3xl leading-tight text-white md:text-5xl">{selectedEvent.name}</h1>
              <p className="mt-2 max-w-2xl text-sm text-white/90 md:text-base">{selectedEvent.tag}</p>
            </div>
          </div>

          <div className="grid gap-4 p-5 md:grid-cols-3 md:p-6">
            <div className="rounded-xl border border-border/70 bg-background/70 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Who should attend</p>
              <p className="mt-2 text-sm">{selectedEvent.audience}</p>
            </div>
            <div className="rounded-xl border border-border/70 bg-background/70 p-4 md:col-span-2">
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">About this event</p>
              <p className="mt-2 text-sm leading-relaxed text-foreground/90">{selectedEvent.overview}</p>
            </div>
          </div>
        </article>
      </section>

      <section className="container-x pb-10 md:pb-14">
        <div className="grid gap-4 md:grid-cols-2">
          <article className="rounded-2xl border border-border/70 bg-card/80 p-5 shadow-soft">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-accent" />
              <h2 className="text-sm font-medium uppercase tracking-[0.14em]">Key Highlights</h2>
            </div>
            <ul className="mt-3 space-y-2.5 text-sm text-foreground/85">
              {selectedEvent.highlights.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-2xl border border-border/70 bg-card/80 p-5 shadow-soft">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <h2 className="text-sm font-medium uppercase tracking-[0.14em]">What You Get</h2>
            </div>
            <ul className="mt-3 space-y-2.5 text-sm text-foreground/85">
              {selectedEvent.whatYouGet.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <BadgeCheck className="mt-0.5 h-4 w-4 text-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              {selectedEvent.focus.map((topic) => (
                <span
                  key={topic}
                  className="rounded-full border border-border bg-background px-3 py-1 text-xs uppercase tracking-[0.1em] text-foreground/80"
                >
                  {topic}
                </span>
              ))}
            </div>
          </article>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild className="h-10 rounded-full px-6">
            <Link to={`/register/${selectedEvent.id}`}>Register Now</Link>
          </Button>
          <Button asChild variant="outline" className="h-10 rounded-full px-6">
            <Link to="/">Explore other events</Link>
          </Button>
        </div>
      </section>
    </main>
  );
};

export default EventDetails;
