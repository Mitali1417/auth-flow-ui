import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { Mail, User, Smartphone, ArrowRight } from "lucide-react";

export function Signup() {
  const navigate = useNavigate();
  const [verificationMethod, setVerificationMethod] = useState<"email" | "sms">(
    "email"
  );
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const identifier = verificationMethod === "email" ? email : phone;

    // Validation
    if (verificationMethod === "email" && !validateEmail(identifier)) {
      alert("Please enter a valid email address");
      return;
    }

    if (verificationMethod === "sms" && !validatePhone(identifier)) {
      alert("Please enter a valid phone number");
      return;
    }

    if (!name.trim()) {
      alert("Please enter your name");
      return;
    }

    if (!agreeToTerms) {
      alert("Please agree to the Terms of Service and Privacy Policy");
      return;
    }

    // Store user data temporarily
    sessionStorage.setItem("signup_identifier", identifier);
    sessionStorage.setItem("signup_method", verificationMethod);
    sessionStorage.setItem("signup_name", name);

    // Navigate to OTP verification
    navigate("/verify-otp", {
      state: {
        identifier,
        method: verificationMethod,
        purpose: "signup",
        name,
      },
    });
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone: string) => {
    return phone.length >= 10;
  };

  return (
    <AuthLayout
      title="Create an account"
      description="Enter your information to get started"
      showBackButton
      backTo="/login"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              className="pl-10"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Verification Method Toggle */}
        <div className="flex gap-2">
          <Button
            type="button"
            variant={verificationMethod === "email" ? "default" : "outline"}
            className="flex-1"
            onClick={() => setVerificationMethod("email")}
          >
            <Mail className="mr-2 h-4 w-4" />
            Email
          </Button>
          <Button
            type="button"
            variant={verificationMethod === "sms" ? "default" : "outline"}
            className="flex-1"
            onClick={() => setVerificationMethod("sms")}
          >
            <Smartphone className="mr-2 h-4 w-4" />
            SMS
          </Button>
        </div>

        {/* Email Input */}
        {verificationMethod === "email" && (
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                className="pl-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
        )}

        {/* Phone Input */}
        {verificationMethod === "sms" && (
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <div className="relative">
              <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                id="phone"
                type="tel"
                placeholder="+1 (234) 567-8900"
                className="pl-10"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
          </div>
        )}

        <div className="flex items-start space-x-2">
          <Checkbox
            id="terms"
            checked={agreeToTerms}
            onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
          />
          <div className="grid gap-1.5 leading-none">
            <Label
              htmlFor="terms"
              className="text-xs font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-wrap items-center gap-1"
            >
              <span className="text-muted-foreground">I agree to the</span>
              <Link
                to="/terms"
                className="text-primary hover:underline font-medium"
              >
                Terms of Service
              </Link>
              <span className="text-muted-foreground">and</span>
              <Link
                to="/privacy"
                className="text-primary hover:underline font-medium"
              >
                Privacy Policy
              </Link>
            </Label>
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={!agreeToTerms}>
          Create Account
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>

        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary hover:underline font-medium"
          >
            Sign in
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}
