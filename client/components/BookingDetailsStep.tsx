import { ChevronDown } from "lucide-react";

interface BookingDetailsStepProps {
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
  onContinue: (formData: BookingFormData) => void;
}

export interface BookingFormData {
  date: string;
  startTime: string;
  duration: string;
  endTime: string;
  destination: string;
  driverRequired: "yes" | "no-driver" | "provide-driver";
  notes: string;
}

export default function BookingDetailsStep({
  boat,
  onContinue,
}: BookingDetailsStepProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const bookingData: BookingFormData = {
      date: formData.get("date") as string,
      startTime: formData.get("startTime") as string,
      duration: formData.get("duration") as string,
      endTime: formData.get("endTime") as string,
      destination: formData.get("destination") as string,
      driverRequired: formData.get("driverRequired") as "yes" | "no-driver" | "provide-driver",
      notes: formData.get("notes") as string,
    };
    
    onContinue(bookingData);
  };

  return (
    <div className="space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center gap-2">
        <button className="text-gray-900 text-sm flex items-center gap-1 hover:text-gray-700">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 13L5 8L10 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="font-medium">Booking Details</span>
        </button>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-blue-primary flex items-center justify-center text-white text-sm font-semibold">
          1
        </div>
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm font-semibold">
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
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 9.75C10.2426 9.75 11.25 8.74264 11.25 7.5C11.25 6.25736 10.2426 5.25 9 5.25C7.75736 5.25 6.75 6.25736 6.75 7.5C6.75 8.74264 7.75736 9.75 9 9.75Z" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M14.25 7.5C14.25 12 9 16.5 9 16.5C9 16.5 3.75 12 3.75 7.5C3.75 4.59837 6.09837 2.25 9 2.25C11.9016 2.25 14.25 4.59837 14.25 7.5Z" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
            <span>{boat.location}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-500 text-xs mt-1">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 12.75C13.2426 12.75 14.25 11.7426 14.25 10.5C14.25 9.25736 13.2426 8.25 12 8.25C10.7574 8.25 9.75 9.25736 9.75 10.5C9.75 11.7426 10.7574 12.75 12 12.75Z" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M6 12.75C7.24264 12.75 8.25 11.7426 8.25 10.5C8.25 9.25736 7.24264 8.25 6 8.25C4.75736 8.25 3.75 9.25736 3.75 10.5C3.75 11.7426 4.75736 12.75 6 12.75Z" stroke="currentColor" strokeWidth="1.5"/>
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

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <h3 className="text-gray-900 font-semibold text-base mb-4">
            Select Date & Time
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-900 text-sm font-medium mb-2">
                Date
              </label>
              <div className="relative">
                <select
                  name="date"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-500 text-sm appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-primary focus:border-transparent"
                >
                  <option value="">Select Date</option>
                  <option value="2026-01-16">Friday, January 16, 2026</option>
                  <option value="2026-01-17">Saturday, January 17, 2026</option>
                  <option value="2026-01-18">Sunday, January 18, 2026</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-gray-900 text-sm font-medium mb-2">
                Start Time
              </label>
              <div className="relative">
                <select
                  name="startTime"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-500 text-sm appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-primary focus:border-transparent"
                >
                  <option value="">Select Time</option>
                  <option value="10:00">10:00</option>
                  <option value="11:00">11:00</option>
                  <option value="12:00">12:00</option>
                  <option value="13:00">13:00</option>
                  <option value="14:00">14:00</option>
                  <option value="15:00">15:00</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-gray-900 text-sm font-medium mb-2">
                Duration (Hours)<span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  name="duration"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 text-sm appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-primary focus:border-transparent"
                >
                  <option value="">04 hours</option>
                  <option value="1">1 hour</option>
                  <option value="2">2 hours</option>
                  <option value="3">3 hours</option>
                  <option value="4">4 hours</option>
                  <option value="5">5 hours</option>
                  <option value="6">6 hours</option>
                  <option value="8">8 hours</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-900 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-gray-900 text-sm font-medium mb-2">
                End Time (Auto)
              </label>
              <div className="relative">
                <select
                  name="endTime"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 text-sm appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-primary focus:border-transparent"
                >
                  <option value="">10:00</option>
                  <option value="11:00">11:00</option>
                  <option value="12:00">12:00</option>
                  <option value="13:00">13:00</option>
                  <option value="14:00">14:00</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-900 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-gray-900 text-sm font-medium mb-2">
              Destination (optional)
            </label>
            <div className="relative">
              <input
                type="text"
                name="destination"
                placeholder="Where would you like to go"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-500 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-primary focus:border-transparent"
              />
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-gray-900 text-sm font-medium mb-2">
              Driver Required?
            </label>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="driverRequired"
                  value="yes"
                  className="w-4 h-4 text-blue-primary focus:ring-blue-primary"
                  required
                />
                <span className="text-gray-900 text-sm">No, I'll drive</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="driverRequired"
                  value="provide-driver"
                  className="w-4 h-4 text-blue-primary focus:ring-blue-primary"
                />
                <span className="text-gray-900 text-sm">Yes, provide driver</span>
              </label>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-gray-900 text-sm font-medium mb-2">
              Notes (Optional)
            </label>
            <textarea
              name="notes"
              placeholder="Any special requests..."
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-500 text-sm placeholder:text-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-blue-primary focus:border-transparent"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 bg-blue-primary text-white font-semibold text-base rounded-md hover:bg-blue-primary/90 transition-colors"
        >
          Continue
        </button>
      </form>
    </div>
  );
}
