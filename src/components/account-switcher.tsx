"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface AccountSwitcherProps {
  isCollapsed: boolean;
  account: {
    label: string;
    username: string;
    // icon: React.ReactNode;
  };
}

export function AccountSwitcher({
  isCollapsed,
  account,
}: AccountSwitcherProps) {
  return (
    <Select defaultValue={account.username}>
      <SelectTrigger
        className={cn(
          "flex items-center gap-2 [&>span]:line-clamp-1 [&>span]:flex [&>span]:w-full [&>span]:items-center [&>span]:gap-1 [&>span]:truncate [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0",
          isCollapsed &&
            "flex h-9 w-9 shrink-0 items-center justify-center p-0 [&>span]:w-auto [&>svg]:hidden"
        )}
        aria-label="Select account"
      >
        <SelectValue placeholder="Select an account">
          {/* {accounts.find((account) => account.email === selectedAccount)?.icon} */}
          <span className={cn("ml-2", isCollapsed && "hidden")}>
            {/* {
              accounts.find((account) => account.email === selectedAccount)
                ?.label
            } */}
          </span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem key={account.username} value={account.username}>
          <div className="flex items-center gap-3 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0 [&_svg]:text-foreground">
            {/* {account.icon} */}
            {account.username}
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
