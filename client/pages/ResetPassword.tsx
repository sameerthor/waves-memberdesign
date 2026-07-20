import { useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { publicApiCall } from "@/utils/api";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const emailFromUrl = useMemo(
    () => searchParams.get("email") || "",
    [searchParams],
  );
  const tokenFromUrl = useMemo(
    () => searchParams.get("token") || "",
    [searchParams],
  );

  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setInfo("");
    setIsLoading(true);

    if (!emailFromUrl || !tokenFromUrl) {
      setError("This password reset link is invalid. Please request a new one.");
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      setIsLoading(false);
      return;
    }

    if (password !== passwordConfirmation) {
      setError("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await publicApiCall<{ success: boolean; message: string }>(
        "/api/auth/reset-password",
        {
          method: "POST",
          body: JSON.stringify({
            email: emailFromUrl,
            token: tokenFromUrl,
            password,
            password_confirmation: passwordConfirmation,
          }),
        },
      );

      setInfo(
        response.message ||
          "Your password has been reset successfully. You can now sign in.",
      );

      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 1500);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to reset password. Please request a new reset link.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-[540px] bg-white rounded-lg shadow-lg p-8">
        <Link
          to="/login"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to sign in
        </Link>

        <div className="text-center mb-8">
          <h1 className="text-gray-900 text-3xl font-bold mb-2">
            Reset Password
          </h1>
          <p className="text-gray-500 text-base">
            Choose a new password for{" "}
            <span className="font-medium text-gray-700">
              {emailFromUrl || "your account"}
            </span>
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm">{error}</p>
            {!emailFromUrl || !tokenFromUrl ? (
              <Link
                to="/forgot-password"
                className="inline-block mt-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Request a new reset link
              </Link>
            ) : null}
          </div>
        )}

        {info && (
          <div className="mb-6 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-700 text-sm">{info}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-900 text-sm">
              New Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
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

          <div className="space-y-2">
            <Label
              htmlFor="password-confirmation"
              className="text-gray-900 text-sm"
            >
              Confirm New Password
            </Label>
            <div className="relative">
              <Input
                id="password-confirmation"
                type={showConfirmPassword ? "text" : "password"}
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                placeholder="Confirm new password"
                className="bg-white border-gray-300 pr-10"
                disabled={isLoading}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                disabled={isLoading}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors disabled:opacity-50"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={
              isLoading ||
              !password ||
              !passwordConfirmation ||
              !emailFromUrl ||
              !tokenFromUrl
            }
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Resetting..." : "Reset Password"}
          </Button>
        </form>
      </div>
    </div>
  );
}
