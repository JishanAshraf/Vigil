'use client';

import { CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PasswordCriteria {
  length: boolean;
  uppercase: boolean;
  number: boolean;
  special: boolean;
}

interface PasswordStrengthIndicatorProps {
  criteria: PasswordCriteria;
}

export const PasswordStrengthIndicator = ({ criteria }: PasswordStrengthIndicatorProps) => {
  const criteriaList = [
    { key: 'length', label: 'At least 8 characters' },
    { key: 'uppercase', label: 'An uppercase letter (A-Z)' },
    { key: 'number', label: 'A number (0-9)' },
    { key: 'special', label: 'A special character (!@#$...)' },
  ];

  return (
    <div className="p-4 bg-muted/50 rounded-lg space-y-2 mt-2">
      {criteriaList.map((item) => (
        <div key={item.key} className="flex items-center text-xs">
          {criteria[item.key as keyof typeof criteria] ? (
            <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
          ) : (
            <XCircle className="h-4 w-4 text-muted-foreground mr-2 flex-shrink-0" />
          )}
          <span className={cn("text-muted-foreground", criteria[item.key as keyof typeof criteria] && "text-foreground")}>
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};
