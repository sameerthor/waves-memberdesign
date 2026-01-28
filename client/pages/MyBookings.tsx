import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, ChevronRight } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface Booking {
  id: string;
  boatName: string;
  boatType: string;
  boatCategory: string;
  image: string;
  date: string;
  time: string;
  status: "confirmed" | "pending" | "completed" | "cancelled";
}

export default function MyBookings() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("upcoming");

  // Mock booking data
  const bookings: Booking[] = [
    {
      id: "WB-469907",
      boatName: "Sea Breeze",
      boatType: "Hurricane",
      boatCategory: "Deck Boat",
      image:
        "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&h=600&fit=crop",
      date: "Jan 16, 2026",
      time: "10:00 - 13:00",
      status: "confirmed",
    },
    {
      id: "WB-469908",
      boatName: "Ocean Explorer",
      boatType: "Hurricane",
      boatCategory: "Deck Boat",
      image:
        "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=800&h=600&fit=crop",
      date: "Jan 16, 2026",
      time: "10:00 - 13:00",
      status: "pending",
    },
  ];

  const waitlistedBookings: Booking[] = [
    {
      id: "WB-469909",
      boatName: "Wave Runner",
      boatType: "Hurricane",
      boatCategory: "Deck Boat",
      image:
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
      date: "Jan 18, 2026",
      time: "14:00 - 18:00",
      status: "pending",
    },
    {
      id: "WB-469910",
      boatName: "Coastal Cruiser",
      boatType: "Hurricane",
      boatCategory: "Deck Boat",
      image:
        "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=800&h=600&fit=crop",
      date: "Jan 20, 2026",
      time: "09:00 - 12:00",
      status: "pending",
    },
  ];

  const getStatusBadge = (status: Booking["status"]) => {
    switch (status) {
      case "confirmed":
        return (
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-600 border border-green-200">
            Confirmed
          </span>
        );
      case "pending":
        return (
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-50 text-red-600 border border-red-200">
            Pending
          </span>
        );
      case "completed":
        return (
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600 border border-blue-200">
            Completed
          </span>
        );
      case "cancelled":
        return (
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-300">
            Cancelled
          </span>
        );
    }
  };

  const BookingCard = ({ booking }: { booking: Booking }) => (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
      <img
        src={booking.image}
        alt={booking.boatName}
        className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4 mb-2">
          <div className="flex-1 min-w-0">
            <h3 className="text-gray-900 font-semibold text-base mb-1">
              {booking.boatName}
            </h3>
            <p className="text-gray-500 text-sm">
              {booking.boatType} · {booking.boatCategory}
            </p>
          </div>
          {getStatusBadge(booking.status)}
        </div>
        <div className="flex items-center gap-4 text-gray-500 text-sm">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            <span>{booking.date}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            <span>{booking.time}</span>
          </div>
        </div>
      </div>
      <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-10 py-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-900 hover:text-gray-600 transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium text-lg">My Bookings</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-10 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full justify-start bg-transparent border-b border-gray-200 rounded-none h-auto p-0 mb-6">
            <TabsTrigger
              value="upcoming"
              className="relative rounded-none border-b-2 border-transparent data-[state=active]:border-blue-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-3 data-[state=active]:text-gray-900 text-gray-500 font-medium"
            >
              Upcoming
              <span className="ml-2 px-2 py-0.5 rounded-full bg-gray-200 text-gray-700 text-xs font-medium">
                2
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="waitlisted"
              className="relative rounded-none border-b-2 border-transparent data-[state=active]:border-blue-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-3 data-[state=active]:text-gray-900 text-gray-500 font-medium"
            >
              Waitlisted
              <span className="ml-2 px-2 py-0.5 rounded-full bg-gray-200 text-gray-700 text-xs font-medium">
                2
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="past"
              className="relative rounded-none border-b-2 border-transparent data-[state=active]:border-blue-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-3 data-[state=active]:text-gray-900 text-gray-500 font-medium"
            >
              Past
            </TabsTrigger>
            <TabsTrigger
              value="cancelled"
              className="relative rounded-none border-b-2 border-transparent data-[state=active]:border-blue-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-3 data-[state=active]:text-gray-900 text-gray-500 font-medium"
            >
              Cancelled
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="mt-0">
            <div className="space-y-4">
              {bookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="waitlisted" className="mt-0">
            <div className="space-y-4">
              {waitlistedBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="past" className="mt-0">
            <div className="text-center py-12">
              <p className="text-gray-500 text-base">No past bookings</p>
            </div>
          </TabsContent>

          <TabsContent value="cancelled" className="mt-0">
            <div className="text-center py-12">
              <p className="text-gray-500 text-base">No cancelled bookings</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
