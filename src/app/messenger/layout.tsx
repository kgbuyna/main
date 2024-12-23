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
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface MailProps {
  accounts: {
    label: string;
    email: string;
    icon: React.ReactNode;
  }[];
  mails: Mail[];
  navCollapsedSize: number;
}

const InboxTab = ({ accounts, mails, navCollapsedSize }: MailProps) => {
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
      <ScrollArea>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <TabsContent value="all" className="m-0">
        <MailList items={[]} />
      </TabsContent>
      <TabsContent value="unread" className="m-0">
        <MailList items={[]} />
      </TabsContent>
    </Tabs>
  );
};

export default InboxTab;
