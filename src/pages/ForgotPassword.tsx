import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { Mail, ArrowRight } from 'lucide-react';

export function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle password reset request here
    console.log('Reset password for:', email);
    setIsSubmitted(true);
    // Simulate API call
    setTimeout(() => {
      navigate('/reset-password');
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <AuthLayout
        title="Check your email"
        description="We sent a password reset link to your email"
        showBackButton
        backTo="/login"
      >
        <div className="space-y-4 text-center">
          <div className="mx-auto w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
            <Mail className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Reset link sent!</h3>
            <p className="text-sm text-muted-foreground">
              If an account exists for {email}, you will receive a password reset link shortly.
            </p>
          </div>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => navigate('/login')}
          >
            Return to login
          </Button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Reset your password"
      description="Enter your email and we'll send you a reset link"
      showBackButton
      backTo="/login"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
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

        <Button type="submit" className="w-full">
          Send Reset Link
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>

        <div className="text-center text-sm">
          <p className="text-muted-foreground">
            Remember your password?{" "}
            <Button
              variant="link"
              className="p-0 h-auto"
              onClick={() => navigate('/login')}
            >
              Sign in
            </Button>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
}