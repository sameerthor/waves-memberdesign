import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BookingDetailsStep from "@/components/BookingDetailsStep";
import BookingSummaryStep from "@/components/BookingSummaryStep";
import BookingConfirmation from "@/components/BookingConfirmation";
import { BookingFormData } from "@/components/BookingDetailsStep";

// Mock boat data - in a real app, this would come from props or API
const mockBoats: Record<string, any> = {
  "B001": {
    id: "B001",
    name: "Sea Breeze",
    type: "Hurricane - Deck Boat",
    category: "Deck Boat",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/9b9b095f93ea45803cfc60cf88ccfe90fbf02d5f?width=270",
    location: "Marina Bay",
    guests: 8,
    includedWithMembership: true,
  },
  "B002": {
    id: "B002",
    name: "Ocean Explorer",
    type: "Hurricane - Deck Boat",
    category: "Deck Boat",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/9b9b095f93ea45803cfc60cf88ccfe90fbf02d5f?width=270",
    location: "Marina Bay",
    guests: 8,
    includedWithMembership: false,
  },
};

type BookingStep = "details" | "summary" | "confirmation";

export default function BookingPage() {
  const navigate = useNavigate();
  const { boatId } = useParams<{ boatId: string }>();
  const [currentStep, setCurrentStep] = useState<BookingStep>("details");
  const [formData, setFormData] = useState<BookingFormData | null>(null);
  const [bookingId, setBookingId] = useState<string>("");

  const boat = boatId && mockBoats[boatId];

  if (!boat) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold text-gray-900">Boat not found</h1>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-4 py-2 bg-blue-primary text-white rounded-md hover:bg-blue-primary/90"
        >
          Back to Browse Boats
        </button>
      </div>
    );
  }

  const handleContinue = (data: BookingFormData) => {
    setFormData(data);
    setCurrentStep("summary");
  };

  const handleBack = () => {
    setCurrentStep("details");
  };

  const handleConfirm = () => {
    const generatedId = `WB-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingId(generatedId);
    setCurrentStep("confirmation");
  };

  const handleViewDetails = () => {
    // Navigate to booking details page if needed
    navigate("/bookings");
  };

  const handleGoToBookings = () => {
    navigate("/bookings");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-[616px] mx-auto bg-white rounded-lg p-6">
        {currentStep === "details" && (
          <BookingDetailsStep boat={boat} onContinue={handleContinue} />
        )}
        {currentStep === "summary" && formData && (
          <BookingSummaryStep
            boat={boat}
            formData={formData}
            onConfirm={handleConfirm}
            onBack={handleBack}
          />
        )}
        {currentStep === "confirmation" && formData && (
          <BookingConfirmation
            boat={boat}
            formData={formData}
            bookingId={bookingId}
            onViewDetails={handleViewDetails}
            onGoToBookings={handleGoToBookings}
          />
        )}
      </div>
    </div>
  );
}
