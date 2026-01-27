import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Mail, Lock, Check, AlertCircle, RefreshCw } from "lucide-react";
import MatrimonyAuthService from "../../../services/matrimony/auth/AuthService";

export default function VerifyOtpPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [canResend, setCanResend] = useState(false);

  const email = location.state?.email || "";

  useEffect(() => {
    if (!email) {
      navigate("/register");
    }
  }, [email, navigate]);

  // Countdown timer for OTP
  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");

    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      setError("Please enter all 6 digits");
      return;
    }

    try {
      setLoading(true);
      await MatrimonyAuthService.verifyOtp(email, otpCode);

      setSuccess(true);
      setTimeout(() => {
        navigate("/login", {
          state: {
            message: "Email verified! Please login with your credentials.",
          },
        });
      }, 2000);
    } catch (err) {
      setError(err.message || "Invalid OTP");
      setOtp(["", "", "", "", "", ""]);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      setLoading(true);
      setError("");

      // Call resend OTP endpoint (assumes backend has this)
      await MatrimonyAuthService.register({
        email,
        resend: true,
      });

      setTimeLeft(300);
      setCanResend(false);
      setOtp(["", "", "", "", "", ""]);
      alert("OTP resent to your email");
    } catch (err) {
      setError(err.message || "Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4 text-center">
          <div className="mb-6 flex justify-center">
            <div className="bg-green-100 rounded-full p-3">
              <Check className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Email Verified!
          </h2>
          <p className="text-gray-600 mb-4">
            Your email has been successfully verified. Redirecting to login...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 to-pink-100 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-rose-100 rounded-full p-3">
              <Mail className="w-8 h-8 text-rose-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Verify Email
          </h1>
          <p className="text-gray-600">
            We've sent a 6-digit code to{" "}
            <span className="font-semibold text-gray-900">{email}</span>
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {/* OTP Form */}
        <form onSubmit={handleVerifyOtp} className="mb-6">
          {/* OTP Input Fields */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-900 mb-4">
              Enter Verification Code
            </label>
            <div className="flex gap-3 justify-between">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-200"
                  disabled={loading}
                  autoComplete="off"
                />
              ))}
            </div>
          </div>

          {/* Timer */}
          <div className="text-center mb-6">
            <p className="text-sm text-gray-600">
              Code expires in{" "}
              <span
                className={`font-semibold ${
                  timeLeft < 60 ? "text-red-600" : "text-gray-900"
                }`}
              >
                {formatTime(timeLeft)}
              </span>
            </p>
          </div>

          {/* Verify Button */}
          <button
            type="submit"
            disabled={loading || otp.join("").length !== 6}
            className="w-full bg-primary text-white font-semibold py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Verifying...
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                Verify Email
              </>
            )}
          </button>
        </form>

        {/* Resend OTP */}
        <div className="text-center">
          {canResend ? (
            <>
              <p className="text-gray-600 text-sm mb-2">
                Didn't receive the code?
              </p>
              <button
                onClick={handleResendOtp}
                disabled={loading}
                className="text-rose-600 hover:text-rose-700 font-semibold text-sm disabled:opacity-50 flex items-center justify-center gap-1 w-full"
              >
                <RefreshCw className="w-4 h-4" />
                Resend Code
              </button>
            </>
          ) : (
            <p className="text-gray-600 text-sm">
              Resend code in{" "}
              <span className="font-semibold">{formatTime(timeLeft)}</span>
            </p>
          )}
        </div>

        {/* Back to Register */}
        <div className="text-center mt-6 pt-6 border-t border-gray-200">
          <p className="text-gray-600 text-sm">
            Wrong email?{" "}
            <button
              onClick={() => navigate("/register")}
              className="text-rose-600 hover:text-rose-700 font-semibold"
            >
              Register again
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
