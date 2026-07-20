import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReservationCard from "@/components/dashboard/ReservationCard";
import UsageStats from "@/components/dashboard/UsageStats";
import QuickActions from "@/components/dashboard/QuickActions";
import FinancialOverview from "@/components/dashboard/FinancialOverview";
import RecentActivities from "@/components/dashboard/RecentActivities";
import { apiCall } from "@/utils/api";

interface DashboardReservation {
  id: number;
  booking_code: string;
  status: string;
  boat_name: string | null;
  location: string | null;
  destination: string | null;
  date: string | null;
  date_formatted: string | null;
  departure_time: string | null;
  due_time: string | null;
  duration_hours: number;
  booking_type: string | null;
  booking_type_label: string | null;
  image_url: string | null;
}

interface DashboardData {
  user: {
    id: number;
    name: string;
    first_name: string;
    last_name: string;
    display_name?: string;
    email: string;
    phone: string;
    membership_type: string;
    member_since: string | null;
    membership_renews_at: string | null;
    preferred_location: string | null;
    profile_photo_url: string | null;
    status: string;
  };
  welcome: {
    greeting: string;
    message: string;
    display_name?: string;
  };
  upcoming_reservation: DashboardReservation | null;
  upcoming_reservations?: DashboardReservation[];
  reservations_this_month?: DashboardReservation[];
  usage_stats: {
    hours_this_month: number;
    hours_this_month_subtitle: string;
    upcoming_hours: number;
    upcoming_hours_subtitle: string;
    reservations_this_month?: number;
    reservations_this_month_subtitle?: string;
    lifetime_trips: number;
    lifetime_trips_subtitle: string;
  };
  financial_overview: {
    outstanding_balance: number;
    next_membership_charge_date: string | null;
    next_membership_charge_date_formatted: string | null;
    recent_fuel: {
      date: string | null;
      date_formatted: string | null;
      amount: number;
    } | null;
  };
  recent_activities: Array<{
    type: string;
    title: string;
    subtitle: string;
    time_ago: string | null;
    activity_at: string | null;
  }>;
}

interface DashboardApiResponse {
  success: boolean;
  message: string;
  data: DashboardData;
}

function MonthReservationRow({
  reservation,
}: {
  reservation: DashboardReservation;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-black/[0.08] bg-white px-4 py-3">
      <div className="min-w-0">
        <p className="font-semibold text-gray-900 truncate">
          {reservation.boat_name || "Boat reservation"}
        </p>
        <p className="text-sm text-gray-500">
          {reservation.date_formatted || "Date TBD"} · {reservation.departure_time || "Time TBD"}
        </p>
      </div>
      <span className="text-xs font-semibold uppercase tracking-wide text-gray-600">
        {reservation.status}
      </span>
    </div>
  );
}

export default function Dashboard() {
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const result = await apiCall<DashboardApiResponse>("/api/dashboard", {
          signal: controller.signal,
        });

        if (!result.success) {
          throw new Error(result.message || "Failed to load dashboard.");
        }

        setDashboard(result.data);
      } catch (err: unknown) {
        if (err instanceof DOMException && err.name === "AbortError") {
          return;
        }

        setError(
          err instanceof Error ? err.message : "Failed to load dashboard.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();

    return () => controller.abort();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F7FA]">
        <main className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-gray-500">Loading dashboard...</div>
        </main>
      </div>
    );
  }

  if (error || !dashboard) {
    return (
      <div className="min-h-screen bg-[#F5F7FA]">
        <main className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3">
            {error || "Unable to load dashboard."}
          </div>
        </main>
      </div>
    );
  }

  const displayName =
    dashboard.welcome.display_name ||
    dashboard.user.display_name ||
    dashboard.user.first_name ||
    dashboard.user.name;

  const featuredReservation =
    dashboard.upcoming_reservation ||
    dashboard.reservations_this_month?.[0] ||
    null;

  const monthReservations = dashboard.reservations_this_month || [];
  const additionalMonthReservations = monthReservations.filter(
    (reservation) => reservation.id !== featuredReservation?.id,
  );

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <main className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col gap-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2">
          <div className="flex flex-col gap-2">
            <h1 className="text-[32px] font-bold text-gray-900 tracking-tight leading-tight">
              {dashboard.welcome.greeting}, {displayName}.
            </h1>
            <p className="text-base text-gray-500">{dashboard.welcome.message}</p>
          </div>

          <p className="text-[13px] text-gray-500 sm:text-right whitespace-nowrap">
            Membership renews{" "}
            <span className="font-semibold text-gray-900">
              {dashboard.user.membership_renews_at
                ? new Date(dashboard.user.membership_renews_at).toLocaleDateString(
                    "en-US",
                    {
                      month: "short",
                      year: "numeric",
                    },
                  )
                : "N/A"}
            </span>
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <ReservationCard reservation={featuredReservation} />
          <UsageStats stats={dashboard.usage_stats} />
        </div>

        {monthReservations.length > 0 ? (
          <section className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  This Month&apos;s Reservations
                </h2>
                <p className="text-sm text-gray-500">
                  {monthReservations.length} boat
                  {monthReservations.length === 1 ? "" : "s"} reserved in{" "}
                  {new Date().toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
              <Link
                to="/my-reservations"
                className="text-sm font-semibold text-[#3B63FF] hover:text-blue-700"
              >
                View all trips
              </Link>
            </div>

            <div className="flex flex-col gap-3">
              {additionalMonthReservations.length > 0
                ? additionalMonthReservations.map((reservation) => (
                    <MonthReservationRow
                      key={reservation.id}
                      reservation={reservation}
                    />
                  ))
                : null}
            </div>
          </section>
        ) : null}

        <QuickActions />

        <div className="flex flex-col md:flex-row gap-12">
          <FinancialOverview financial={dashboard.financial_overview} />
          <RecentActivities activities={dashboard.recent_activities} />
        </div>
      </main>
    </div>
  );
}
