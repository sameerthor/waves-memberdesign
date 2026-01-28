import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, MapPin, Users, Info, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BookingData {
  date: string;
  startTime: string;
  duration: string;
  endTime: string;
  destination: string;
  driverRequired: "yes" | "no";
  notes: string;
}

export default function BookingFlow() {
  const navigate = useNavigate();
  const location = useLocation();
  const boat = location.state?.boat;

  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState<BookingData>({
    date: "",
    startTime: "",
    duration: "04 hours",
    endTime: "",
    destination: "",
    driverRequired: "yes",
    notes: "",
  });

  // Generate random booking ID
  const [bookingId] = useState(
    `WB-${Math.floor(100000 + Math.random() * 900000)}`,
  );

  if (!boat) {
    navigate("/");
    return null;
  }

  const handleInputChange = (
    field: keyof BookingData,
    value: string | "yes" | "no",
  ) => {
    setBookingData((prev) => {
      const updated = { ...prev, [field]: value };

      // Auto-calculate end time when start time or duration changes
      if (field === "startTime" || field === "duration") {
        const startTime = field === "startTime" ? value : prev.startTime;
        const duration = field === "duration" ? value : prev.duration;

        if (startTime && duration) {
          const [hours, minutes] = startTime.split(":").map(Number);
          const durationHours = parseInt(duration.split(" ")[0]);
          const endHour = (hours + durationHours) % 24;
          updated.endTime = `${String(endHour).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
        }
      }

      return updated;
    });
  };

  const handleContinue = () => {
    if (step === 1) {
      setStep(2);
      window.scrollTo(0, 0);
    } else if (step === 2) {
      setStep(3);
      window.scrollTo(0, 0);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo(0, 0);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with back button */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-10 py-6">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-900 hover:text-gray-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">
              {step === 3 ? "Booking Summary" : "Booking Details"}
            </span>
          </button>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-10 py-8">
        {/* Step Indicator */}
        {step !== 3 && (
          <div className="flex items-center justify-center gap-3 mb-8">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full ${
                step === 1
                  ? "bg-blue-primary text-white"
                  : "bg-white text-gray-900 border border-gray-300"
              } font-semibold`}
            >
              1
            </div>
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full ${
                step === 2
                  ? "bg-blue-primary text-white"
                  : "bg-white text-gray-900 border border-gray-300"
              } font-semibold`}
            >
              2
            </div>
          </div>
        )}

        {/* Main Content Container */}
        <div className="max-w-[680px] mx-auto">
          {/* Step 1: Booking Details */}
          {step === 1 && (
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              {/* Boat Info Header */}
              <div className="flex items-center gap-4 p-6 border-b border-gray-200">
                <img
                  src={boat.images?.[0] || boat.image}
                  alt={boat.name}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h2 className="text-gray-900 text-lg font-semibold mb-1">
                    {boat.name}
                  </h2>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-gray-900 text-sm">{boat.type}</span>
                    <span className="w-1 h-1 bg-gray-900 rounded-full"></span>
                    <span className="text-gray-900 text-sm">
                      {boat.category}
                    </span>
                  </div>
                  <div className="text-gray-500 text-xs">{boat.id}</div>
                </div>
                {boat.includedWithMembership && (
                  <div className="px-2 py-1 rounded-lg border border-blue-primary/64 bg-blue-primary/11">
                    <span className="text-blue-primary text-xs">Included</span>
                  </div>
                )}
              </div>

              {/* Boat Quick Info */}
              <div className="flex items-center gap-6 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-900 text-sm">{boat.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-900 text-sm">
                    {boat.guests} Guests
                  </span>
                </div>
              </div>

              {/* Form Section */}
              <div className="p-6">
                <h3 className="text-gray-900 text-xl font-semibold mb-6">
                  Select Date & Time
                </h3>

                <div className="space-y-6">
                  {/* Date and Start Time Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date" className="text-gray-900 text-sm">
                        Date
                      </Label>
                      <Select
                        value={bookingData.date}
                        onValueChange={(value) =>
                          handleInputChange("date", value)
                        }
                      >
                        <SelectTrigger
                          id="date"
                          className="bg-white border-gray-300"
                        >
                          <SelectValue placeholder="Select Date" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2026-01-16">
                            Friday, January 16, 2026
                          </SelectItem>
                          <SelectItem value="2026-01-17">
                            Saturday, January 17, 2026
                          </SelectItem>
                          <SelectItem value="2026-01-18">
                            Sunday, January 18, 2026
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="startTime"
                        className="text-gray-900 text-sm"
                      >
                        Start Time
                      </Label>
                      <Select
                        value={bookingData.startTime}
                        onValueChange={(value) =>
                          handleInputChange("startTime", value)
                        }
                      >
                        <SelectTrigger
                          id="startTime"
                          className="bg-white border-gray-300"
                        >
                          <SelectValue placeholder="Select Time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="08:00">08:00 AM</SelectItem>
                          <SelectItem value="09:00">09:00 AM</SelectItem>
                          <SelectItem value="10:00">10:00 AM</SelectItem>
                          <SelectItem value="11:00">11:00 AM</SelectItem>
                          <SelectItem value="12:00">12:00 PM</SelectItem>
                          <SelectItem value="13:00">01:00 PM</SelectItem>
                          <SelectItem value="14:00">02:00 PM</SelectItem>
                          <SelectItem value="15:00">03:00 PM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Duration and End Time Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="duration"
                        className="text-gray-900 text-sm"
                      >
                        Duration (Hours)*
                      </Label>
                      <Select
                        value={bookingData.duration}
                        onValueChange={(value) =>
                          handleInputChange("duration", value)
                        }
                      >
                        <SelectTrigger
                          id="duration"
                          className="bg-white border-gray-300"
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="02 hours">02 hours</SelectItem>
                          <SelectItem value="03 hours">03 hours</SelectItem>
                          <SelectItem value="04 hours">04 hours</SelectItem>
                          <SelectItem value="05 hours">05 hours</SelectItem>
                          <SelectItem value="06 hours">06 hours</SelectItem>
                          <SelectItem value="08 hours">08 hours</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="endTime"
                        className="text-gray-900 text-sm"
                      >
                        End Time (Auto)
                      </Label>
                      <Input
                        id="endTime"
                        value={bookingData.endTime || "10:00"}
                        readOnly
                        className="bg-gray-50 border-gray-300"
                      />
                    </div>
                  </div>

                  {/* Destination */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="destination"
                      className="text-gray-900 text-sm"
                    >
                      Destination (optional)
                    </Label>
                    <Select
                      value={bookingData.destination}
                      onValueChange={(value) =>
                        handleInputChange("destination", value)
                      }
                    >
                      <SelectTrigger
                        id="destination"
                        className="bg-white border-gray-300"
                      >
                        <SelectValue placeholder="Where would you like to go" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="coastal-tour">
                          Coastal Tour
                        </SelectItem>
                        <SelectItem value="island-hopping">
                          Island Hopping
                        </SelectItem>
                        <SelectItem value="fishing-spot">
                          Fishing Spot
                        </SelectItem>
                        <SelectItem value="sunset-cruise">
                          Sunset Cruise
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Driver Required */}
                  <div className="space-y-2">
                    <Label className="text-gray-900 text-sm">
                      Driver Required?
                    </Label>
                    <RadioGroup
                      value={bookingData.driverRequired}
                      onValueChange={(value: "yes" | "no") =>
                        handleInputChange("driverRequired", value)
                      }
                      className="flex gap-6"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="driver-yes" />
                        <Label
                          htmlFor="driver-yes"
                          className="text-gray-900 text-sm font-normal cursor-pointer"
                        >
                          Yes, I'll drive
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="driver-no" />
                        <Label
                          htmlFor="driver-no"
                          className="text-gray-900 text-sm font-normal cursor-pointer"
                        >
                          Yes, provide driver
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Notes */}
                  <div className="space-y-2">
                    <Label htmlFor="notes" className="text-gray-900 text-sm">
                      Notes (Optional)
                    </Label>
                    <Textarea
                      id="notes"
                      placeholder="Any special requests..."
                      value={bookingData.notes}
                      onChange={(e) =>
                        handleInputChange("notes", e.target.value)
                      }
                      className="bg-white border-gray-300 min-h-[100px] resize-none"
                    />
                  </div>

                  {/* Continue Button */}
                  <Button
                    onClick={handleContinue}
                    disabled={!bookingData.date || !bookingData.startTime}
                    className="w-full bg-blue-primary hover:bg-blue-primary/90 text-white py-6 text-base font-semibold"
                  >
                    Continue
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Booking Summary */}
          {step === 2 && (
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              {/* Boat Info Header */}
              <div className="flex items-center gap-4 p-6 border-b border-gray-200">
                <img
                  src={boat.images?.[0] || boat.image}
                  alt={boat.name}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h2 className="text-gray-900 text-lg font-semibold mb-1">
                    {boat.name}
                  </h2>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-gray-900 text-sm">{boat.type}</span>
                    <span className="w-1 h-1 bg-gray-900 rounded-full"></span>
                    <span className="text-gray-900 text-sm">
                      {boat.category}
                    </span>
                  </div>
                  <div className="text-gray-500 text-xs">{boat.id}</div>
                </div>
                {boat.includedWithMembership && (
                  <div className="px-2 py-1 rounded-lg border border-blue-primary/64 bg-blue-primary/11">
                    <span className="text-blue-primary text-xs">Included</span>
                  </div>
                )}
              </div>

              {/* Boat Quick Info */}
              <div className="flex items-center gap-6 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-900 text-sm">{boat.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-900 text-sm">
                    {boat.guests} Guests
                  </span>
                </div>
              </div>

              {/* Review Section */}
              <div className="p-6">
                <h3 className="text-gray-900 text-xl font-semibold mb-6">
                  Review your booking
                </h3>

                {/* Booking Details Grid */}
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500 text-sm">Date</span>
                    <span className="text-gray-900 text-sm font-medium">
                      {bookingData.date === "2026-01-16"
                        ? "Friday, January 16, 2026"
                        : bookingData.date === "2026-01-17"
                          ? "Saturday, January 17, 2026"
                          : "Sunday, January 18, 2026"}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500 text-sm">Time</span>
                    <span className="text-gray-900 text-sm font-medium">
                      {bookingData.startTime} - {bookingData.endTime}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500 text-sm">Duration</span>
                    <span className="text-gray-900 text-sm font-medium">
                      {bookingData.duration}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500 text-sm">Driver</span>
                    <span className="text-gray-900 text-sm font-medium">
                      {bookingData.driverRequired === "yes"
                        ? "Requested"
                        : "Self Drive"}
                    </span>
                  </div>
                </div>

                {/* Membership Info */}
                <div className="flex items-start gap-3 p-4 bg-blue-primary/5 rounded-lg border border-blue-primary/20 mb-4">
                  <svg
                    className="w-5 h-5 text-blue-primary flex-shrink-0 mt-0.5"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 2L3 7V11C3 14.866 6.134 18 10 18C13.866 18 17 14.866 17 11V7L10 2Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex-1">
                    <h4 className="text-gray-900 text-sm font-semibold mb-1">
                      Gold Membership
                    </h4>
                    <p className="text-gray-600 text-xs">
                      Included with Membership
                    </p>
                  </div>
                  <span className="px-2 py-1 rounded-md bg-green-50 border border-green-200 text-green-700 text-xs font-medium">
                    No Charge
                  </span>
                </div>

                {/* Post-Trip Billing Info */}
                <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg mb-6">
                  <Info className="w-5 h-5 text-blue-primary flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="text-gray-900 text-sm font-semibold mb-1">
                      Post-Trip Billing
                    </h4>
                    <p className="text-gray-600 text-xs">
                      No payment is required now. Fuel and usage charges will be
                      billed after your trip based on actual consumption.
                    </p>
                  </div>
                </div>

                {/* Confirm Button */}
                <Button
                  onClick={handleContinue}
                  className="w-full bg-blue-primary hover:bg-blue-primary/90 text-white py-6 text-base font-semibold"
                >
                  Confirm Booking
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Booking Confirmed */}
          {step === 3 && (
            <div className="text-center">
              {/* Success Icon */}
              <div className="flex items-center justify-center mb-6">
                <div className="relative">
                  <div className="w-28 h-28 rounded-full bg-green-500/10 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Success Message */}
              <div className="mb-8">
                <h2 className="text-gray-900 text-2xl font-bold mb-4">
                  Booking Confirmed!
                </h2>
                <p className="text-gray-500 text-base">Your adventure awaits</p>
              </div>

              {/* Booking Details Card */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-6">
                {/* Booking ID */}
                <div className="text-center mb-6 pb-6 border-b border-gray-100">
                  <h3 className="text-gray-500 text-xl font-medium mb-2">
                    Booking ID
                  </h3>
                  <p className="text-blue-primary text-2xl font-bold">
                    {bookingId}
                  </p>
                </div>

                {/* Details Grid */}
                <div className="space-y-4 text-left">
                  <div className="flex justify-between py-2">
                    <span className="text-gray-500 text-sm">Boat</span>
                    <span className="text-gray-900 text-sm font-semibold">
                      {boat.name}
                    </span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-500 text-sm">Date</span>
                    <span className="text-gray-900 text-sm font-semibold">
                      {bookingData.date === "2026-01-16"
                        ? "Jan 16, 2026"
                        : bookingData.date === "2026-01-17"
                          ? "Jan 17, 2026"
                          : "Jan 18, 2026"}
                    </span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-500 text-sm">Time</span>
                    <span className="text-gray-900 text-sm font-semibold">
                      {bookingData.startTime} - {bookingData.endTime}
                    </span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-500 text-sm">Location</span>
                    <span className="text-gray-900 text-sm font-semibold">
                      {boat.location}
                    </span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-500 text-sm">Membership</span>
                    <span className="px-2 py-1 rounded-full bg-blue-primary/11 border border-blue-primary/30 text-blue-primary text-xs font-medium">
                      Gold Member
                    </span>
                  </div>
                </div>

                {/* Info Banner */}
                <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg mt-6">
                  <Info className="w-5 h-5 text-blue-primary flex-shrink-0 mt-0.5" />
                  <p className="text-gray-600 text-xs text-left">
                    No payment is required now. Fuel and usage charges will be
                    billed after your trip.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  onClick={() => navigate("/bookings")}
                  className="w-full bg-blue-primary hover:bg-blue-primary/90 text-white py-6 text-base font-semibold"
                >
                  View booking details
                </Button>
                <Button
                  onClick={() => navigate("/bookings")}
                  variant="outline"
                  className="w-full border-gray-300 text-gray-900 hover:bg-gray-50 py-6 text-base font-semibold"
                >
                  Go to My Bookings
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
