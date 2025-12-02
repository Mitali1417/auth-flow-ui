import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { Eye, EyeOff, Lock, CheckCircle } from 'lucide-react';

export function ResetPassword() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle password reset logic here
    console.log('New password:', formData.password);
    setIsSubmitted(true);
    // Simulate API call
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <AuthLayout
        title="Password reset successful!"
        description="Your password has been updated successfully"
        showBackButton={false}
      >
        <div className="space-y-4 text-center">
          <div className="mx-auto w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
            <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">All set!</h3>
            <p className="text-sm text-muted-foreground">
              You can now sign in with your new password.
            </p>
          </div>
          <Button
            className="w-full"
            onClick={() => navigate('/login')}
          >
            Go to Sign In
          </Button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Create new password"
      description="Enter your new password below"
      showBackButton
      backTo="/login"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="password">New Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="pl-10 pr-10"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm New Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="••••••••"
              className="pl-10 pr-10"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        <div className="space-y-2 rounded-lg bg-muted p-3">
          <p className="text-sm font-medium">Password requirements:</p>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li className="flex items-center">
              <span className="mr-2">•</span>
              At least 8 characters
            </li>
            <li className="flex items-center">
              <span className="mr-2">•</span>
              At least one uppercase letter
            </li>
            <li className="flex items-center">
              <span className="mr-2">•</span>
              At least one number
            </li>
            <li className="flex items-center">
              <span className="mr-2">•</span>
              At least one special character
            </li>
          </ul>
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={formData.password !== formData.confirmPassword}
        >
          Reset Password
        </Button>
      </form>
    </AuthLayout>
  );
}