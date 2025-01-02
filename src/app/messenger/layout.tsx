"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

import { ChevronRight, ChevronLeft } from "lucide-react";

import { Separator } from "../../components/ui/separator";
import { MailList } from "../../components/message-list";
import { type Mail } from "@/app/messenger/data";
import { useSelector } from "react-redux";
import { getRequest } from "@/utils/handlers";
import { UserType } from "@/types/userType";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SIDE_BAR_WIDTH } from "@/utils/consts";
import { Button } from "@/components/ui/button";

interface MailProps {
  accounts: {
    label: string;
    email: string;
    icon: ReactNode;
  }[];
  mails: Mail[];
  navCollapsedSize: number;
}

const PROFILE_WIDTH = 90;
const MARGIN_LEFT = 5;
const MARGIN_RIGHT = 5;
const SCROLL_TIMEOUT = 200;
const ITEM_WIDTH = PROFILE_WIDTH + MARGIN_LEFT + MARGIN_RIGHT;

const calcScrollPosition = (scrollLeft: number) => {
  return Math.round(scrollLeft / ITEM_WIDTH);
};

// Хамги
const InboxTab = ({ accounts, mails, navCollapsedSize }: MailProps) => {
  const userKey = useSelector((state) => state.user.userKey);
  const [friends, setFriends] = useState<UserType[]>([]);
  // const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null); // Use useRef to store the timeout

  const ref = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    // setIsScrolling(true);
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }

    scrollTimeout.current = setTimeout(() => {
      // setIsScrolling(false);
      if (ref.current) {
        if (
          ref.current.scrollWidth - ref.current.scrollLeft <
          ref.current.clientWidth
        )
          return;
        ref.current.scrollTo({
          left: calcScrollPosition(ref.current.scrollLeft) * ITEM_WIDTH,
          behavior: "smooth",
        });
      }
    }, SCROLL_TIMEOUT);
  };

  useEffect(() => {
    return () => {
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current); // Clear the timeout on cleanup
      }
    };
  }, []);
  useEffect(() => {
    if (!userKey) return;

    const fetchUsers = async () => {
      try {
        const users = await getRequest<{ users: UserType[] }>("/auth/users", {
          userKey,
        });
        setFriends(
          [
            ...(users?.data?.users || []),
            ...(users?.data?.users || []),
            ...(users?.data?.users || []),
            ...(users?.data?.users || []),
            ...(users?.data?.users || []),
            ...(users?.data?.users || []),
            ...(users?.data?.users || []),
            ...(users?.data?.users || []),
          ] || []
        );
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };
    fetchUsers();
  }, [userKey]);

  const calculatedWidth = `calc(50vw - ${SIDE_BAR_WIDTH}px)`;
  return (
    <div className="w-full overflow-x-hidden">
      <h1 className="text-xl font-bold m-4">Inbox</h1>
      <Separator />
      <div className="flex relative">
        <Button
          variant={"ghost"}
          size={"lg"}
          // disabled={ref.current === null || ref.current.scrollLeft <= 0}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 z-10 "
          onClick={() => {
            if (ref.current && ref.current.scrollLeft > 0) {
              ref.current.scrollTo({
                left:
                  calcScrollPosition(ref.current.scrollLeft - ITEM_WIDTH) *
                  ITEM_WIDTH,
                behavior: "smooth",
              });
            }
          }}
        >
          <ChevronLeft />
        </Button>

        <div
          className="flex items-center overflow-x-scroll hide-scrollbar"
          style={{ maxWidth: calculatedWidth }}
          ref={ref}
          onScroll={handleScroll}
        >
          {friends.map((friend, index) => (
            <figure
              key={index}
              style={{
                width: PROFILE_WIDTH,
                marginLeft: MARGIN_LEFT,
                marginRight: MARGIN_RIGHT,
                height: PROFILE_WIDTH,
                marginTop: 5,
                marginBottom: 5,
                borderRadius: "50%",
              }}
              className="shrink-0"
            >
              <Avatar
                key={friend.id}
                style={{
                  width: "100%",
                  height: "100%",
                }}
              >
                {/* <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover", // Maintains the aspect ratio and fills the container
                  }}
                /> */}
                <AvatarFallback>{index}</AvatarFallback>
              </Avatar>
            </figure>
          ))}
        </div>

        <Button
          variant={"ghost"}
          size={"lg"}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 z-10"
          disabled={
            ref.current &&
            ref.current.scrollWidth - ref.current.scrollLeft <
              ref.current.clientWidth
          }
          onClick={() => {
            if (ref.current) {
              if (
                ref.current.scrollWidth - ref.current.scrollLeft <
                ref.current.clientWidth
              )
                return;
              ref.current.scrollTo({
                left:
                  calcScrollPosition(ref.current.scrollLeft + ITEM_WIDTH) *
                  ITEM_WIDTH,
                behavior: "smooth",
              });
            }
          }}
        >
          <ChevronRight size={40} />
        </Button>
      </div>
      <Separator />
      <MailList items={[]}></MailList>
    </div>
  );
};

export default InboxTab;
