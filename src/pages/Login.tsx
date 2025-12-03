import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { SocialButtons } from '@/components/auth/SocialButtons';
import { Mail, Smartphone, ArrowRight } from 'lucide-react';

export function LoginOTP() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [verificationMethod, setVerificationMethod] = useState<'email' | 'sms'>('email');
  const [phone, setPhone] = useState('');

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    
    const identifier = verificationMethod === 'email' ? email : phone;
    
    // Simple frontend validation
    if (verificationMethod === 'email' && !validateEmail(identifier)) {
      alert('Please enter a valid email address');
      return;
    }
    
    if (verificationMethod === 'sms' && !validatePhone(identifier)) {
      alert('Please enter a valid phone number');
      return;
    }
    
    // Store identifier for OTP verification page
    sessionStorage.setItem('auth_identifier', identifier);
    sessionStorage.setItem('auth_method', verificationMethod);
    
    // Navigate to OTP verification
    navigate('/verify-otp', { 
      state: { 
        identifier, 
        method: verificationMethod,
        purpose: 'login'
      }
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
      title="Welcome back"
      description="Enter your email or phone to receive a verification code"
    >
      <form onSubmit={handleSendOTP} className="space-y-6">
        {/* Verification Method Toggle */}
        <div className="flex gap-2">
          <Button
            type="button"
            variant={verificationMethod === 'email' ? 'default' : 'outline'}
            className="flex-1"
            onClick={() => setVerificationMethod('email')}
          >
            <Mail className="mr-2 h-4 w-4" />
            Email
          </Button>
          <Button
            type="button"
            variant={verificationMethod === 'sms' ? 'default' : 'outline'}
            className="flex-1"
            onClick={() => setVerificationMethod('sms')}
          >
            <Smartphone className="mr-2 h-4 w-4" />
            SMS
          </Button>
        </div>

        {/* Email Input */}
        {verificationMethod === 'email' && (
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
        {verificationMethod === 'sms' && (
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

        <Button type="submit" className="w-full">
          Send Verification Code
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <SocialButtons />

        <div className="text-center text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="text-primary hover:underline font-medium">
            Sign up
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}