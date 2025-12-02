import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { OTPInput } from '@/components/auth/OTPInput';
import { Mail, Smartphone } from 'lucide-react';

export function OTPVerification() {
  const navigate = useNavigate();
//   const location = useLocation();
  const [otp, setOtp] = useState('');
  const [verificationMethod, setVerificationMethod] = useState<'email' | 'sms'>('email');
  const [countdown, setCountdown] = useState(0);

  const handleOTPComplete = (completedOtp: string) => {
    setOtp(completedOtp);
    // Handle OTP verification here
    console.log('OTP:', completedOtp);
    // Simulate verification
    setTimeout(() => {
      navigate('/dashboard');
    }, 1000);
  };

  const handleResendOTP = () => {
    setCountdown(30);
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    // Handle resend logic here
    console.log('Resending OTP via', verificationMethod);
  };

  return (
    <AuthLayout
      title="Verify your identity"
      description={`We sent a verification code to your ${verificationMethod}`}
      showBackButton
      backTo="/login"
    >
      <div className="space-y-6">
        <div className="flex gap-4">
          <Button
            variant={verificationMethod === 'email' ? 'default' : 'outline'}
            className="flex-1"
            onClick={() => setVerificationMethod('email')}
          >
            <Mail className="mr-2 h-4 w-4" />
            Email
          </Button>
          <Button
            variant={verificationMethod === 'sms' ? 'default' : 'outline'}
            className="flex-1"
            onClick={() => setVerificationMethod('sms')}
          >
            <Smartphone className="mr-2 h-4 w-4" />
            SMS
          </Button>
        </div>

        <div className="space-y-2">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Enter the 6-digit code sent to your {verificationMethod}
            </p>
          </div>
          <OTPInput length={6} onComplete={handleOTPComplete} />
        </div>

        <div className="space-y-4">
          <Button className="w-full" disabled={otp.length !== 6}>
            Verify & Continue
          </Button>

          <div className="text-center text-sm">
            <p className="text-muted-foreground">
              Didn't receive the code?{" "}
              <Button
                variant="link"
                className="p-0 h-auto"
                onClick={handleResendOTP}
                disabled={countdown > 0}
              >
                {countdown > 0 ? `Resend in ${countdown}s` : 'Resend'}
              </Button>
            </p>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}