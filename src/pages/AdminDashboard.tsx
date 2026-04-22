import { useEffect, useMemo, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { clearAdminAuthenticated, isAdminAuthenticated } from "@/lib/adminAuth";
import { eventCatalog } from "@/lib/events";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";

type RegistrationRecord = {
  id: string;
  created_at: string;
  event_name: string;
  full_name: string;
  email: string;
  phone: string;
  company: string;
  designation: string;
  country: string;
  attendee_type: string;
  interests: string;
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [records, setRecords] = useState<RegistrationRecord[]>([]);
  const [selectedEvent, setSelectedEvent] = useState("all");

  const authenticated = isAdminAuthenticated();

  useEffect(() => {
    const loadData = async () => {
      if (!isSupabaseConfigured || !supabase) {
        setError("Supabase is not configured.");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      const requests = eventCatalog.map((event) =>
        supabase
          .from(event.registrationTable)
          .select("id, created_at, event_name, full_name, email, phone, company, designation, country, attendee_type, interests")
          .order("created_at", { ascending: false }),
      );

      const results = await Promise.all(requests);
      const failed = results.find((result) => result.error);

      if (failed?.error) {
        setError(failed.error.message);
        setIsLoading(false);
        return;
      }

      const merged = results
        .flatMap((result) => result.data ?? [])
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

      setRecords(merged as RegistrationRecord[]);
      setIsLoading(false);
    };

    if (authenticated) {
      loadData();
    }
  }, [authenticated]);

  const filteredRecords = useMemo(() => {
    if (selectedEvent === "all") {
      return records;
    }
    return records.filter((record) => record.event_name === selectedEvent);
  }, [records, selectedEvent]);

  if (!authenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="container-x py-8 md:py-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="chip text-[0.68rem] tracking-[0.16em]">Admin panel</p>
            <h1 className="mt-3 font-display text-4xl leading-tight md:text-5xl">Registration Dashboard</h1>
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              clearAdminAuthenticated();
              navigate("/admin/login", { replace: true });
            }}
          >
            Logout
          </Button>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <label htmlFor="event-filter" className="text-sm text-muted-foreground">
            Filter by event
          </label>
          <select
            id="event-filter"
            className="h-9 rounded-md border border-input bg-background px-3 text-sm"
            value={selectedEvent}
            onChange={(evt) => setSelectedEvent(evt.target.value)}
          >
            <option value="all">All events</option>
            {eventCatalog.map((event) => (
              <option key={event.id} value={event.name}>
                {event.name}
              </option>
            ))}
          </select>
        </div>

        {isLoading && <p className="mt-6 text-sm text-muted-foreground">Loading registrations...</p>}
        {error && <p className="mt-6 text-sm text-destructive">{error}</p>}

        {!isLoading && !error && (
          <div className="mt-6 overflow-x-auto rounded-2xl border border-border/70 bg-card/70">
            <table className="w-full min-w-[980px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-border/70 text-left">
                  <th className="px-4 py-3 font-medium">Created</th>
                  <th className="px-4 py-3 font-medium">Event</th>
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Email</th>
                  <th className="px-4 py-3 font-medium">Phone</th>
                  <th className="px-4 py-3 font-medium">Company</th>
                  <th className="px-4 py-3 font-medium">Designation</th>
                  <th className="px-4 py-3 font-medium">Country</th>
                  <th className="px-4 py-3 font-medium">Type</th>
                  <th className="px-4 py-3 font-medium">Interests</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.length === 0 && (
                  <tr>
                    <td className="px-4 py-6 text-muted-foreground" colSpan={10}>
                      No registrations found.
                    </td>
                  </tr>
                )}
                {filteredRecords.map((record) => (
                  <tr key={record.id} className="border-b border-border/40 last:border-b-0">
                    <td className="px-4 py-3">{new Date(record.created_at).toLocaleString()}</td>
                    <td className="px-4 py-3">{record.event_name}</td>
                    <td className="px-4 py-3">{record.full_name}</td>
                    <td className="px-4 py-3">{record.email}</td>
                    <td className="px-4 py-3">{record.phone}</td>
                    <td className="px-4 py-3">{record.company}</td>
                    <td className="px-4 py-3">{record.designation}</td>
                    <td className="px-4 py-3">{record.country}</td>
                    <td className="px-4 py-3">{record.attendee_type}</td>
                    <td className="px-4 py-3">{record.interests}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
};

export default AdminDashboard;
