import { useState } from "react";
import { User, Mail, Phone, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Profile() {
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    mobile: "+1 (555) 000-0000",
  });

  const [showEmergencyContact, setShowEmergencyContact] = useState(false);

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Profile data:", formData);
    // Handle form submission
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-[540px] bg-white rounded-lg shadow-lg p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-gray-900 text-3xl font-bold mb-2">
            Complete Your Profile
          </h1>
          <p className="text-gray-500 text-base">
            Just a few details and you're ready to set sail
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Details Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <User className="w-5 h-5 text-gray-500" />
              <h2 className="text-gray-500 text-base font-medium">
                Personal Details
              </h2>
            </div>

            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-gray-900 text-sm">
                  First Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                  placeholder="John"
                  className="bg-gray-50 border-gray-300"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-gray-900 text-sm">
                  Last Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  placeholder="Doe"
                  className="bg-gray-50 border-gray-300"
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2 mb-4">
              <Label
                htmlFor="email"
                className="flex items-center gap-2 text-gray-900 text-sm"
              >
                <Mail className="w-4 h-4" />
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="john@example.com"
                className="bg-gray-50 border-gray-300"
                required
              />
            </div>

            {/* Mobile Number Field */}
            <div className="space-y-2">
              <Label
                htmlFor="mobile"
                className="flex items-center gap-2 text-gray-900 text-sm"
              >
                <Phone className="w-4 h-4" />
                Mobile Number <span className="text-red-500">*</span>
              </Label>
              <Input
                id="mobile"
                type="tel"
                value={formData.mobile}
                onChange={(e) => handleInputChange("mobile", e.target.value)}
                placeholder="+1 (555) 000-0000"
                className="bg-gray-50 border-gray-300"
                required
              />
            </div>
          </div>

          {/* Add Emergency Contact Button */}
          <button
            type="button"
            onClick={() => setShowEmergencyContact(!showEmergencyContact)}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gray-100 text-gray-700 font-medium text-sm rounded-md hover:bg-gray-200 transition-colors"
          >
            <UserPlus className="w-4 h-4" />
            Add Emergency Contact (Optional)
          </button>

          {/* Emergency Contact Fields (shown when toggled) */}
          {showEmergencyContact && (
            <div className="p-4 bg-gray-50 rounded-lg space-y-4">
              <h3 className="text-gray-900 font-medium text-sm">
                Emergency Contact
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-gray-900 text-sm">Contact Name</Label>
                  <Input
                    type="text"
                    placeholder="Jane Doe"
                    className="bg-white border-gray-300"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-900 text-sm">Relationship</Label>
                  <Input
                    type="text"
                    placeholder="Spouse"
                    className="bg-white border-gray-300"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-gray-900 text-sm">Phone Number</Label>
                <Input
                  type="tel"
                  placeholder="+1 (555) 000-0001"
                  className="bg-white border-gray-300"
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-base font-semibold"
          >
            Complete Profile
          </Button>
        </form>
      </div>
    </div>
  );
}
