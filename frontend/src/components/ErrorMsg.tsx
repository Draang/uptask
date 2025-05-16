import type React from "react";

export default function ErrorMsg({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-center mt-4 bg-red-100 text-red-600 font-bold p-3 uppercase text-sm">
      {children}
    </div>
  );
}
