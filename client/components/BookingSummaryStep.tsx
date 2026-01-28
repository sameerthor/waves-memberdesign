import { BookingFormData } from "./BookingDetailsStep";

interface BookingSummaryStepProps {
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
  onConfirm: () => void;
  onBack: () => void;
}

export default function BookingSummaryStep({
  boat,
  formData,
  onConfirm,
  onBack,
}: BookingSummaryStepProps) {
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center gap-2">
        <button
          onClick={onBack}
          className="text-gray-900 text-sm flex items-center gap-1 hover:text-gray-700"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 13L5 8L10 3"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="font-medium">Booking Summary</span>
        </button>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm font-semibold">
          1
        </div>
        <div className="w-8 h-8 rounded-full bg-blue-primary flex items-center justify-center text-white text-sm font-semibold">
          2
        </div>
      </div>

      {/* Boat Info Card */}
      <div className="flex gap-4 p-4 rounded-lg border border-gray-300 bg-white">
        <img
          src={boat.image}
          alt={boat.name}
          className="w-[75px] h-[75px] rounded-md object-cover flex-shrink-0"
        />
        <div className="flex-1">
          <h3 className="text-gray-900 font-semibold text-base">{boat.name}</h3>
          <div className="flex items-center gap-1 text-xs text-gray-900 mt-1">
            <span>{boat.type}</span>
            <span className="w-0.5 h-0.5 bg-gray-900 rounded-full"></span>
            <span>{boat.category}</span>
          </div>
          <div className="text-gray-500 text-xs mt-1">{boat.id}</div>
          <div className="flex items-center gap-1 text-gray-500 text-xs mt-1">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 9.75C10.2426 9.75 11.25 8.74264 11.25 7.5C11.25 6.25736 10.2426 5.25 9 5.25C7.75736 5.25 6.75 6.25736 6.75 7.5C6.75 8.74264 7.75736 9.75 9 9.75Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M14.25 7.5C14.25 12 9 16.5 9 16.5C9 16.5 3.75 12 3.75 7.5C3.75 4.59837 6.09837 2.25 9 2.25C11.9016 2.25 14.25 4.59837 14.25 7.5Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
            <span>{boat.location}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-500 text-xs mt-1">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 12.75C13.2426 12.75 14.25 11.7426 14.25 10.5C14.25 9.25736 13.2426 8.25 12 8.25C10.7574 8.25 9.75 9.25736 9.75 10.5C9.75 11.7426 10.7574 12.75 12 12.75Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M6 12.75C7.24264 12.75 8.25 11.7426 8.25 10.5C8.25 9.25736 7.24264 8.25 6 8.25C4.75736 8.25 3.75 9.25736 3.75 10.5C3.75 11.7426 4.75736 12.75 6 12.75Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
            <span>{boat.guests} Guests</span>
          </div>
        </div>
        {boat.includedWithMembership && (
          <div className="px-2 py-1 h-fit rounded-lg border border-blue-primary/64 bg-blue-primary/11">
            <span className="text-blue-primary text-xs font-normal">
              Included
            </span>
          </div>
        )}
      </div>

      {/* Summary Section */}
      <div className="space-y-4">
        <h3 className="text-gray-900 font-semibold text-base">
          Review your booking
        </h3>

        <div className="space-y-3">
          <div className="flex justify-between items-center pb-3 border-b border-gray-200">
            <span className="text-gray-500 text-sm">Date</span>
            <span className="text-gray-900 text-sm font-medium">
              {formatDate(formData.date)}
            </span>
          </div>

          <div className="flex justify-between items-center pb-3 border-b border-gray-200">
            <span className="text-gray-500 text-sm">Time</span>
            <span className="text-gray-900 text-sm font-medium">
              {formData.startTime} - {formData.endTime}
            </span>
          </div>

          <div className="flex justify-between items-center pb-3 border-b border-gray-200">
            <span className="text-gray-500 text-sm">Duration</span>
            <span className="text-gray-900 text-sm font-medium">
              {formData.duration || "3 hours"}
            </span>
          </div>

          <div className="flex justify-between items-center pb-3 border-b border-gray-200">
            <span className="text-gray-500 text-sm">Driver</span>
            <span className="text-gray-900 text-sm font-medium">
              {formData.driverRequired === "yes"
                ? "Self-drive"
                : formData.driverRequired === "provide-driver"
                  ? "Requested"
                  : "Not specified"}
            </span>
          </div>
        </div>

        {/* Membership Badge */}
        <div className="p-4 rounded-lg bg-blue-primary/11 border border-blue-primary/64 flex items-start gap-3">
          <div className="w-6 h-6 flex-shrink-0">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="24" height="24" rx="12" fill="#2948FF" />
              <path
                d="M17 9L10.5 15.5L7 12"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="flex-1">
            <h4 className="text-gray-900 font-semibold text-sm">
              Gold Membership
            </h4>
            <p className="text-gray-900 text-xs mt-1">
              Included with Membership
            </p>
          </div>
          <button className="px-3 py-1 rounded-lg bg-blue-primary/11 border border-blue-primary text-blue-primary text-xs font-medium hover:bg-blue-primary/20 transition-colors">
            No Charge
          </button>
        </div>

        {/* Post-Trip Billing Notice */}
        <div className="p-3 rounded-lg bg-blue-primary/8 flex items-start gap-2">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="flex-shrink-0 mt-0.5"
          >
            <path
              d="M10.0003 18.3334C5.39795 18.3334 1.66699 14.6024 1.66699 10C1.66699 5.39765 5.39795 1.66669 10.0003 1.66669C14.6027 1.66669 18.3337 5.39765 18.3337 10C18.3337 14.6024 14.6027 18.3334 10.0003 18.3334ZM10.0003 16.6667C13.6822 16.6667 16.667 13.6819 16.667 10C16.667 6.31812 13.6822 3.33335 10.0003 3.33335C6.31843 3.33335 3.33366 6.31812 3.33366 10C3.33366 13.6819 6.31843 16.6667 10.0003 16.6667ZM9.16699 5.83335H10.8337V7.50002H9.16699V5.83335ZM9.16699 9.16669H10.8337V14.1667H9.16699V9.16669Z"
              fill="#2948FF"
            />
          </svg>
          <div className="flex-1">
            <h4 className="text-gray-900 font-semibold text-sm">
              Post-Trip Billing
            </h4>
            <p className="text-gray-500 text-xs mt-1">
              No payment is required now. Fuel and usage charges will be billed
              after your trip based on actual consumption.
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={onConfirm}
        className="w-full py-3 px-4 bg-blue-primary text-white font-semibold text-base rounded-md hover:bg-blue-primary/90 transition-colors"
      >
        Confirm Booking
      </button>
    </div>
  );
}
