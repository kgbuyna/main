"use client";

import { Tabs, TabsContent } from "@/components/ui/tabs";
import React from "react";
import Login from "./auth/login";
import SignUp from "./auth/sign-up";
import { useSelector } from "react-redux";
import MessengerLayout from "./messenger/layout";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

const App = () => {
  const currentRoute = useSelector((state) => state.router.currentRoute);

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
        <TabsContent value="messenger" className="h-full w-full">
          <MessengerLayout />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default App;
