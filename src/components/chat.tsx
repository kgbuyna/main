"use client";

import * as React from "react";
import { Plus, Send } from "lucide-react";

import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

// type User = (typeof users)[number];

const CardsChat = () => {
  const [messages, setMessages] = React.useState([
    {
      role: "agent",
      content: "Hi, how can I help you today?",
    },
    {
      role: "user",
      content: "Hey, I'm having trouble with my account.",
    },
    {
      role: "agent",
      content: "What seems to be the problem?",
    },
    {
      role: "user",
      content: "I can't log in.",
    },

    {
      role: "user",
      content: "I can't log in.",
    },

    {
      role: "user",
      content: "I can't log in.",
    },

    {
      role: "user",
      content: "I can't log in.",
    },

    {
      role: "user",
      content: "I can't log in.",
    },

    {
      role: "user",
      content: "I can't log in.",
    },

    {
      role: "user",
      content: "I can't log in.",
    },

    {
      role: "user",
      content: "I can't log in.",
    },

    {
      role: "user",
      content: "I can't log in.",
    },

    {
      role: "user",
      content: "I can't log in.",
    },

    {
      role: "user",
      content: "I can't log in.",
    },

    {
      role: "user",
      content: "I can't log in.",
    },

    {
      role: "user",
      content: "I can't log in.",
    },

    {
      role: "user",
      content: "I can't log in.",
    },

    {
      role: "user",
      content: "I can't log in.",
    },

    {
      role: "user",
      content: "I can't log in.",
    },

    {
      role: "user",
      content: "I can't log in.",
    },

    {
      role: "user",
      content: "I can't log in.",
    },

    {
      role: "user",
      content: "I can't log in.",
    },

    {
      role: "user",
      content: "I can't log in.",
    },

    {
      role: "user",
      content: "I can't log in.",
    },

    {
      role: "user",
      content: "I can't log in.",
    },

    {
      role: "user",
      content: "I can't log in.",
    },

    {
      role: "user",
      content: "I can't log in.",
    },

    {
      role: "user",
      content: "I can't log in.",
    },

    {
      role: "user",
      content: "I can't log in.",
    },
  ]);
  const [input, setInput] = React.useState("");
  const inputLength = input.trim().length;

  return (
    <Card className="flex flex-col h-screen">
      <CardHeader className="flex flex-row items-center">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src="/avatars/01.png" alt="Image" />
            <AvatarFallback>OM</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium leading-none">Sofia Davis</p>
            <p className="text-sm text-muted-foreground">m@example.com</p>
          </div>
        </div>
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="outline"
                className="ml-auto rounded-full"
              >
                <Plus />
                <span className="sr-only">New message</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent sideOffset={10}>New message</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardHeader>
      <CardContent className="flex-grow overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                "flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm",
                message.role === "user"
                  ? "ml-auto bg-primary text-primary-foreground"
                  : "bg-muted"
              )}
            >
              {message.content}
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex-shrink-0">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            if (inputLength === 0) return;
            setMessages([
              ...messages,
              {
                role: "user",
                content: input,
              },
            ]);
            setInput("");
          }}
          className="flex w-full items-center space-x-2"
        >
          <Input
            id="message"
            placeholder="Type your message..."
            className="flex-1"
            autoComplete="off"
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <Button type="submit" size="icon" disabled={inputLength === 0}>
            <Send />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};

export default CardsChat;
