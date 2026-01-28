import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import BookingDetailsStep from "./BookingDetailsStep";
import BookingSummaryStep from "./BookingSummaryStep";
import BookingConfirmation from "./BookingConfirmation";
import { BookingFormData } from "./BookingDetailsStep";

interface BookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  boat: {
    id: string;
    name: string;
    type: string;
    category: string;
    image: string;
    location: string;
    guests: number;
    includedWithMembership?: boolean;
  };
}

type BookingStep = "details" | "summary" | "confirmation";

export default function BookingDialog({
  open,
  onOpenChange,
  boat,
}: BookingDialogProps) {
  const [currentStep, setCurrentStep] = useState<BookingStep>("details");
  const [formData, setFormData] = useState<BookingFormData | null>(null);
  const [bookingId, setBookingId] = useState<string>("");

  const handleContinue = (data: BookingFormData) => {
    setFormData(data);
    setCurrentStep("summary");
  };

  const handleBack = () => {
    setCurrentStep("details");
  };

  const handleConfirm = () => {
    // Generate a random booking ID
    const generatedId = `WB-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingId(generatedId);
    setCurrentStep("confirmation");
  };

  const handleViewDetails = () => {
    // This could navigate to a booking details page
    console.log("View booking details", bookingId);
    handleClose();
  };

  const handleGoToBookings = () => {
    // This could navigate to the bookings page
    window.location.href = "/bookings";
    handleClose();
  };

  const handleClose = () => {
    onOpenChange(false);
    // Reset state after a short delay to avoid visual glitches
    setTimeout(() => {
      setCurrentStep("details");
      setFormData(null);
      setBookingId("");
    }, 300);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[90vw] md:max-w-[616px] max-h-[90vh] overflow-y-auto p-6 [&>button]:hidden">
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
      </DialogContent>
    </Dialog>
  );
}
