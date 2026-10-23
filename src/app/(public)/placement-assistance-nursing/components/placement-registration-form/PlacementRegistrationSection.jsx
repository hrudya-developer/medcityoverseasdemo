"use client";

import PlacementRegistrationForm from "./PlacementRegistrationForm";

/**
 * Split "Anu Mary Joseph" into first name "Anu" and last name "Mary Joseph".
 */
function splitName(fullName) {
  const parts = String(fullName || "").trim().split(/\s+/);

  return {
    firstname: parts.shift() || "",
    lastname: parts.join(" "),
  };
}

export default function PlacementRegistrationSection() {
  const handleRegistration = async (formData) => {
    const { firstname, lastname } = splitName(formData.fullName);

    // Registrations go in as enquiries through the existing
    // contact-us route (there is no separate registration endpoint).
    const response = await fetch("/api/contact-us", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname,
        lastname,
        email: formData.email,
        mobile: formData.whatsapp,
        message: [
          "UK Nursing placement registration",
          `Qualification: ${formData.qualification || ""}`,
          `City: ${formData.city || ""}`,
          `WhatsApp: ${formData.whatsapp || ""}`,
        ].join("\n"),
      }),
    });

    const isJson = (response.headers.get("content-type") || "").includes(
      "application/json"
    );

    const result = isJson ? await response.json().catch(() => null) : null;

    if (!response.ok || !result || result.success === false) {
      throw new Error(
        result?.message || "Registration failed. Please try again."
      );
    }

    return result;
  };

  return <PlacementRegistrationForm onSubmit={handleRegistration} />;
}
