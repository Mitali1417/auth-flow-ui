import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
  showBackButton?: boolean;
  backTo?: string;
}

export function AuthLayout({
  children,
  title,
  description,
  showBackButton = false,
  backTo = "/login",
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Minimal Branding */}
      <Card className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center bg-muted">
        <div className="space-y-8 max-w-md mx-auto">
          {/* Logo & App Name */}
          <div className="flex items-center space-x-3">
            <div>
              <h1 className="text-9xl font-bold">.macro</h1>
            </div>
          </div>

          {/* Hero Content */}
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Simple, secure, and fast authentication for your digital needs.
              Experience seamless access across all your devices.
            </p>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Fast Setup</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Get started in minutes
              </p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Zero Downtime</span>
              </div>
              <p className="text-xs text-muted-foreground">
                99.9% uptime guarantee
              </p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Secure</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Enterprise-grade security
              </p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Free Tier</span>
              </div>
              <p className="text-xs text-muted-foreground">Start for free</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Right Side - Auth Forms */}
      <div className="lg:w-1/2 flex items-center justify-center p-4 lg:p-8 ">
        <div className="w-full max-w-md">
          {showBackButton && (
            <Link
              to={backTo}
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Link>
          )}

          <Card className="shadow-sm border">
            <CardHeader className="space-y-1">
              <CardTitle className="text-xl font-bold">{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>{children}</CardContent>
          </Card>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} macro. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
