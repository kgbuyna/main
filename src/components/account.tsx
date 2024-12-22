"use client";

import { ChevronsUpDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slices/userSlice";
import Image from "next/image";

const Account = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              {user.profileImage ? (
                <Image
                  src={user.profileImage}
                  alt="Profile"
                  width={32}
                  height={32}
                  className="size-8 rounded-full"
                />
              ) : (
                <div className="size-8 rounded-full bg-gray-300 flex items-center justify-center">
                  <span className="text-sm text-gray-600">N/A</span>
                </div>
              )}
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.username}</span>
                <span className="truncate text-xs">{user.name || ""}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={"bottom"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Settings
            </DropdownMenuLabel>

            <DropdownMenuItem
              // onClick={() => setActiveTeam(team)}
              className="gap-2 p-2"
            >
              <div className="text-xs text-muted-foreground">
                Change Password
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem
              // onClick={() => setActiveTeam(team)}
              className="gap-2 p-2"
            >
              <div className="text-xs text-muted-foreground">
                Change Profile
              </div>
            </DropdownMenuItem>

            <DropdownMenuItem onClick={handleLogout} className="gap-2 p-2">
              <div className="text-xs text-red-500">Logout</div>

              {/* {team.name} */}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default Account;
