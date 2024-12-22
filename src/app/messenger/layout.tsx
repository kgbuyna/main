"use client";

import * as React from "react";
import { Search } from "lucide-react";

import { Separator } from "../../components/ui/separator";
import { Input } from "../../components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { MailList } from "../../components/message-list";
import { type Mail } from "@/app/messenger/data";

interface MailProps {
  accounts: {
    label: string;
    email: string;
    icon: React.ReactNode;
  }[];
  mails: Mail[];
  navCollapsedSize: number;
}

const MailLayout = ({ accounts, mails, navCollapsedSize }: MailProps) => {
  return (
    <Tabs defaultValue="all" className="h-full">
      <div className="flex items-center px-2 py-4">
        <h1 className="text-xl font-bold">Inbox</h1>
        <TabsList className="ml-auto">
          <TabsTrigger value="all" className="text-zinc-600 dark:text-zinc-200">
            All mail
          </TabsTrigger>
          <TabsTrigger
            value="unread"
            className="text-zinc-600 dark:text-zinc-200"
          >
            Unread
          </TabsTrigger>
        </TabsList>
      </div>
      <Separator />
      <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <form>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search" className="pl-8" />
          </div>
        </form>
      </div>
      <TabsContent value="all" className="m-0">
        <MailList items={[]} />
      </TabsContent>
      <TabsContent value="unread" className="m-0">
        <MailList items={[]} />
      </TabsContent>
    </Tabs>
  );
};

export default MailLayout;
