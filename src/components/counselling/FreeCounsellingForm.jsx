"use client";

import { useState } from "react";
import {
    CheckCircle2,
    Loader2,
    Send,
} from "lucide-react";

const initialFormData = {
    fullName: "",
    email: "",
    phone: "",
    destination: "",
    studyLevel: "bachelors",
    message: "",
};

const FreeCounsellingForm = ({
    onSuccess,
}) => {
    const [formData, setFormData] =
        useState(initialFormData);

    const [isSubmitting, setIsSubmitting] =
        useState(false);

    const [isSubmitted, setIsSubmitted] =
        useState(false);

    const [error, setError] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previousData) => ({
            ...previousData,
            [name]: value,
        }));

        setError("");
    };

    const validateForm = () => {
        if (!formData.fullName.trim()) {
            return "Please enter your full name.";
        }

        if (!formData.email.trim()) {
            return "Please enter your email address.";
        }

        if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                formData.email
            )
        ) {
            return "Please enter a valid email address.";
        }

        if (!formData.phone.trim()) {
            return "Please enter your phone number.";
        }

        if (
            formData.phone.replace(/\D/g, "").length <
            7
        ) {
            return "Please enter a valid phone number.";
        }

        return "";
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");

        const validationError = validateForm();

        if (validationError) {
            setError(validationError);
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch(
                "/api/enquiries",
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                    body: JSON.stringify({
                        firstname: formData.fullName,
                        lastname: "",
                        email: formData.email,
                        mobile: formData.phone,
                        destination:
                            formData.destination,
                        studylevel:
                            formData.studyLevel,
                        message: formData.message,
                        nearestidp: "",
                        modeofcounselling: "",
                        starttime: "",
                        fund: "",
                    }),
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result?.message ||
                    "Unable to submit your request."
                );
            }

            setFormData(initialFormData);
            setIsSubmitted(true);

            window.setTimeout(() => {
                onSuccess?.();
            }, 1500);
        } catch (submissionError) {
            console.error(
                "Counselling submission error:",
                submissionError
            );

            setError(
                submissionError?.message ||
                "Something went wrong. Please try again."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <div
                role="status"
                className="
          flex flex-col
          items-center justify-center
          p-8 text-center
          sm:p-12
        "
            >
                <div
                    className="
            mb-4 flex
            h-16 w-16
            items-center justify-center
            rounded-full
            bg-emerald-100
            text-emerald-600
          "
                >
                    <CheckCircle2
                        aria-hidden="true"
                        size={36}
                    />
                </div>

                <h3 className="text-2xl font-bold text-slate-900">
                    Thank You!
                </h3>

                <p className="mt-2 max-w-md text-slate-600">
                    Your request for free counselling
                    has been received. Our expert
                    advisors will contact you shortly.
                </p>
            </div>
        );
    }

    return (
        <div className="p-6 sm:p-8">
            <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-900 sm:text-2xl">
                    Get Free Study Abroad Counselling
                </h3>

                <p className="mt-1 text-sm text-slate-600">
                    Fill out the details below to
                    connect with our education experts.
                </p>
            </div>

            {error && (
                <div
                    role="alert"
                    className="
            mb-4 rounded-xl
            border border-rose-200
            bg-rose-50
            p-3.5
            text-xs font-medium
            text-rose-700
          "
                >
                    {error}
                </div>
            )}

            <form
                onSubmit={handleSubmit}
                className="space-y-4"
                noValidate
            >
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormInput
                        id="fullName"
                        name="fullName"
                        label="Full Name"
                        type="text"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="John Doe"
                        autoComplete="name"
                        required
                    />

                    <FormInput
                        id="email"
                        name="email"
                        label="Email Address"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        autoComplete="email"
                        required
                    />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormInput
                        id="phone"
                        name="phone"
                        label="Phone / WhatsApp"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        autoComplete="tel"
                        required
                    />

                    <FormSelect
                        id="destination"
                        name="destination"
                        label="Preferred Destination"
                        value={formData.destination}
                        onChange={handleChange}
                    >
                        <option value="">
                            Select destination
                        </option>
                        <option value="germany">
                            Germany
                        </option>
                        <option value="uk">
                            United Kingdom
                        </option>
                        <option value="canada">
                            Canada
                        </option>
                        <option value="australia">
                            Australia
                        </option>
                        <option value="usa">
                            USA
                        </option>
                        <option value="other">
                            Other Country
                        </option>
                    </FormSelect>
                </div>

                <FormSelect
                    id="studyLevel"
                    name="studyLevel"
                    label="Preferred Level of Study"
                    value={formData.studyLevel}
                    onChange={handleChange}
                >
                    <option value="bachelors">
                        Bachelor&apos;s Degree
                    </option>
                    <option value="masters">
                        Master&apos;s Degree
                    </option>
                    <option value="doctorate">
                        Doctorate / PhD
                    </option>
                    <option value="diploma">
                        Diploma / Certificate
                    </option>
                </FormSelect>

                <div>
                    <label
                        htmlFor="message"
                        className="
              mb-1 block
              text-xs font-semibold
              text-slate-700
            "
                    >
                        Additional Information
                        <span className="font-normal text-slate-500">
                            {" "}
                            (Optional)
                        </span>
                    </label>

                    <textarea
                        id="message"
                        name="message"
                        rows={3}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your academic background or specific queries..."
                        className="
              w-full resize-none
              rounded-xl
              border border-slate-200
              bg-slate-50
              px-3.5 py-2.5
              text-sm text-slate-900
              outline-none
              transition
              focus:border-primary
              focus:bg-white
              focus:ring-2
              focus:ring-primary/20
            "
                    />
                </div>

                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="
              flex w-full
              cursor-pointer
              items-center justify-center
              gap-2
              rounded-xl
              bg-primary
              px-5 py-3
              text-sm font-semibold
              text-white
              shadow-lg
              transition
              hover:bg-darkPrimary
              active:scale-[0.99]
              disabled:cursor-not-allowed
              disabled:opacity-70
            "
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2
                                    aria-hidden="true"
                                    className="
                    h-4 w-4
                    animate-spin
                  "
                                />

                                <span>Submitting...</span>
                            </>
                        ) : (
                            <>
                                <Send
                                    aria-hidden="true"
                                    className="h-4 w-4"
                                />

                                <span>Submit Request</span>
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

const FormInput = ({
    id,
    label,
    required = false,
    ...inputProps
}) => {
    return (
        <div>
            <label
                htmlFor={id}
                className="
          mb-1 block
          text-xs font-semibold
          text-slate-700
        "
            >
                {label}

                {required && (
                    <span className="text-rose-500">
                        {" "}
                        *
                    </span>
                )}
            </label>

            <input
                id={id}
                required={required}
                className="
          w-full
          rounded-xl
          border border-slate-200
          bg-slate-50
          px-3.5 py-2.5
          text-sm text-slate-900
          outline-none
          transition
          focus:border-primary
          focus:bg-white
          focus:ring-2
          focus:ring-primary/20
        "
                {...inputProps}
            />
        </div>
    );
};

const FormSelect = ({
    id,
    label,
    children,
    ...selectProps
}) => {
    return (
        <div>
            <label
                htmlFor={id}
                className="
          mb-1 block
          text-xs font-semibold
          text-slate-700
        "
            >
                {label}
            </label>

            <select
                id={id}
                className="
          w-full
          rounded-xl
          border border-slate-200
          bg-slate-50
          px-3.5 py-2.5
          text-sm text-slate-900
          outline-none
          transition
          focus:border-primary
          focus:bg-white
          focus:ring-2
          focus:ring-primary/20
        "
                {...selectProps}
            >
                {children}
            </select>
        </div>
    );
};

export default FreeCounsellingForm;