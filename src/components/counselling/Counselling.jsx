"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";

import {
    CalendarDays,
    Globe,
    GraduationCap,
    Headphones,
    Mail,
    MapPin,
    User,
    Wallet,
} from "lucide-react";

const Select = dynamic(() => import("react-select"), {
    ssr: false,
});

const PhoneInput = dynamic(
    () =>
        import("react-international-phone").then(
            (module) => module.PhoneInput
        ),
    {
        ssr: false,
        loading: () => (
            <div className="h-11 w-full animate-pulse rounded-lg bg-slate-100" />
        ),
    }
);

const INITIAL_FORM_DATA = {
    firstname: "",
    lastname: "",
    email: "",
    destination: "",
    nearestidp: "",
    studylevel: "",
    modeofcounselling: "",
    starttime: "",
    fund: "",
};

const START_TIME_OPTIONS = [
    "Immediately",
    "Within 3 Months",
    "Within 6 Months",
    "Next Year",
];

const OFFICE_OPTIONS = [
    "Kochi",
    "Calicut",
    "Kannur",
    "Trivandrum",
];

const COUNSELLING_MODE_OPTIONS = [
    "Online",
    "Offline",
    "Phone Call",
];

const STUDY_LEVEL_OPTIONS = [
    "Bachelor's",
    "Master's",
    "Diploma",
    "PhD",
];

const FUNDING_OPTIONS = [
    "Self Funded",
    "Education Loan",
    "Scholarship",
    "Family Support",
];

const getCountryName = (country) =>
    country?.name ||
    country?.title ||
    country?.destination ||
    country?.country_name ||
    country?.destination_name ||
    country?.country ||
    "";

const normalizeCountries = (value) => {
    if (!value) return [];

    if (Array.isArray(value)) {
        return value.flatMap(normalizeCountries);
    }

    if (typeof value !== "object") {
        return [];
    }

    const nestedCollections = [
        value.countries,
        value.destinations,
        value.data,
        value.result,
        value.response,
    ];

    const nested = nestedCollections.find(Array.isArray);

    return nested ? normalizeCountries(nested) : [value];
};

const extractMessage = (result, fallback) =>
    result?.message ||
    result?.error ||
    result?.data?.message ||
    fallback;

