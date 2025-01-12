"use client";
import { useRouter } from "next/navigation";
import React, { JSX } from "react";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";

interface NotFoundProps {
  title?: string;
  message?: string;
  button?: string;
}

export const NotFound: React.FC<NotFoundProps> = ({
  title,
  message,
  button = "Return Home",
}: NotFoundProps): JSX.Element => {
  const router = useRouter();
  return (
    <div className="min-h-[50vh] container mx-auto p-4 flex flex-col items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold text-purple-700">{title}</h1>
        <p className="text-gray-600">{message}</p>
        <Button
          onClick={() => router.push("/")}
          className="transition-colors bg-purple-700 text-white hover:bg-purple-900"
        >
          <ArrowLeft size={20} />

          {button}
        </Button>
      </div>
    </div>
  );
};
