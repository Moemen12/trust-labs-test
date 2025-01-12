import { auth } from "@/auth";
import OnboardingGuide from "@/components/shared/OnboardingGuide";
import { AuthSession } from "@/types";
import { JSX } from "react";

export default async function OnboardingPage(): Promise<JSX.Element> {
  const session: AuthSession = await auth();

  return <OnboardingGuide session={session} />;
}
