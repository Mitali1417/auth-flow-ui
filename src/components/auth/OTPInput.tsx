import React, { useRef, useState } from 'react';
import type { KeyboardEvent, ChangeEvent } from 'react';
import { Input } from '@/components/ui/input';

interface OTPInputProps {
  length?: number;
  onComplete: (otp: string) => void;
}

export function OTPInput({ length = 6, onComplete }: OTPInputProps) {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    if (value !== '' && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
    
    const joinedOtp = newOtp.join('');
    if (joinedOtp.length === length) {
      onComplete(joinedOtp);
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').slice(0, length);
    const pasteArray = pasteData.split('');
    
    const newOtp = [...otp];
    pasteArray.forEach((char, index) => {
      if (index < length) {
        newOtp[index] = char;
      }
    });
    
    setOtp(newOtp);
    onComplete(newOtp.join('').slice(0, length));
    
    const lastIndex = Math.min(pasteArray.length - 1, length - 1);
    inputRefs.current[lastIndex]?.focus();
  };

  return (
    <div className="flex justify-center gap-2" onPaste={handlePaste}>
      {Array.from({ length }, (_, index) => (
        <Input
          key={index}
          ref={(el) => { inputRefs.current[index] = el; }}
          type="text"
          maxLength={1}
          value={otp[index]}
          onChange={(e: ChangeEvent<HTMLInputElement>) => 
            handleChange(index, e.target.value)
          }
          onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => 
            handleKeyDown(index, e)
          }
          className="w-12 h-12 text-center text-xl font-semibold"
          autoFocus={index === 0}
        />
      ))}
    </div>
  );
}