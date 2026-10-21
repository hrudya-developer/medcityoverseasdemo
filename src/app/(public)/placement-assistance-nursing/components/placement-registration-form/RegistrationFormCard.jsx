
"use client";

import { useState } from "react";
import {
  FileText,
  LockKeyhole,
  Send,
} from "lucide-react";

import RegistrationField from "./RegistrationField";
import { registrationFields } from "./registrationData";

const initialValues = {
  fullName: "",
  whatsapp: "",
  email: "",
  qualification: "",
  city: "",
};

function validateForm(values) {
  const errors = {};

  if (!values.fullName.trim()) {
    errors.fullName = "Please enter your full name.";
  }

  const phone = values.whatsapp.replace(/\D/g, "");

  if (!/^[6-9]\d{9}$/.test(phone)) {
    errors.whatsapp =
      "Enter a valid 10-digit Indian WhatsApp number.";
  }

  if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      values.email.trim()
    )
  ) {
    errors.email = "Enter a valid email address.";
  }

  if (!values.qualification.trim()) {
    errors.qualification =
      "Please enter your qualification.";
  }

  if (!values.city.trim()) {
    errors.city = "Please enter your city.";
  }

  return errors;
}

export default function RegistrationFormCard({
  onSubmit,
}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleChange = (name, value) => {
    setValues((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));

    setMessage("");
    setStatus("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) return;

    const validationErrors = validateForm(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    if (typeof onSubmit !== "function") {
      setStatus("error");
      setMessage(
        "Registration is not connected yet. Please try again later."
      );
      return;
    }

    setIsSubmitting(true);
    setMessage("");
    setStatus("");

    try {
      await onSubmit({
        fullName: values.fullName.trim(),
        whatsapp: values.whatsapp.replace(/\D/g, ""),
        email: values.email.trim(),
        qualification: values.qualification.trim(),
        city: values.city.trim(),
      });

      setStatus("success");
      setMessage("Registration submitted successfully.");
      setValues(initialValues);
      setErrors({});
    } catch (error) {
      setStatus("error");
      setMessage(
        error?.message ||
          "Unable to submit your registration. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative w-full min-w-0 overflow-hidden rounded-[24px] border border-white/80 bg-[#fff9f7]/95 p-5 shadow-[0_25px_80px_rgba(27,28,64,0.16)] backdrop-blur-xl sm:rounded-[30px] sm:p-7 lg:p-8 xl:p-10">
      {/* Decorative pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-12 -top-16 h-48 w-48 rounded-full bg-pink-100/60"
      />

      <div className="relative z-10">
        {/* Form header */}
        <div className="mb-8 flex items-center gap-4 sm:mb-10">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#ffe2ec] text-[#c01f53] sm:h-16 sm:w-16">
            <FileText size={27} strokeWidth={2} />
          </div>

          <div className="min-w-0">
            <div className="inline-flex rounded-full bg-[#ffe5ee] px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.15em] text-[#c01f53] sm:text-xs">
              Registration Form
            </div>

            <p className="mt-2 text-xs text-slate-500 sm:text-sm">
              Fields marked with an{" "}
              <span className="font-bold text-[#c01f53]">
                *
              </span>{" "}
              are required
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="space-y-6"
        >
          {/* Input grid */}
          <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2 sm:gap-y-6">
            {registrationFields.map((field) => (
              <RegistrationField
                key={field.name}
                field={field}
                value={values[field.name]}
                onChange={handleChange}
                error={errors[field.name]}
              />
            ))}
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="group flex min-h-[58px] w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#c01f53] via-[#e01861] to-[#c01f53] px-6 py-4 text-base font-extrabold text-white shadow-[0_12px_30px_rgba(192,31,83,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_35px_rgba(192,31,83,0.35)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c01f53] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 sm:text-lg"
          >
            <Send
              size={21}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />

            {isSubmitting ? "Submitting..." : "Submit"}
          </button>

          {/* Form status */}
          {message && (
            <p
              role="status"
              aria-live="polite"
              className={`rounded-xl px-4 py-3 text-sm ${
                status === "success"
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-700"
              }`}
            >
              {message}
            </p>
          )}

          {/* Privacy note */}
          <div className="flex items-start justify-center gap-3 px-1">
            <LockKeyhole
              size={19}
              className="mt-0.5 shrink-0 text-[#425578]"
            />

            <p className="max-w-[450px] text-xs leading-6 text-[#62718f] sm:text-[13px]">
              Your information is safe with us and will
              only be used to guide you on your UK
              nursing journey.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
