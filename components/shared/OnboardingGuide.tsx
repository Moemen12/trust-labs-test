"use client";

import React, { JSX, useState } from "react";
import { X } from "lucide-react";
import TeamAssemblyCard from "./TeamAssemblyCard";

import { AuthSession } from "@/types";

interface OnboardingGuideProps {
  session: AuthSession;
}

const OnboardingGuide: React.FC<OnboardingGuideProps> = ({
  session,
}: OnboardingGuideProps): JSX.Element => {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  return (
    <>
      {isVisible && (
        <div className="bg-white rounded-lg border shadow-sm p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
            <div>
              <h1 className="text-xl sm:text-2xl font-semibold mb-2">
                Onboarding Guide
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground">
                Get started quickly by completing these essential tasks. They
                will set a solid foundation and help you make the most of Rovera
                from the start.
              </p>
            </div>

            <X
              className="self-end sm:self-start text-2xl cursor-pointer"
              onClick={() => setIsVisible(false)}
            />
          </div>

          <div className="space-y-4">
            <TeamAssemblyCard session={session} />
          </div>
        </div>
      )}
    </>
  );
};

export default OnboardingGuide;
