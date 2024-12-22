import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { useDispatch, useSelector } from "react-redux";
import { push } from "@/store/slices/userSlice";
import { Route } from "@/types/base";
import Account from "./account";
// import { push } from "@/store/slices/routerSlice";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Messenger",
      url: "#",
      items: [
        {
          title: "Inbox",
          routeName: "inbox",
          isActive: false,
        },
        {
          title: "Friends",
          routeName: "friends",
          isActive: false,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const currentRoute = useSelector((state) => state.user.currentRoute);

  const dispatch = useDispatch();

  return (
    <Sidebar variant="sidebar" {...props}>
      <SidebarHeader>
        <Account />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-2">
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  onClick={() => {
                    // dispatch(push(item.));
                  }}
                >
                  <a href={item.url} className="font-medium">
                    {item.title}
                  </a>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub className="ml-0 border-l-0 px-1.5">
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton
                          asChild
                          onClick={() =>
                            dispatch(push(item.routeName as Route))
                          }
                          isActive={currentRoute == item.routeName}
                        >
                          <a href={item.url}>{item.title}</a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