export default function Counselling() {
    const [countries, setCountries] = useState([]);
    const [countriesLoading, setCountriesLoading] = useState(true);
    const [countriesError, setCountriesError] = useState("");

    const [formData, setFormData] = useState(INITIAL_FORM_DATA);
    const [mobile, setMobile] = useState("");
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        const loadCountries = async () => {
            try {
                setCountriesLoading(true);
                setCountriesError("");

                const response = await fetch("/api/destinations", {
                    method: "GET",
                    signal: controller.signal,
                    cache: "no-store",
                });

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(
                        extractMessage(result, "Unable to load destinations.")
                    );
                }

                setCountries(normalizeCountries(result));
            } catch (error) {
                if (error?.name !== "AbortError") {
                    console.error("Destination loading error:", error);
                    setCountriesError(
                        error?.message || "Unable to load destinations."
                    );
                }
            } finally {
                if (!controller.signal.aborted) {
                    setCountriesLoading(false);
                }
            }
        };

        loadCountries();

        return () => controller.abort();
    }, []);

    const destinationOptions = useMemo(() => {
        const uniqueCountries = new Map();

        normalizeCountries(countries).forEach((country) => {
            const label = getCountryName(country).trim();

            if (!label) return;

            const value = String(
                country?.d_id ||
                country?.id ||
                country?.country_id ||
                label
            );

            if (!uniqueCountries.has(label.toLowerCase())) {
                uniqueCountries.set(label.toLowerCase(), {
                    label,
                    value,
                });
            }
        });

        return Array.from(uniqueCountries.values());
    }, [countries]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previousData) => ({
            ...previousData,
            [name]: value,
        }));

        clearFieldError(name);
    };

    const handleSelectChange = (name, value) => {
        setFormData((previousData) => ({
            ...previousData,
            [name]: value,
        }));

        clearFieldError(name);
    };

    const clearFieldError = (name) => {
        setErrors((previousErrors) => {
            if (!previousErrors[name]) return previousErrors;

            return {
                ...previousErrors,
                [name]: "",
            };
        });
    };

    const validateForm = () => {
        const newErrors = {};
        const mobileDigits = mobile.replace(/\D/g, "");

        if (!formData.firstname.trim()) {
            newErrors.firstname = "First name is required";
        }

        if (!formData.lastname.trim()) {
            newErrors.lastname = "Last name is required";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email address is required";
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
        ) {
            newErrors.email = "Enter a valid email address";
        }

        if (!mobile.trim()) {
            newErrors.mobile = "Mobile number is required";
        } else if (mobileDigits.length < 10 || mobileDigits.length > 15) {
            newErrors.mobile = "Enter a valid mobile number";
        }

        if (!formData.destination) {
            newErrors.destination = "Preferred destination is required";
        }

        if (!formData.starttime) {
            newErrors.starttime = "Start time is required";
        }

        if (!formData.nearestidp) {
            newErrors.nearestidp = "Nearest office is required";
        }

        if (!formData.modeofcounselling) {
            newErrors.modeofcounselling = "Counselling mode is required";
        }

        if (!formData.studylevel) {
            newErrors.studylevel = "Study level is required";
        }

        if (!formData.fund) {
            newErrors.fund = "Funding option is required";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const resetForm = () => {
        setFormData(INITIAL_FORM_DATA);
        setMobile("");
        setErrors({});
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateForm() || submitting) return;

        try {
            setSubmitting(true);

            const response = await fetch("/api/enquiries", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...formData,
                    firstname: formData.firstname.trim(),
                    lastname: formData.lastname.trim(),
                    email: formData.email.trim().toLowerCase(),
                    mobile,
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    extractMessage(
                        result,
                        "Something went wrong. Please try again."
                    )
                );
            }

            resetForm();

            await Swal.fire({
                icon: "success",
                title: "Submitted Successfully!",
                text: "Your enquiry has been submitted. Our team will contact you soon.",
                confirmButtonText: "OK",
                confirmButtonColor: "#c01f53",
            });
        } catch (error) {
            console.error("Enquiry submission error:", error);

            await Swal.fire({
                icon: "error",
                title: "Submission Failed",
                text:
                    error?.message ||
                    "Failed to submit your enquiry. Please try again.",
                confirmButtonText: "OK",
                confirmButtonColor: "#c01f53",
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section
            id="counselling"
            aria-labelledby="counselling-heading"
            className="w-full scroll-mt-28 bg-white py-10 lg:py-16"
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid items-stretch gap-8 lg:grid-cols-2">
                    <CounsellingVisual />

                    <div className="rounded-[30px] border border-slate-100 bg-white p-6 shadow-xl sm:p-8 lg:p-10">
                        <h2
                            id="counselling-heading"
                            className="text-2xl font-bold leading-tight text-darkPrimary sm:text-3xl"
                        >
                            Get <span className="text-primary">FREE</span> Counselling
                            Today!
                        </h2>

                        <div
                            aria-hidden="true"
                            className="mb-6 mt-5 h-1 w-14 rounded-full bg-primary"
                        />

                        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                            <div className="grid gap-4 sm:grid-cols-2">
                                <InputField
                                    name="firstname"
                                    label="First name*"
                                    value={formData.firstname}
                                    onChange={handleChange}
                                    placeholder="Enter first name"
                                    autoComplete="given-name"
                                    icon={<User className="h-4 w-4" />}
                                    error={errors.firstname}
                                />

                                <InputField
                                    name="lastname"
                                    label="Last name*"
                                    value={formData.lastname}
                                    onChange={handleChange}
                                    placeholder="Enter last name"
                                    autoComplete="family-name"
                                    icon={<User className="h-4 w-4" />}
                                    error={errors.lastname}
                                />
                            </div>

                            <InputField
                                name="email"
                                type="email"
                                label="Email address*"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                autoComplete="email"
                                icon={<Mail className="h-4 w-4" />}
                                error={errors.email}
                            />

                            <div>
                                <label
                                    htmlFor="mobile"
                                    className="mb-2 block text-sm font-semibold text-darkPrimary"
                                >
                                    Mobile number*
                                </label>

                                <div
                                    className={`overflow-hidden rounded-xl border bg-white transition focus-within:ring-2 focus-within:ring-primary/20 ${errors.mobile
                                        ? "border-red-500"
                                        : "border-slate-300 focus-within:border-primary"
                                        }`}
                                >
                                    <PhoneInput
                                        defaultCountry="in"
                                        value={mobile}
                                        onChange={(phone) => {
                                            setMobile(phone);
                                            clearFieldError("mobile");
                                        }}
                                        inputProps={{
                                            id: "mobile",
                                            name: "mobile",
                                            required: true,
                                            autoComplete: "tel",
                                            "aria-invalid": Boolean(errors.mobile),
                                            "aria-describedby": errors.mobile
                                                ? "mobile-error"
                                                : undefined,
                                        }}
                                        className="w-full"
                                        inputClassName="!h-11 !w-full !border-0 !bg-transparent !text-sm !outline-none"
                                        countrySelectorStyleProps={{
                                            buttonClassName:
                                                "!h-11 !border-0 !border-r !border-slate-200 !bg-slate-50",
                                        }}
                                    />
                                </div>

                                {errors.mobile && (
                                    <p id="mobile-error" className="mt-1 text-xs text-red-500">
                                        {errors.mobile}
                                    </p>
                                )}
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <ReactSelectField
                                    name="destination"
                                    label="Preferred study destination*"
                                    value={formData.destination}
                                    onChange={handleSelectChange}
                                    options={destinationOptions}
                                    loading={countriesLoading}
                                    icon={<Globe className="h-4 w-4" />}
                                    error={errors.destination || countriesError}
                                    placeholder="Select destination"
                                />

                                <ReactSelectField
                                    name="starttime"
                                    label="When would you like to start?*"
                                    value={formData.starttime}
                                    onChange={handleSelectChange}
                                    options={START_TIME_OPTIONS}
                                    icon={<CalendarDays className="h-4 w-4" />}
                                    error={errors.starttime}
                                    placeholder="Select start time"
                                />
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <ReactSelectField
                                    name="nearestidp"
                                    label="Nearest Medcity office*"
                                    value={formData.nearestidp}
                                    onChange={handleSelectChange}
                                    options={OFFICE_OPTIONS}
                                    icon={<MapPin className="h-4 w-4" />}
                                    error={errors.nearestidp}
                                    placeholder="Select office"
                                />

                                <ReactSelectField
                                    name="modeofcounselling"
                                    label="Preferred counselling mode*"
                                    value={formData.modeofcounselling}
                                    onChange={handleSelectChange}
                                    options={COUNSELLING_MODE_OPTIONS}
                                    icon={<Headphones className="h-4 w-4" />}
                                    error={errors.modeofcounselling}
                                    placeholder="Select mode"
                                />
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <ReactSelectField
                                    name="studylevel"
                                    label="Preferred study level*"
                                    value={formData.studylevel}
                                    onChange={handleSelectChange}
                                    options={STUDY_LEVEL_OPTIONS}
                                    icon={<GraduationCap className="h-4 w-4" />}
                                    error={errors.studylevel}
                                    placeholder="Select level"
                                />

                                <ReactSelectField
                                    name="fund"
                                    label="How will you fund your education?*"
                                    value={formData.fund}
                                    onChange={handleSelectChange}
                                    options={FUNDING_OPTIONS}
                                    icon={<Wallet className="h-4 w-4" />}
                                    error={errors.fund}
                                    placeholder="Select funding"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={submitting || countriesLoading}
                                className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white shadow-lg shadow-primary/20 transition hover:-translate-y-0.5 hover:bg-darkPrimary disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                            >
                                {submitting ? "Submitting..." : "Request Free Counselling"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

function CounsellingVisual() {
    return (
        <div className="relative flex min-h-[520px] flex-col justify-center overflow-hidden rounded-[30px] p-8 sm:p-10 lg:min-h-full">
            <Image
                src={counsellingImage}
                alt="Student receiving study abroad counselling"
                fill
                priority={false}
                sizes="(max-width: 1023px) 100vw, 50vw"
                className="object-cover object-center"
            />

            <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-br from-black/85 via-black/70 to-darkPrimary/75"
            />

            <div className="relative z-10 flex flex-col gap-8">
                <span className="flex w-fit items-center gap-2 rounded-full border border-white/40 bg-white/10 px-4 py-2 text-white backdrop-blur-md">
                    <Headphones aria-hidden="true" className="h-5 w-5" />
                    <span className="text-sm font-bold">Expert Guidance, Every Step</span>
                </span>

                <h2 className="font-nunito text-4xl font-extrabold leading-[1.08] text-white sm:text-5xl lg:text-6xl">
                    Your Dream
                    <br />
                    University
                    <br />
                    <span className="bg-gradient-to-r from-logoYellow to-white bg-clip-text text-transparent">
                        Awaits You
                    </span>
                </h2>

                <div className="h-1 w-14 rounded-full bg-logoYellow" />

                <p className="max-w-md text-base leading-8 text-white/85 sm:text-lg">
                    We guide you through university selection, applications, visas,
                    and every stage of your study abroad journey.
                </p>
            </div>

            <div
                aria-hidden="true"
                className="absolute right-6 top-10 z-10 hidden w-24 lg:block"
            >
                <Image
                    src={aeroplanePath}
                    alt=""
                    className="h-auto w-full"
                    sizes="96px"
                />
            </div>
        </div>
    );
}

function InputField({
    icon,
    placeholder,
    label,
    name,
    value,
    onChange,
    type = "text",
    error,
    autoComplete,
}) {
    const errorId = `${name}-error`;

    return (
        <div>
            <label
                htmlFor={name}
                className="mb-2 block text-sm font-semibold text-darkPrimary"
            >
                {label}
            </label>

            <div
                className={`flex min-h-11 items-center gap-3 rounded-xl border bg-white px-4 transition focus-within:ring-2 focus-within:ring-primary/20 ${error
                    ? "border-red-500"
                    : "border-slate-300 focus-within:border-primary"
                    }`}
            >
                <span aria-hidden="true" className="text-slate-400">
                    {icon}
                </span>

                <input
                    id={name}
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    aria-invalid={Boolean(error)}
                    aria-describedby={error ? errorId : undefined}
                    className="h-11 w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                />
            </div>

            {error && (
                <p id={errorId} className="mt-1 text-xs text-red-500">
                    {error}
                </p>
            )}
        </div>
    );
}

function ReactSelectField({
    icon,
    label,
    name,
    value,
    onChange,
    options = [],
    error,
    loading = false,
    placeholder = "Select option",
}) {
    const selectOptions = useMemo(
        () =>
            options.map((option) =>
                typeof option === "string"
                    ? { label: option, value: option }
                    : option
            ),
        [options]
    );

    const selectedValue =
        selectOptions.find((option) => String(option.value) === String(value)) ||
        null;

    const errorId = `${name}-error`;

    return (
        <div>
            <label
                htmlFor={name}
                className="mb-2 block text-sm font-semibold text-darkPrimary"
            >
                {label}
            </label>

            <div
                className={`flex min-h-11 items-center gap-3 rounded-xl border bg-white px-4 transition focus-within:ring-2 focus-within:ring-primary/20 ${error
                    ? "border-red-500"
                    : "border-slate-300 focus-within:border-primary"
                    }`}
            >
                <span aria-hidden="true" className="shrink-0 text-slate-400">
                    {icon}
                </span>

                <div className="min-w-0 flex-1">
                    <Select
                        inputId={name}
                        instanceId={name}
                        name={name}
                        value={selectedValue}
                        onChange={(selectedOption) =>
                            onChange(name, selectedOption?.value || "")
                        }
                        options={selectOptions}
                        isSearchable
                        isClearable
                        isDisabled={loading}
                        isLoading={loading}
                        placeholder={loading ? "Loading..." : placeholder}
                        aria-invalid={Boolean(error)}
                        aria-describedby={error ? errorId : undefined}
                        styles={{
                            control: (base) => ({
                                ...base,
                                minHeight: "42px",
                                border: "none",
                                boxShadow: "none",
                                backgroundColor: "transparent",
                            }),
                            valueContainer: (base) => ({
                                ...base,
                                padding: 0,
                            }),
                            input: (base) => ({
                                ...base,
                                margin: 0,
                                padding: 0,
                            }),
                            placeholder: (base) => ({
                                ...base,
                                color: "#94a3b8",
                                fontSize: "0.875rem",
                            }),
                            singleValue: (base) => ({
                                ...base,
                                color: "#0f172a",
                                fontSize: "0.875rem",
                            }),
                            indicatorSeparator: () => ({
                                display: "none",
                            }),
                            dropdownIndicator: (base) => ({
                                ...base,
                                padding: 0,
                            }),
                            clearIndicator: (base) => ({
                                ...base,
                                padding: "0 4px",
                            }),
                            menuPortal: (base) => ({
                                ...base,
                                zIndex: 99999,
                            }),
                            menu: (base) => ({
                                ...base,
                                zIndex: 99999,
                            }),
                        }}
                    />
                </div>
            </div>

            {error && (
                <p id={errorId} className="mt-1 text-xs text-red-500">
                    {error}
                </p>
            )}
        </div>
    );
}