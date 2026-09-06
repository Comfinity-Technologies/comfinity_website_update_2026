import { readSubmissions } from "./_helpers";
import ContactsClient from "./ContactsClient";

export default function ContactsPage() {
  const submissions = readSubmissions();
  return <ContactsClient submissions={submissions} />;
}