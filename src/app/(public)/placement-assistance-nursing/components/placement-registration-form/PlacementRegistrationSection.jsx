
"use client";

import PlacementRegistrationForm from "./PlacementRegistrationForm";

export default function PlacementRegistrationSection() {
  const handleRegistration = async (formData) => {
    // Replace with your actual registration API endpoint.
    const response = await fetch("/api/placement-registration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (!response.ok || result.status === false) {
      throw new Error(
        result.message || "Registration failed."
      );
    }

    // Add brochure download handling here
    // after the backend confirms successful registration.

    return result;
  };

  return (
    <PlacementRegistrationForm
      onSubmit={handleRegistration}
    />
  );
}
