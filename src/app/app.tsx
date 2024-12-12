"use client";

import { Tabs, TabsContent } from "@/components/ui/tabs";
import React from "react";
import Login from "./auth/login";
import SignUp from "./auth/sign-up";
import { useSelector } from "react-redux";

const App = () => {
  const currentRoute = useSelector((state) => state.router.currentRoute);

  return (
    <Tabs value={currentRoute}>
      <TabsContent value="login">
        <Login />
      </TabsContent>
      <TabsContent value="sign-up">
        <SignUp />
      </TabsContent>
    </Tabs>
  );
};

export default App;
