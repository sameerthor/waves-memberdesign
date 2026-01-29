import { useNavigate } from "react-router-dom";
import { Anchor, Calendar, Shield, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Welcome() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Anchor,
      title: "Premium Fleet",
      description: "Access to top-quality boats and yachts",
    },
    {
      icon: Calendar,
      title: "Easy Booking",
      description: "Book your adventure in just a few clicks",
    },
    {
      icon: Shield,
      title: "Secure & Safe",
      description: "Fully insured and regularly maintained vessels",
    },
    {
      icon: Users,
      title: "Expert Support",
      description: "24/7 customer service and on-site assistance",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="w-full py-6 px-4 md:px-6 lg:px-10">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/9b9b095f93ea45803cfc60cf88ccfe90fbf02d5f?width=270"
            alt="WAVES"
            className="h-12 w-auto"
          />
          <Button
            onClick={() => navigate("/login")}
            variant="outline"
            className="border-blue-primary text-blue-primary hover:bg-blue-primary hover:text-white"
          >
            Sign In
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-10">
        <div className="text-center py-16 md:py-24">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Welcome to WAVES
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-4 max-w-3xl mx-auto">
            Your Gateway to Unforgettable Water Adventures
          </p>
          <p className="text-base md:text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
            Discover, book, and enjoy premium boats with our exclusive
            membership program. Your next adventure is just a click away.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button
              onClick={() => navigate("/search")}
              className="bg-blue-primary hover:bg-blue-primary/90 text-white px-8 py-6 text-lg font-semibold w-full sm:w-auto"
            >
              Explore Boats
            </Button>
            <Button
              onClick={() => navigate("/profile")}
              variant="outline"
              className="border-gray-300 text-gray-900 hover:bg-gray-50 px-8 py-6 text-lg font-semibold w-full sm:w-auto"
            >
              Join as Member
            </Button>
          </div>

          {/* Hero Image */}
          <div className="relative w-full max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=1200&h=600&fit=crop&q=80"
              alt="Luxury boat on crystal clear water"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Features Section */}
        <div className="py-16 md:py-24">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            Why Choose WAVES?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="w-16 h-16 rounded-full bg-blue-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-blue-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="py-16 md:py-24 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-blue-400 rounded-2xl p-12 md:p-16 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Set Sail?
            </h2>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              Join thousands of members enjoying exclusive access to our premium
              fleet
            </p>
            <Button
              onClick={() => navigate("/login")}
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg font-semibold"
            >
              Get Started Today
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2026 WAVES. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
