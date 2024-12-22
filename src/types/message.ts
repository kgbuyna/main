import Base from "./base";

export interface MessageType extends Base {
  content: string;
  sender: string;
}
