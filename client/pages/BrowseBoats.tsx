import { Search, ArrowUpDown } from "lucide-react";
import { useState } from "react";
import BoatCard from "@/components/BoatCard";
import FiltersSidebar from "@/components/FiltersSidebar";
import BoatDetailModal from "@/components/BoatDetailModal";

export default function BrowseBoats() {
  const [selectedBoat, setSelectedBoat] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectBoat = (boat: any) => {
    setSelectedBoat(boat);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedBoat(null), 300);
  };

  const boats = [
    {
      id: "B001",
      name: "Sea Breeze",
      type: "Hurricane",
      category: "Deck Boat",
      image:
        "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
      ],
      location: "Marina Bay",
      boatType: "Yacht",
      length: "21 ft",
      guests: 6,
      motor: "150 HP 4-Stroke Yamaha",
      fuelCapacity: "55 gallons",
      capacity: "6 passengers / 1300 lbs",
      features: ["Fishing", "Pets Allowed", "Bimini"],
      description:
        "Perfect for family outings and relaxed cruising. Easy to handle with a smooth ride, even in light chop",
      notes: "Great for sunset cruises",
      dockInstructions: "Slip 12A, near the fuel station. Key code: 4521",
      lastBooked: "December 15, 2025",
      yourNotes: "Great for sunset cruises",
      includedWithMembership: true,
      badge: "most-booked" as const,
    },
    {
      id: "B002",
      name: "Ocean Explorer",
      type: "Hurricane",
      category: "Deck Boat",
      image:
        "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=800&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=800&h=600&fit=crop",
      ],
      location: "Marina Bay",
      boatType: "Yacht",
      length: "42 ft",
      guests: 8,
      motor: "250 HP V6",
      fuelCapacity: "75 gallons",
      capacity: "8 passengers / 1800 lbs",
      features: ["Fishing", "Pets Allowed", "Bimini"],
      description: "Spacious yacht perfect for larger groups",
      notes: "Great for fishing trips",
      dockInstructions: "Slip 8B, near the main office",
      pricePerHour: 150,
    },
    {
      id: "B003",
      name: "Wave Runner",
      type: "Hurricane",
      category: "Deck Boat",
      image:
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
      ],
      location: "Marina Bay",
      boatType: "Yacht",
      length: "42 ft",
      guests: 8,
      motor: "200 HP",
      fuelCapacity: "60 gallons",
      capacity: "8 passengers / 1600 lbs",
      features: ["Fishing", "Pets Allowed", "Bimini"],
      description: "Fast and fun for adventurous outings",
      notes: "Not available for booking",
      dockInstructions: "Slip 15C",
      pricePerHour: 150,
      badge: "unavailable" as const,
    },
    {
      id: "B004",
      name: "Coastal Cruiser",
      type: "Hurricane",
      category: "Deck Boat",
      image:
        "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=800&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=800&h=600&fit=crop",
      ],
      location: "Marina Bay",
      boatType: "Yacht",
      length: "42 ft",
      guests: 8,
      motor: "180 HP",
      fuelCapacity: "65 gallons",
      capacity: "8 passengers / 1700 lbs",
      features: ["Fishing", "Pets Allowed", "Bimini"],
      description: "Comfortable cruising for the whole family",
      notes: "Perfect for day trips",
      dockInstructions: "Slip 20A",
      pricePerHour: 150,
    },
    {
      id: "B005",
      name: "Harbor Master",
      type: "Hurricane",
      category: "Deck Boat",
      image:
        "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&h=600&fit=crop",
      ],
      location: "Marina Bay",
      boatType: "Yacht",
      length: "42 ft",
      guests: 8,
      motor: "220 HP",
      fuelCapacity: "70 gallons",
      capacity: "8 passengers / 1750 lbs",
      features: ["Fishing", "Pets Allowed", "Bimini"],
      description: "Premium boat with all the amenities",
      notes: "Popular choice for events",
      dockInstructions: "Slip 5D",
      pricePerHour: 150,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-10 py-5 flex flex-col lg:flex-row gap-5 lg:gap-10">
        {/* Filters Sidebar */}
        <div className="hidden lg:block">
          <FiltersSidebar />
        </div>

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
              <BoatCard
                key={`${boat.id}-${index}`}
                {...boat}
                onSelectBoat={() => handleSelectBoat(boat)}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Boat Detail Modal */}
      {selectedBoat && (
        <BoatDetailModal
          boat={selectedBoat}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
