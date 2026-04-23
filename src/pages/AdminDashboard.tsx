import { useEffect, useMemo, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { clearAdminAuthenticated, isAdminAuthenticated } from "@/lib/adminAuth";
import { eventCatalog } from "@/lib/events";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";
import {
  CalendarDays,
  ChartColumnBig,
  CircleDollarSign,
  Globe2,
  LayoutGrid,
  LogOut,
  Search,
  Shield,
  Users,
} from "lucide-react";

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

const csvCell = (value: unknown) => {
  const text = String(value ?? "").replace(/"/g, '""');
  return `"${text}"`;
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

  const totalVisitors = filteredRecords.length;
  const uniqueCompanies = new Set(filteredRecords.map((record) => record.company)).size;
  const uniqueCountries = new Set(filteredRecords.map((record) => record.country)).size;
  const todayVisitors = filteredRecords.filter((record) => {
    const today = new Date();
    const created = new Date(record.created_at);
    return created.toDateString() === today.toDateString();
  }).length;

  const eventDistribution = eventCatalog.map((event) => {
    const count = records.filter((record) => record.event_name === event.name).length;
    return { name: event.name, count };
  });

  const totalAcrossEvents = eventDistribution.reduce((sum, item) => sum + item.count, 0);

  const dailyTrend = useMemo(() => {
    const days = 7;
    const list: { label: string; count: number }[] = [];
    for (let i = days - 1; i >= 0; i -= 1) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const count = filteredRecords.filter((record) => {
        const created = new Date(record.created_at);
        return created.toDateString() === date.toDateString();
      }).length;
      list.push({ label: date.toLocaleDateString(undefined, { weekday: "short" }), count });
    }
    return list;
  }, [filteredRecords]);

  const exportRegistrationsCsv = () => {
    if (filteredRecords.length === 0) {
      return;
    }

    const headers = [
      "Created At",
      "Event",
      "Full Name",
      "Email",
      "Phone",
      "Company",
      "Designation",
      "Country",
      "Attendee Type",
      "Interests",
    ];

    const rows = filteredRecords.map((record) => [
      new Date(record.created_at).toLocaleString(),
      record.event_name,
      record.full_name,
      record.email,
      record.phone,
      record.company,
      record.designation,
      record.country,
      record.attendee_type,
      record.interests,
    ]);

    const csv = [headers, ...rows].map((row) => row.map(csvCell).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const suffix = selectedEvent === "all" ? "all_events" : selectedEvent.replace(/[^a-z0-9]/gi, "_").toLowerCase();
    link.href = url;
    link.download = `registrations_${suffix}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const trendPath = useMemo(() => {
    const width = 480;
    const height = 140;
    const padding = 12;
    const max = Math.max(...dailyTrend.map((d) => d.count), 1);
    return dailyTrend
      .map((point, index) => {
        const x = padding + (index * (width - padding * 2)) / (dailyTrend.length - 1 || 1);
        const y = height - padding - (point.count / max) * (height - padding * 2);
        return `${index === 0 ? "M" : "L"} ${x} ${y}`;
      })
      .join(" ");
  }, [dailyTrend]);

  if (!authenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <main className="min-h-screen bg-[#eef5df]">
      <section className="grid min-h-screen w-full overflow-hidden border border-foreground/10 bg-background lg:grid-cols-[74px_1fr]">
        <aside className="hidden bg-gradient-to-b from-[#03280f] to-[#024221] p-3 text-white lg:flex lg:flex-col lg:items-center lg:justify-between">
          <div className="space-y-5">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-lime-400/20">
              <Shield className="h-5 w-5 text-lime-300" />
            </div>
            <div className="space-y-3">
              {[LayoutGrid, ChartColumnBig, Users, Globe2, CalendarDays].map((Icon, idx) => (
                <button key={idx} type="button" className="grid h-10 w-10 place-items-center rounded-xl text-white/85 transition hover:bg-white/15">
                  <Icon className="h-4 w-4" />
                </button>
              ))}
            </div>
          </div>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-white/90 transition hover:bg-white/20"
            onClick={() => {
              clearAdminAuthenticated();
              navigate("/admin/login", { replace: true });
            }}
          >
            <LogOut className="h-4 w-4" />
          </button>
        </aside>

        <div className="p-4 md:p-5">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border/70 bg-card/70 px-4 py-3">
            <div>
              <h1 className="text-lg font-semibold">Event Admin</h1>
              <p className="text-xs text-muted-foreground">Registration control center</p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <label className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search here..."
                  className="h-10 w-56 rounded-full border border-border bg-background pl-9 pr-3 text-sm outline-none focus:border-primary"
                />
              </label>
              <select
                id="event-filter"
                className="h-10 rounded-full border border-border bg-background px-3 text-sm"
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
              <Button
                type="button"
                className="h-10 rounded-full bg-[#08331a] px-4 text-white hover:bg-[#0b4a24]"
                onClick={() => {
                  clearAdminAuthenticated();
                  navigate("/admin/login", { replace: true });
                }}
              >
                Logout
              </Button>
            </div>
          </div>

          {isLoading && <p className="mt-5 text-sm text-muted-foreground">Loading registrations...</p>}
          {error && <p className="mt-5 text-sm text-destructive">{error}</p>}

          {!isLoading && !error && (
            <div className="mt-4 grid gap-4 xl:grid-cols-[1fr_260px]">
              <div className="space-y-4">
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  <article className="rounded-2xl border border-[#0f5a31] bg-gradient-to-br from-[#0c4f2a] to-[#0a3019] p-4 text-white">
                    <p className="text-xs uppercase tracking-[0.18em] text-white/75">Total visitors</p>
                    <p className="mt-2 text-3xl font-semibold">{totalVisitors}</p>
                    <p className="mt-1 text-xs text-lime-300">Live registrations</p>
                  </article>
                  <article className="rounded-2xl border border-border/70 bg-card p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Today</p>
                    <p className="mt-2 text-3xl font-semibold">{todayVisitors}</p>
                    <p className="mt-1 text-xs text-emerald-600">new today</p>
                  </article>
                  <article className="rounded-2xl border border-border/70 bg-card p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Companies</p>
                    <p className="mt-2 text-3xl font-semibold">{uniqueCompanies}</p>
                    <p className="mt-1 text-xs text-muted-foreground">participating</p>
                  </article>
                  <article className="rounded-2xl border border-border/70 bg-card p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Countries</p>
                    <p className="mt-2 text-3xl font-semibold">{uniqueCountries}</p>
                    <p className="mt-1 text-xs text-muted-foreground">global reach</p>
                  </article>
                </div>

                <article className="rounded-2xl border border-border/70 bg-card p-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-medium">Registration Analytics</h2>
                    <span className="text-xs text-muted-foreground">Last 7 days</span>
                  </div>
                  <div className="mt-3 rounded-xl border border-border/50 bg-gradient-to-br from-lime-100/40 to-emerald-100/40 p-3">
                    <svg viewBox="0 0 480 140" className="h-44 w-full" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#84cc16" stopOpacity="0.35" />
                          <stop offset="100%" stopColor="#84cc16" stopOpacity="0.02" />
                        </linearGradient>
                      </defs>
                      <path d={trendPath} fill="none" stroke="#65a30d" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                    <div className="mt-1 grid grid-cols-7 gap-2 text-center text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                      {dailyTrend.map((day) => (
                        <span key={day.label}>{day.label}</span>
                      ))}
                    </div>
                  </div>
                </article>

                <article className="overflow-x-auto rounded-2xl border border-border/70 bg-card">
                  <div className="flex items-center justify-between border-b border-border/70 px-4 py-3">
                    <h2 className="text-sm font-medium">Recent Registrations</h2>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{filteredRecords.length} rows</span>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={exportRegistrationsCsv}
                        disabled={filteredRecords.length === 0}
                      >
                        Export CSV
                      </Button>
                    </div>
                  </div>
                  <table className="w-full min-w-[980px] border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-border/50 text-left text-xs uppercase tracking-[0.12em] text-muted-foreground">
                        <th className="px-4 py-3 font-medium">Created</th>
                        <th className="px-4 py-3 font-medium">Event</th>
                        <th className="px-4 py-3 font-medium">Name</th>
                        <th className="px-4 py-3 font-medium">Email</th>
                        <th className="px-4 py-3 font-medium">Phone</th>
                        <th className="px-4 py-3 font-medium">Company</th>
                        <th className="px-4 py-3 font-medium">Designation</th>
                        <th className="px-4 py-3 font-medium">Country</th>
                        <th className="px-4 py-3 font-medium">Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRecords.length === 0 && (
                        <tr>
                          <td className="px-4 py-6 text-muted-foreground" colSpan={9}>
                            No registrations found.
                          </td>
                        </tr>
                      )}
                      {filteredRecords.map((record) => (
                        <tr key={record.id} className="border-b border-border/30 last:border-b-0">
                          <td className="px-4 py-3">{new Date(record.created_at).toLocaleString()}</td>
                          <td className="px-4 py-3">{record.event_name}</td>
                          <td className="px-4 py-3">{record.full_name}</td>
                          <td className="px-4 py-3">{record.email}</td>
                          <td className="px-4 py-3">{record.phone}</td>
                          <td className="px-4 py-3">{record.company}</td>
                          <td className="px-4 py-3">{record.designation}</td>
                          <td className="px-4 py-3">{record.country}</td>
                          <td className="px-4 py-3">{record.attendee_type}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </article>
              </div>

              <div className="space-y-4">
                <article className="rounded-2xl border border-border/70 bg-card p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">Event Distribution</h3>
                    <CircleDollarSign className="h-4 w-4 text-emerald-700" />
                  </div>
                  <div className="mt-4 flex justify-center">
                    <div
                      className="h-36 w-36 rounded-full"
                      style={{
                        background: `conic-gradient(#0b4021 0 ${Math.round((eventDistribution[0]?.count || 0) / Math.max(totalAcrossEvents, 1) * 360)}deg, #2f855a ${Math.round((eventDistribution[0]?.count || 0) / Math.max(totalAcrossEvents, 1) * 360)}deg ${Math.round(((eventDistribution[0]?.count || 0) + (eventDistribution[1]?.count || 0)) / Math.max(totalAcrossEvents, 1) * 360)}deg, #84cc16 ${Math.round(((eventDistribution[0]?.count || 0) + (eventDistribution[1]?.count || 0)) / Math.max(totalAcrossEvents, 1) * 360)}deg ${Math.round(((eventDistribution[0]?.count || 0) + (eventDistribution[1]?.count || 0) + (eventDistribution[2]?.count || 0)) / Math.max(totalAcrossEvents, 1) * 360)}deg, #f59e0b ${Math.round(((eventDistribution[0]?.count || 0) + (eventDistribution[1]?.count || 0) + (eventDistribution[2]?.count || 0)) / Math.max(totalAcrossEvents, 1) * 360)}deg 360deg)`,
                      }}
                    >
                      <div className="m-6 grid h-24 w-24 place-items-center rounded-full bg-background text-xl font-semibold">
                        {totalAcrossEvents}
                      </div>
                    </div>
                  </div>
                  <ul className="mt-4 space-y-2 text-sm">
                    {eventDistribution.map((item) => (
                      <li key={item.name} className="flex items-center justify-between">
                        <span className="max-w-[150px] truncate text-muted-foreground">{item.name}</span>
                        <span className="font-medium">{item.count}</span>
                      </li>
                    ))}
                  </ul>
                </article>

                <article className="rounded-2xl border border-border/70 bg-card p-4">
                  <h3 className="text-sm font-medium">Dashboard Notes</h3>
                  <ul className="mt-3 space-y-2 text-xs text-muted-foreground">
                    <li>Use event filter from the top bar to narrow records.</li>
                    <li>Visitor pass data syncs from the same Supabase tables.</li>
                    <li>Update admin credentials in your .env file as needed.</li>
                  </ul>
                </article>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default AdminDashboard;
