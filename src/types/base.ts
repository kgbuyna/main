export type Route = "login" | "sign-up" | "inbox" | "friends";

export default interface Base {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
