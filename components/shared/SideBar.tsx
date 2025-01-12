"use client";

import React, { JSX } from "react";
import Link from "next/link";
import { sideBarLinks } from "@/constants";
import { SideBarLink } from "@/types";
import { RefreshCcw } from "lucide-react";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const SideBar: React.FC = (): JSX.Element => {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex flex-col fixed top-[73px] left-0 bottom-0 w-64 border-r bg-background p-3 overflow-y-auto">
      <div className="flex-grow space-y-6">
        <div className="space-y-1">
          <input
            type="search"
            placeholder="Find..."
            className="w-full px-3 py-2 text-sm border rounded-md bg-background"
          />
        </div>

        <nav className="space-y-2">
          {sideBarLinks.map(({ icon: Icon, title, url }: SideBarLink) => (
            <Link
              key={title}
              href={url}
              className={clsx(
                "flex items-center px-3 py-[6px] hover:bg-gray-100 text-sm hover:bg-accent rounded-md",
                pathname === url
                  ? "text-purple-600 font-medium bg-purple-50"
                  : "text-muted-foreground"
              )}
            >
              <Icon className="w-4 h-4 mr-3" />
              {title}
            </Link>
          ))}
        </nav>
      </div>

      <div className="border-t pt-4">
        <Link
          href="#"
          className="flex items-center px-3 py-2 text-sm text-muted-foreground hover:bg-accent rounded-md"
        >
          <RefreshCcw className="w-4 h-4 mr-3" />
          Reset account
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
