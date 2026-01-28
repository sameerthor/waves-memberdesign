import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Calendar() {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const calendarDays = [
    { day: 1, available: false },
    { day: 2, available: false },
    { day: 3, available: true, selected: true },
    { day: 4, available: false },
    { day: 5, available: false },
    { day: 6, available: false },
    { day: 7, available: false },
    { day: 8, available: false },
    { day: 9, available: false },
    { day: 10, available: false },
    { day: 11, available: false },
    { day: 12, available: false },
    { day: 13, available: false },
    { day: 14, available: false },
    { day: 15, available: false },
    { day: 16, available: false },
    { day: 17, available: false },
    { day: 18, available: false },
    { day: 19, available: false },
    { day: 20, available: false },
    { day: 21, available: true },
    { day: 22, available: false },
    { day: 23, available: false },
    { day: 24, available: false },
    { day: 25, available: false },
    { day: 26, available: false },
    { day: 27, available: false },
    { day: 28, available: false },
    { day: 29, available: false },
    { day: 30, available: false },
    { day: 31, available: false },
  ];

  return (
    <div className="bg-white rounded-md p-5 border-b border-gray-500/25">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-gray-900 font-semibold text-base">March 2026</h3>
        <div className="flex items-center gap-2">
          <button className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors">
            <ChevronLeft className="w-3 h-3 text-gray-900" />
          </button>
          <button className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors">
            <ChevronRight className="w-3 h-3 text-gray-900" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-center pb-2">
            <span className="text-gray-500 text-xs font-semibold font-inter">
              {day}
            </span>
          </div>
        ))}
        {calendarDays.map(({ day, available, selected }) => (
          <div
            key={day}
            className="aspect-square flex items-center justify-center"
          >
            <button
              className={`
                w-8 h-8 rounded-md flex items-center justify-center text-sm
                ${
                  selected
                    ? "bg-blue-primary text-white font-semibold"
                    : available
                      ? "bg-red-500 text-white font-normal"
                      : "text-gray-900 hover:bg-gray-100 font-normal"
                }
                transition-colors
              `}
            >
              {day}
            </button>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-500/25">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-badge rounded-sm"></div>
          <span className="text-xs text-gray-900">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 border border-gray-500/25 rounded-sm bg-white"></div>
          <span className="text-xs text-gray-900">Waitlist</span>
        </div>
      </div>
    </div>
  );
}
