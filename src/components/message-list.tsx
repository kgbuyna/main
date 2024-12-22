import { formatDistanceToNow } from "date-fns";

import { cn } from "@/lib/utils";
import { ScrollArea } from "./ui/scroll-area";
import { useMail } from "@/app/messenger/use-mail";
import { Mail } from "@/app/messenger/data";
import { Badge } from "./ui/badge";
import { UserType } from "@/types/base";

interface MailType {
  user1: UserType;
  user2: UserType;
  lastMessage: {
    content: string;
    createdAt: string;
  };
  createdAt: string;
}

interface MailListProps {
  items: Mail[];
}

export function MailList({ items }: MailListProps) {
  const [mail, setMail] = useMail();

  return (
    <ScrollArea className="h-full">
      <div className="flex flex-col gap-2 p-4 pt-0">
        {items.map((item) => (
          <button
            key={item.id}
            className={cn(
              "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
              mail.selected === item.id && "bg-muted"
            )}
            onClick={() =>
              setMail({
                ...mail,
                selected: item.id,
              })
            }
          >
            <div className="flex w-full flex-col gap-1">
              <div className="flex items-center">
                <div className="flex items-center gap-2">
                  <div className="font-semibold">{item.name}</div>
                  {!item.read && (
                    <span className="flex h-2 w-2 rounded-full bg-blue-600" />
                  )}
                </div>
                <div
                  className={cn(
                    "ml-auto text-xs",
                    mail.selected === item.id
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {formatDistanceToNow(new Date(item.date), {
                    addSuffix: true,
                  })}
                </div>
              </div>
            </div>
            <div className="flex flex-row">
              <div className="line-clamp-2 text-xs text-muted-foreground">
                <span className="font-semibold">Daniel:</span>{" "}
                {item.text.substring(0, 300)}
              </div>
              <div>
                <Badge variant="default" className="text-xs">
                  2
                </Badge>
              </div>
            </div>
          </button>
        ))}
      </div>
    </ScrollArea>
  );
}
