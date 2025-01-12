import { IconType } from "lucide-react";
import { Session } from "next-auth";
import { DefaultSession } from "next-auth";

declare interface SideBarLink {
  icon: IconType;
  title: string;
  url: string;
}

declare interface Task {
  icon: IconType;
  title: string;
  description: string;
  details: string;
  buttonText?: string;
  progress: { value: number; total: number };
  confirmedProjectId: null | string;
}

interface UserSession extends Session {
  accessToken?: string;
}

declare type AuthSession = UserSession | null;

declare module "next-auth" {
  interface Session extends DefaultSession {
    accessToken?: string;
  }
}
