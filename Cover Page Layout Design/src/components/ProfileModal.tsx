import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ArrowLeft, User, Mail, Phone, Lock, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "../config/supabaseClient";

interface ProfilePageProps {
  onBack: () => void;
}

export function ProfilePage({ onBack }: ProfilePageProps) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [otpEmail, setOtpEmail] = useState<string | null>(null);

  // ✅ Form validation
  const validateSignupForm = () => {
    if (!formData.fullName.trim()) {
      toast.error("Please enter your full name");
      return false;
    }
    if (!formData.email.trim()) {
      toast.error("Please enter your email address");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (!formData.mobile.trim() || formData.mobile.length !== 10) {
      toast.error("Please enter a valid 10-digit mobile number");
      return false;
    }
    if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
      toast.error("Please enter a valid Indian mobile number");
      return false;
    }
    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    return true;
  };

  // ✅ Supabase sign-up (email + password, with profile data)
  const handleSignup = async () => {
    if (!validateSignupForm()) return;
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            phone: formData.mobile,
          },
        },
      });

      if (error) {
        toast.error("Signup failed", { description: error.message });
      } else {
        // Optional: mirror basic profile info into a SQL table (user_profiles)
        if (data.user) {
          await supabase.from("user_profiles").upsert({
            id: data.user.id,
            full_name: formData.fullName,
            email: formData.email,
            phone: formData.mobile,
          });
        }

        // Send an email OTP for verification (requires Supabase email OTP configured)
        try {
          await supabase.auth.signInWithOtp({
            email: formData.email,
            options: { shouldCreateUser: false },
          });
          setOtpEmail(formData.email);
          toast.success("Account created! Enter the OTP sent to your email to verify.");
        } catch (otpError: any) {
          console.error("Error sending verification OTP:", otpError);
          toast.success("🎉 Account created successfully!", {
            description: "Check your email inbox to verify your account.",
          });
          setTimeout(() => onBack(), 2000);
        }
      }
    } catch (error) {
      toast.error("Network error", { description: "Please try again later" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyEmailOtp = async () => {
    if (!otpEmail) {
      toast.error("No email to verify");
      return;
    }
    if (!otpCode.trim()) {
      toast.error("Please enter the OTP code");
      return;
    }
    setIsVerifyingOtp(true);
    try {
      const { error } = await supabase.auth.verifyOtp({
        type: "email",
        email: otpEmail,
        token: otpCode,
      });

      if (error) {
        toast.error("OTP verification failed", { description: error.message });
      } else {
        toast.success("Email verified successfully!");
        setOtpCode("");
        setOtpEmail(null);
        setMode("login");
      }
    } catch (err) {
      toast.error("Failed to verify OTP, please try again.");
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  // ✅ Supabase login
  const handleLogin = async () => {
    if (!formData.email.trim() || !formData.password.trim()) {
      toast.error("Please enter both email and password");
      return;
    }
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        toast.error("Login failed", { description: error.message || "Invalid credentials" });
      } else {
        const fullName =
          (data.user?.user_metadata as any)?.full_name || formData.email;

        toast.success(`Welcome back, ${fullName}!`, {
          description: "Login successful 🚀",
        });
        setTimeout(() => onBack(), 1500);
      }
    } catch (error) {
      toast.error("Network error", { description: "Please try again later" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "login") {
      handleLogin();
    } else {
      handleSignup();
    }
  };

  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {/* Header */}
      <div className="relative z-10 bg-white/80 backdrop-blur-sm border-b border-amber-200">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
          <Button
            onClick={onBack}
            variant="outline"
            size="sm"
            className="border-amber-300 text-amber-700 hover:bg-amber-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <h1 className="text-2xl font-bold text-amber-900">
            Welcome to <span className="text-amber-600">राजस्थान</span> Travel
          </h1>
        </div>
      </div>

      {/* Main */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-80px)] p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-amber-200">
            <CardHeader className="text-center space-y-2">
              <CardTitle className="text-3xl font-bold text-gray-900">
                {mode === "login" ? "Welcome Back" : "Join the Journey"}
              </CardTitle>
              <p className="text-gray-600">
                {mode === "login"
                  ? "Sign in to continue your adventure"
                  : "Create your royal travel account"}
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              {otpEmail && (
                <div className="space-y-3 border border-amber-200 rounded-lg p-3 bg-amber-50">
                  <p className="text-sm text-amber-900">
                    We sent a one-time code to <span className="font-semibold">{otpEmail}</span>. Enter it
                    below to verify your email.
                  </p>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter OTP"
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                    />
                    <Button
                      type="button"
                      onClick={handleVerifyEmailOtp}
                      disabled={isVerifyingOtp}
                    >
                      {isVerifyingOtp ? "Verifying..." : "Verify"}
                    </Button>
                  </div>
                </div>
              )}
              {/* Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <Button
                  variant={mode === "login" ? "default" : "ghost"}
                  onClick={() => setMode("login")}
                  className={`flex-1 ${mode === "login" ? "bg-amber-600 hover:bg-amber-700" : "hover:bg-gray-200"}`}
                >
                  Login
                </Button>
                <Button
                  variant={mode === "signup" ? "default" : "ghost"}
                  onClick={() => setMode("signup")}
                  className={`flex-1 ${mode === "signup" ? "bg-amber-600 hover:bg-amber-700" : "hover:bg-gray-200"}`}
                >
                  Sign Up
                </Button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {mode === "signup" && (
                  <>
                    {/* Full Name */}
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Full Name
                      </Label>
                      <Input
                        id="fullName"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        required
                      />
                    </div>

                    {/* Mobile */}
                    <div className="space-y-2">
                      <Label htmlFor="mobile" className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        Mobile Number
                      </Label>
                      <Input
                        id="mobile"
                        type="tel"
                        placeholder="10-digit number"
                        value={formData.mobile}
                        onChange={(e) =>
                          setFormData({ ...formData, mobile: e.target.value.replace(/\D/g, "") })
                        }
                        maxLength={10}
                        required
                      />
                    </div>
                  </>
                )}

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password (signup only) */}
                {mode === "signup" && (
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={(e) =>
                          setFormData({ ...formData, confirmPassword: e.target.value })
                        }
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-medium py-4 text-lg"
                >
                  {isLoading ? (mode === "login" ? "Signing In..." : "Creating Account...") : mode === "login" ? "Sign In" : "Sign Up"}
                </Button>
              </form>

              {/* Switch Mode */}
              <div className="text-center text-sm text-gray-600 pt-4 border-t border-gray-200">
                {mode === "login" ? "Don't have an account? " : "Already have an account? "}
                <button
                  onClick={() => setMode(mode === "login" ? "signup" : "login")}
                  className="text-amber-600 hover:text-amber-700 font-medium underline"
                >
                  {mode === "login" ? "Create Account" : "Sign In"}
                </button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
    </>
  );
}
