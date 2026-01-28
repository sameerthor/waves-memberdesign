import { BookingFormData } from "./BookingDetailsStep";

interface BookingConfirmationProps {
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
  formData: BookingFormData;
  bookingId: string;
  onViewDetails: () => void;
  onGoToBookings: () => void;
}

export default function BookingConfirmation({
  boat,
  formData,
  bookingId,
  onViewDetails,
  onGoToBookings,
}: BookingConfirmationProps) {
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="flex flex-col items-center py-8 px-4">
      {/* Success Icon */}
      <div className="relative w-[113px] h-[113px] mb-6">
        <div className="absolute inset-0 rounded-full bg-green-500/13 flex items-center justify-center">
          <div className="w-[54px] h-[54px] rounded-full bg-green-500 flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.18763 12.4226L15.7147 4.89548L16.8727 6.05349L8.18763 14.7386L2.97656 9.52756L4.13458 8.36956L8.18763 12.4226Z" fill="white"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Success Message */}
      <div className="text-center mb-8">
        <h2 className="text-gray-900 text-2xl font-bold mb-2">
          Booking Confirmed!
        </h2>
        <p className="text-gray-500 text-base">Your adventure awaits</p>
      </div>

      {/* Booking Details Card */}
      <div className="w-full max-w-[564px] rounded-md border border-gray-300 bg-white overflow-hidden">
        {/* Booking ID */}
        <div className="flex flex-col items-center gap-4 py-8 border-b border-gray-300">
          <h3 className="text-gray-500 text-xl font-medium">Booking ID</h3>
          <p className="text-blue-primary text-2xl font-bold">{bookingId}</p>
        </div>

        {/* Details */}
        <div className="p-6 space-y-4">
          <div className="flex justify-between items-center pb-4 border-b border-gray-300">
            <span className="text-gray-500 text-base">Boat</span>
            <span className="text-gray-900 text-base font-medium">{boat.name}</span>
          </div>

          <div className="flex justify-between items-center pb-4 border-b border-gray-300">
            <span className="text-gray-500 text-base">Date</span>
            <span className="text-gray-900 text-base font-medium">
              {formatDate(formData.date)}
            </span>
          </div>

          <div className="flex justify-between items-center pb-4 border-b border-gray-300">
            <span className="text-gray-500 text-base">Time</span>
            <span className="text-gray-900 text-base font-medium">
              {formData.startTime} - {formData.endTime}
            </span>
          </div>

          <div className="flex justify-between items-center pb-4 border-b border-gray-300">
            <span className="text-gray-500 text-base">Location</span>
            <span className="text-gray-900 text-base font-medium">{boat.location}</span>
          </div>

          <div className="flex justify-between items-center pb-4">
            <span className="text-gray-500 text-base">Membership</span>
            <span className="inline-flex px-3 py-1 rounded-lg bg-blue-primary/11 border border-blue-primary text-blue-primary text-sm font-medium">
              Gold Member
            </span>
          </div>

          {/* Post-Trip Billing Notice */}
          <div className="p-3 rounded-lg bg-blue-primary/8 flex items-start gap-2 mt-6">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 mt-0.5">
              <path d="M10.0003 18.3334C5.39795 18.3334 1.66699 14.6024 1.66699 10C1.66699 5.39765 5.39795 1.66669 10.0003 1.66669C14.6027 1.66669 18.3337 5.39765 18.3337 10C18.3337 14.6024 14.6027 18.3334 10.0003 18.3334ZM10.0003 16.6667C13.6822 16.6667 16.667 13.6819 16.667 10C16.667 6.31812 13.6822 3.33335 10.0003 3.33335C6.31843 3.33335 3.33366 6.31812 3.33366 10C3.33366 13.6819 6.31843 16.6667 10.0003 16.6667ZM9.16699 5.83335H10.8337V7.50002H9.16699V5.83335ZM9.16699 9.16669H10.8337V14.1667H9.16699V9.16669Z" fill="#2948FF"/>
            </svg>
            <p className="text-gray-500 text-sm flex-1">
              No payment is required now. Fuel and usage charges will be billed after your trip.
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="w-full max-w-[564px] mt-6 space-y-3">
        <button
          onClick={onViewDetails}
          className="w-full py-3 px-4 bg-blue-primary text-white font-semibold text-base rounded-md hover:bg-blue-primary/90 transition-colors"
        >
          View booking details
        </button>
        <button
          onClick={onGoToBookings}
          className="w-full py-3 px-4 border border-gray-300 text-gray-900 font-semibold text-base rounded-md hover:bg-gray-50 transition-colors"
        >
          Go to My Bookings
        </button>
      </div>
    </div>
  );
}
