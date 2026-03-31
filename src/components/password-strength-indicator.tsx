'use client';

import { CheckCircle, XCircle } from 'lucide-react';
import { Progress } from './ui/progress';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

export const passwordCriteria = [
    { text: 'At least 8 characters long', regex: /.{8,}/ },
    { text: 'At least one uppercase letter', regex: /[A-Z]/ },
    { text: 'At least one lowercase letter', regex: /[a-z]/ },
    { text: 'At least one number', regex: /\d/ },
    { text: 'At least one special character ([@$!%*?&])', regex: /[@$!%*?&]/ },
];

export type PasswordCriteria = typeof passwordCriteria;

interface PasswordStrengthIndicatorProps {
  password?: string;
  onValidationChange?: (isValid: boolean) => void;
}

export const PasswordStrengthIndicator = ({ password = '', onValidationChange }: PasswordStrengthIndicatorProps) => {
  const [validationStatus, setValidationStatus] = useState(passwordCriteria.map(c => c.regex.test(password)));

  useEffect(() => {
    const newStatus = passwordCriteria.map(c => c.regex.test(password));
    setValidationStatus(newStatus);
    if (onValidationChange) {
      onValidationChange(newStatus.every(Boolean));
    }
  }, [password, onValidationChange]);

  const strength = validationStatus.filter(Boolean).length;
  const progress = (strength / passwordCriteria.length) * 100;
  
  const progressColor = () => {
    switch (strength) {
      case 0:
      case 1:
      case 2:
        return 'bg-destructive';
      case 3:
      case 4:
        return 'bg-yellow-500';
      case 5:
        return 'bg-primary';
      default:
        return 'bg-muted';
    }
  }

  // Only render when the user starts typing a password.
  if (!password) {
    return null;
  }

  return (
    <div className="space-y-3 p-4 border rounded-lg bg-card my-4 animate-in fade-in-50 duration-300">
      <Progress value={progress} className="h-2" indicatorClassName={progressColor()} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
        {passwordCriteria.map((criterion, index) => (
          <div key={index} className="flex items-center text-sm">
            {validationStatus[index] ? (
              <CheckCircle className="h-4 w-4 mr-2 text-primary" />
            ) : (
              <XCircle className="h-4 w-4 mr-2 text-muted-foreground" />
            )}
            <span className={cn(validationStatus[index] ? 'text-foreground' : 'text-muted-foreground')}>
              {criterion.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
