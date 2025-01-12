import { SideBarLink, Task } from "@/types";
import {
  Users,
  FileText,
  Home,
  Key,
  BarChart2,
  Shield,
  Info,
  Box,
  Link2,
  Database,
} from "lucide-react";

export const STORAGE_KEY = "saved-gcp-projects";

export const sideBarLinks: SideBarLink[] = [
  {
    icon: Home,
    title: "Home",
    url: "/",
  },
  {
    icon: FileText,
    title: "Starter guide",
    url: "/guide",
    // extra: "22%",
  },
  {
    icon: BarChart2,
    title: "Tests",
    url: "/tests",
  },
  {
    icon: Shield,
    title: "Executive report",
    url: "/executive-report",
  },
  {
    icon: Info,
    title: "Compliance",
    url: "/compliance",
  },
  {
    icon: Box,
    title: "Trust Center",
    url: "/trust-center",
  },
  {
    icon: Info,
    title: "Risk",
    url: "/risk",
  },
  {
    icon: Box,
    title: "Vendor",
    url: "/vendor",
  },
  {
    icon: Database,
    title: "Assets",
    url: "/assets",
  },
  {
    icon: Users,
    title: "Personnel",
    url: "/personnel",
  },
  {
    icon: Link2,
    title: "Integrations",
    url: "/integrations",
  },
];

export const tasks: Task[] = [
  // {
  //   icon: Users,
  //   title: "Assemble your team",
  //   description:
  //     "Security is a team sport. Bring your key contributors into Rovera",
  //   details: "Connect Google Workspace · 2 min",
  //   buttonText: "Connect",
  //   progress: { value: 0, total: 1 },
  //   confirmedProjectId: null,
  // },
  {
    icon: Key,
    title: "Unlock integration",
    description:
      "Rovera's integrations help you collect a list of assets and relevant compliance evidence without manual work.",
    details: "Connect GCP · 5 min",
    buttonText: "Connect GCP",
    progress: { value: 0, total: 1 },
    confirmedProjectId: null,
  },
];

export const policies: string[] = [
  "Human Resources",
  "Code of Conduct",
  "Third Party Management",
  "Risk Management",
];
