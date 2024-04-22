"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import { Button } from "./ui/button";
import { PlusCircle } from "lucide-react";

export function NavBar() {
  return (
    <div className="flex flex-col items-center justify-between p-4  min-h-fit w-full">
      <header className="z-10 w-full max-w-5xl items-center inset-x-0 top-0 flex gap-4 border-b bg-background px-4 mb-6">
        <div className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-white py-2 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit">
          <NavigationMenu>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Dashboard
              </NavigationMenuLink>
            </Link>
            <Link href="/clients" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Clients
              </NavigationMenuLink>
            </Link>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <PlusCircle className="h-3.5 w-3.5" />
                Add Client
              </NavigationMenuLink>
            </Link>
            {/* <Button className="ml-3 bg-blue-200" variant="outline" size="lg">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only not-sr-only whitespace-nowrap">
                Add Client
              </span>
            </Button> */}
          </NavigationMenu>
        </div>
      </header>
    </div>
  );
}
