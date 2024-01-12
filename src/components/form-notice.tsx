"use client";

interface FormNoticeProps {
  message?: string;
}

const FormNotice = ({ message }: FormNoticeProps) => {
  if (!message) return null;
  return (
    <div
      data-test="form-notice"
      className="bg-slate-200 p-3 rounded-md flex items-center gap-x-2 text-sm text-slate-800"
    >
      <p className="font-semibold text-sm">{message}</p>
    </div>
  );
};
export default FormNotice;
