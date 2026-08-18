import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useAuth } from "@/context/AuthContext";
import { publicApiCall } from "@/utils/api";
import { isProfileComplete } from "@/utils/profileValidation";
import { cn } from "@/lib/utils";

type LoginTab = "password" | "otp";

interface AuthUserPayload {
  id: number;
  email: string | null;
  first_name?: string;
  last_name?: string;
}

interface AuthResponse {
  data: {
    user: AuthUserPayload;
    token: string;
  };
}

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [activeTab, setActiveTab] = useState<LoginTab>("password");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const resetMessages = () => {
    setError("");
    setInfo("");
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value as LoginTab);
    resetMessages();
    setOtp("");
    setOtpSent(false);
  };

  const completeLogin = (
    user: AuthUserPayload,
    token: string,
    loginMethod: LoginTab,
  ) => {
    login(
      {
        id: String(user.id),
        email: user.email,
        loginMethod,
        profile: user,
      },
      {
        accessToken: token,
        refreshToken: "",
      },
    );

    if (!isProfileComplete(user)) {
      navigate("/profile");
    } else {
      navigate("/");
    }
  };

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    resetMessages();
    setIsLoading(true);

    if (!email.trim()) {
      setError("Please enter your email address");
      setIsLoading(false);
      return;
    }

    if (!password) {
      setError("Please enter your password");
      setIsLoading(false);
      return;
    }

    try {
      const data = await publicApiCall<AuthResponse>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      if (data.data?.user && data.data?.token) {
        completeLogin(data.data.user, data.data.token, "password");
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Network error. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendOtp = async () => {
    resetMessages();
    setIsLoading(true);

    if (!email.trim()) {
      setError("Please enter your email address");
      setIsLoading(false);
      return;
    }

    try {
      await publicApiCall("/api/auth/send-otp", {
        method: "POST",
        body: JSON.stringify({ email: email.trim() }),
      });

      setOtpSent(true);
      setInfo("A one-time passcode has been sent to your email.");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to send one-time passcode. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    resetMessages();
    setIsLoading(true);

    if (!email.trim()) {
      setError("Please enter your email address");
      setIsLoading(false);
      return;
    }

    if (otp.length !== 6) {
      setError("Please enter the 6-digit passcode");
      setIsLoading(false);
      return;
    }

    try {
      const data = await publicApiCall<AuthResponse>("/api/auth/verify-otp", {
        method: "POST",
        body: JSON.stringify({
          email: email.trim(),
          otp,
        }),
      });

      if (data.data?.user && data.data?.token) {
        completeLogin(data.data.user, data.data.token, "otp");
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Invalid or expired passcode. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-[540px] bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-gray-900 text-3xl font-bold mb-2">Welcome Back</h1>
          <p className="text-gray-500 text-base">
            Sign in to manage your reservations and membership
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {info && (
          <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-700 text-sm">{info}</p>
          </div>
        )}

        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="login-email" className="text-gray-900 text-sm">
              Email Address
            </Label>
            <Input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@example.com"
              className="bg-white border-gray-300"
              disabled={isLoading}
              required
            />
          </div>

          <Tabs value={activeTab} onValueChange={handleTabChange}>
            <TabsList className="grid w-full grid-cols-2 h-11 bg-gray-100 p-1">
              <TabsTrigger
                value="password"
                className={cn(
                  "text-sm font-semibold data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm",
                )}
              >
                Password
              </TabsTrigger>
              <TabsTrigger
                value="otp"
                className={cn(
                  "text-sm font-semibold data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm",
                )}
              >
                One-Time Passcode
              </TabsTrigger>
            </TabsList>

            <TabsContent value="password" className="mt-6">
              <form onSubmit={handlePasswordLogin} className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-gray-900 text-sm">
                      Password
                    </Label>
                    <Link
                      to="/forgot-password"
                      className="text-blue-600 hover:text-blue-700 text-xs font-medium transition-colors"
                    >
                      Forgot?
                    </Link>
                  </div>

                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="bg-white border-gray-300 pr-10"
                      disabled={isLoading}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors disabled:opacity-50"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading || !email || !password}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Signing In..." : "Sign In"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="otp" className="mt-6">
              <form onSubmit={handleVerifyOtp} className="space-y-6">
                {!otpSent ? (
                  <Button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={isLoading || !email}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? "Sending..." : "Send One-Time Passcode"}
                  </Button>
                ) : (
                  <>
                    <div className="space-y-2">
                      <Label className="text-gray-900 text-sm">
                        One-Time Passcode
                      </Label>
                      <div className="flex justify-center">
                        <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={isLoading || otp.length !== 6}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? "Verifying..." : "Verify and Sign In"}
                    </Button>

                    <button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={isLoading}
                      className="w-full text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Resend passcode
                    </button>
                  </>
                )}
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
