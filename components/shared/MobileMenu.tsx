"use client";

import React, { JSX } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import Link from "next/link";
import { sideBarLinks } from "@/constants";
import { RefreshCcw } from "lucide-react";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const MobileMenu: React.FC = (): JSX.Element => {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-6 flex flex-col h-screen">
        <SheetTitle className="text-lg font-semibold">Trust Labs</SheetTitle>
        <div className="flex-grow space-y-6 mt-6">
          <div className="space-y-1">
            <input
              type="search"
              placeholder="Find..."
              className="w-full px-3 py-2 text-sm border rounded-md bg-background"
            />
          </div>

          <nav className="space-y-2">
            {sideBarLinks.map(({ icon: Icon, title, url }) => (
              <Link
                key={title}
                href={url}
                className={clsx(
                  "flex items-center px-3 py-2 text-sm hover:bg-accent rounded-md",
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
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
