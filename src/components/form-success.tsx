"use client";

import { CheckCheckIcon } from "lucide-react";

interface FormSuccessProps {
  message?: string;
}

export const FormSuccess = ({ message }: FormSuccessProps) => {
  if (!message) return null;

  return (
    <div
      data-test="form-success"
      className="bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500"
    >
      <CheckCheckIcon className="h-4 w-4" />
      <p className="font-semibold text-sm">{message}</p>
    </div>
  );
};
