import { accounts, mails } from "./data";
import { Mail } from "./layout";

export default function MailPage() {
  return <Mail accounts={accounts} mails={mails} navCollapsedSize={4} />;
}
