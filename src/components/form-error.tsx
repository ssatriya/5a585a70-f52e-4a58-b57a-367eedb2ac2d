"use client";

import { AlertTriangleIcon } from "lucide-react";

interface FormErrorProps {
  message?: string;
}

export const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;

  return (
    <div
      data-test="form-error"
      className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive"
    >
      <AlertTriangleIcon className="h-4 w-4" />
      <p className="font-semibold text-sm">{message}</p>
    </div>
  );
};
