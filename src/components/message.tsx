import { formatDistanceToNow } from "date-fns";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

interface UserType {
  username: string;
  email: string;
}

interface MessageType {
  id: string;
  content: string;
  createdAt: string;
  read: boolean;
  sender: UserType;
}

interface Props {
  message: MessageType;
}

const Message = ({ message }: Props) => {
  return (
    <button
      key={message.id}
      className={cn(
        "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent"
        // message.selected === message.id && "bg-muted"
      )}
      onClick={
        () => {
          console.log("object");
        }
        // setMail({
        //   ...mail,
        //   selected: item.id,
        // })
      }
    >
      <div className="flex w-full flex-col gap-1">
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <div className="font-semibold">{message.sender.username}</div>
            {!message.read && (
              <span className="flex h-2 w-2 rounded-full bg-blue-600" />
            )}
          </div>
          <div
            className={cn(
              "ml-auto text-xs text-muted-foreground"
              // mail.selected === item.id
              //   ? "text-foreground"
              //   : "text-muted-foreground"
            )}
          >
            {formatDistanceToNow(new Date(message.createdAt), {
              addSuffix: true,
            })}
          </div>
        </div>
      </div>
      <div className="flex flex-row">
        <div className="line-clamp-2 text-xs text-muted-foreground">
          <span className="font-semibold">Daniel:</span>{" "}
          {message.content.substring(0, 300)}
        </div>
        <div>
          <Badge variant="default" className="text-xs">
            2
          </Badge>
        </div>
      </div>
    </button>
  );
};

export default Message;
