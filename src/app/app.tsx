"use client";

import { Tabs, TabsContent } from "@/components/ui/tabs";
import React from "react";
import Login from "./auth/login";
import SignUp from "./auth/sign-up";
import { useSelector } from "react-redux";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import InboxTab from "./messenger/layout";

const App = () => {
  const currentRoute = useSelector((state) => state.user.currentRoute);
  
  return (
    <div className="flex flex-row h-screen w-full">
      {currentRoute !== "login" && currentRoute !== "sign-up" && (
        <div className="relative">
          <SidebarProvider>
            <AppSidebar />
          </SidebarProvider>
        </div>
      )}
      <Tabs value={currentRoute} className="h-full w-full">
        <TabsContent value="login">
          <Login />
        </TabsContent>
        <TabsContent value="sign-up">
          <SignUp />
        </TabsContent>
        <TabsContent value="inbox" className="h-full w-full">
          <InboxTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default App;
