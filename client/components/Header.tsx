import { Link } from "react-router-dom";
import { User } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full h-[78px] bg-white border-b border-gray-500/25 flex items-center justify-between px-4 md:px-6 lg:px-10">
      <Link to="/" className="flex-shrink-0">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/9b9b095f93ea45803cfc60cf88ccfe90fbf02d5f?width=270"
          alt="WAV List"
          className="h-12 w-auto"
        />
      </Link>

      <nav className="hidden md:flex items-center gap-4 lg:gap-6">
        <Link
          to="/search"
          className="text-gray-900 font-medium text-base hover:text-blue-primary transition-colors"
        >
          Search
        </Link>
        <Link to="/" className="text-blue-primary font-bold text-base">
          Browse Boats
        </Link>
        <Link
          to="/bookings"
          className="text-gray-900 font-medium text-base hover:text-blue-primary transition-colors"
        >
          My Bookings
        </Link>
        <Link
          to="/membership"
          className="text-gray-900 font-medium text-base hover:text-blue-primary transition-colors"
        >
          Membership
        </Link>
      </nav>

      <div className="flex items-center gap-2 md:gap-3">
        <div className="text-right">
          <div className="text-gray-900 font-semibold text-sm">John Doe</div>
          <div className="text-gray-500 text-xs">Platinum Member</div>
        </div>
        <div className="w-10 h-10 rounded-full bg-blue-primary flex items-center justify-center">
          <User className="w-6 h-6 text-white" />
        </div>
      </div>
    </header>
  );
}
