
import ContactActionCard from "./ContactActionCard";
import { contactActions } from "./contactData";

export default function ContactActions({
  onConsultation,
}) {
  return (
    <div className="grid min-w-0 grid-cols-1 gap-4">
      {contactActions.map((action) => (
        <ContactActionCard
          key={action.id}
          action={action}
          onClick={
            action.id === "consultation"
              ? onConsultation
              : undefined
          }
        />
      ))}
    </div>
  );
}
