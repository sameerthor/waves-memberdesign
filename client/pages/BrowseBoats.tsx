import { Search, ArrowUpDown } from "lucide-react";
import BoatCard from "@/components/BoatCard";
import FiltersSidebar from "@/components/FiltersSidebar";

export default function BrowseBoats() {
  const boats = [
    {
      id: "BO01",
      name: "Sea Breeze",
      type: "Hurricane",
      category: "Deck Boat",
      image: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&h=600&fit=crop",
      location: "Marina Bay",
      boatType: "Yacht",
      length: "42 ft",
      guests: 8,
      features: ["Fishing", "Pets Allowed", "Bimini"],
      includedWithMembership: true,
      badge: "most-booked" as const,
    },
    {
      id: "BO01",
      name: "Ocean Explorer",
      type: "Hurricane",
      category: "Deck Boat",
      image: "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=800&h=600&fit=crop",
      location: "Marina Bay",
      boatType: "Yacht",
      length: "42 ft",
      guests: 8,
      features: ["Fishing", "Pets Allowed", "Bimini"],
      pricePerHour: 150,
    },
    {
      id: "BO01",
      name: "Sea Breeze",
      type: "Hurricane",
      category: "Deck Boat",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
      location: "Marina Bay",
      boatType: "Yacht",
      length: "42 ft",
      guests: 8,
      features: ["Fishing", "Pets Allowed", "Bimini"],
      pricePerHour: 150,
      badge: "unavailable" as const,
    },
    {
      id: "BO01",
      name: "Sea Breeze",
      type: "Hurricane",
      category: "Deck Boat",
      image: "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=800&h=600&fit=crop",
      location: "Marina Bay",
      boatType: "Yacht",
      length: "42 ft",
      guests: 8,
      features: ["Fishing", "Pets Allowed", "Bimini"],
      pricePerHour: 150,
    },
    {
      id: "BO01",
      name: "Sea Breeze",
      type: "Hurricane",
      category: "Deck Boat",
      image: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&h=600&fit=crop",
      location: "Marina Bay",
      boatType: "Yacht",
      length: "42 ft",
      guests: 8,
      features: ["Fishing", "Pets Allowed", "Bimini"],
      pricePerHour: 150,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-[1440px] mx-auto px-10 py-5 flex gap-10">
        {/* Filters Sidebar */}
        <FiltersSidebar />

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-gray-900 text-2xl font-semibold mb-1">
              Tuesday March 3, 2026
            </h1>
            <p className="text-gray-500 text-sm">12 boats found</p>
          </div>

          {/* Search and Sort */}
          <div className="flex items-center justify-between mb-6">
            <div className="relative flex-1 max-w-[206px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search... Boats"
                className="w-full pl-10 pr-4 py-2.5 bg-gray-100 rounded-md text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-primary"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 text-gray-900 font-medium text-base hover:bg-gray-100 rounded-md transition-colors">
              <ArrowUpDown className="w-5 h-5" />
              <span>Sort Search</span>
            </button>
          </div>

          {/* Boat List */}
          <div className="flex flex-col gap-5">
            {boats.map((boat, index) => (
              <BoatCard key={`${boat.id}-${index}`} {...boat} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
