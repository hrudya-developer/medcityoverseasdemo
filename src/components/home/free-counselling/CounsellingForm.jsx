"use client";

import {
    useMemo,
    useState,
} from "react";

import {
    CalendarDays,
    Globe2,
    GraduationCap,
    Headphones,
    Mail,
    MapPin,
    Send,
    UserRound,
    WalletCards,
} from "lucide-react";

import {
    PhoneInput,
} from "react-international-phone";

import Swal from "sweetalert2";

import cn from "@/lib/cn";

import {
    useGetAllDestinationsQuery,
} from "@/lib/services/searchApi";

import InputField from "./InputField";
import SelectField from "./SelectField";

import "react-international-phone/style.css";

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

const START_OPTIONS = [
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

const FUND_OPTIONS = [
    "Self Funded",
    "Education Loan",
    "Scholarship",
    "Family Support",
];

const getDestinationName = (
    destination
) =>
    destination?.name ||
    destination?.title ||
    destination?.destination ||
    destination?.country_name ||
    destination?.destination_name ||
    destination?.country ||
    "";

const getDestinationId = (
    destination,
    index
) =>
    destination?.id ||
    destination?.d_id ||
    destination?.destination_id ||
    index;

const flattenDestinations = (data) => {
    if (!Array.isArray(data)) {
        return [];
    }

    return data.flatMap((item) => {
        if (Array.isArray(item)) {
            return flattenDestinations(
                item
            );
        }

        if (
            Array.isArray(
                item?.countries
            )
        ) {
            return flattenDestinations(
                item.countries
            );
        }

        if (
            Array.isArray(
                item?.destinations
            )
        ) {
            return flattenDestinations(
                item.destinations
            );
        }

        if (Array.isArray(item?.data)) {
            return flattenDestinations(
                item.data
            );
        }

        return item ? [item] : [];
    });
};

const CounsellingForm = ({ onSuccess, }) => {
    const [formData, setFormData] =
        useState(INITIAL_FORM_DATA);

    const [mobile, setMobile] =
        useState("");

    const [errors, setErrors] =
        useState({});

    const [submitting, setSubmitting] =
        useState(false);

    const {
        data: destinationsData,
        isLoading:
        destinationsLoading,
        isFetching:
        destinationsFetching,
        isError:
        destinationsError,
        refetch:
        refetchDestinations,
    } = useGetAllDestinationsQuery(0);

    const destinationOptions =
        useMemo(() => {
            const destinations =
                flattenDestinations(
                    destinationsData
                        ?.destinations
                );

            const seen = new Set();

            return destinations
                .map(
                    (
                        destination,
                        index
                    ) => {
                        const name =
                            getDestinationName(
                                destination
                            ).trim();

                        if (
                            !name ||
                            seen.has(
                                name.toLowerCase()
                            )
                        ) {
                            return null;
                        }

                        seen.add(
                            name.toLowerCase()
                        );

                        return {
                            label: name,

                            // Keep the original
                            // behaviour of submitting
                            // the destination name.
                            value: name,

                            id: String(
                                getDestinationId(
                                    destination,
                                    index
                                )
                            ),
                        };
                    }
                )
                .filter(Boolean)
                .sort((first, second) =>
                    first.label.localeCompare(
                        second.label
                    )
                );
        }, [destinationsData]);

    const clearFieldError = (
        name
    ) => {
        setErrors((current) => {
            if (!current[name]) {
                return current;
            }

            return {
                ...current,
                [name]: "",
            };
        });
    };

    const handleInputChange = (
        event
    ) => {
        const {
            name,
            value,
        } = event.target;

        setFormData((current) => ({
            ...current,
            [name]: value,
        }));

        clearFieldError(name);
    };

    const handleSelectChange = (
        name,
        value
    ) => {
        setFormData((current) => ({
            ...current,
            [name]: value,
        }));

        clearFieldError(name);
    };

    const validateForm = () => {
        const nextErrors = {};

        if (!formData.firstname.trim()) {
            nextErrors.firstname =
                "First name is required.";
        }

        if (!formData.lastname.trim()) {
            nextErrors.lastname =
                "Last name is required.";
        }

        if (!formData.email.trim()) {
            nextErrors.email =
                "Email address is required.";
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                formData.email
            )
        ) {
            nextErrors.email =
                "Enter a valid email address.";
        }

        const mobileDigits =
            mobile.replace(/\D/g, "");

        if (!mobile.trim()) {
            nextErrors.mobile =
                "Mobile number is required.";
        } else if (
            mobileDigits.length < 7
        ) {
            nextErrors.mobile =
                "Enter a valid mobile number.";
        }

        if (!formData.destination) {
            nextErrors.destination =
                "Preferred destination is required.";
        }

        if (!formData.starttime) {
            nextErrors.starttime =
                "Start time is required.";
        }

        if (!formData.nearestidp) {
            nextErrors.nearestidp =
                "Nearest office is required.";
        }

        if (
            !formData.modeofcounselling
        ) {
            nextErrors.modeofcounselling =
                "Counselling mode is required.";
        }

        if (!formData.studylevel) {
            nextErrors.studylevel =
                "Study level is required.";
        }

        if (!formData.fund) {
            nextErrors.fund =
                "Funding option is required.";
        }

        setErrors(nextErrors);

        return (
            Object.keys(nextErrors)
                .length === 0
        );
    };

    const resetForm = () => {
        setFormData(
            INITIAL_FORM_DATA
        );

        setMobile("");
        setErrors({});
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateForm() || submitting) {
            return;
        }

        setSubmitting(true);

        try {
            const response = await fetch(
                "/api/counselling",
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                    body: JSON.stringify({
                        ...formData,
                        mobile,
                        ip: "",
                    }),
                }
            );

            const result =
                await response.json();

            if (!response.ok) {
                throw new Error(
                    result?.message ||
                    "Unable to submit your enquiry."
                );
            }

            resetForm();
            setSubmitting(false);

            // This closes the modal.
            onSuccess?.();

            // Show Swal after the modal closes.
            window.setTimeout(() => {
                Swal.fire({
                    icon: "success",
                    title:
                        "Submitted Successfully!",
                    text:
                        result?.message ||
                        "Our team will contact you soon.",
                    confirmButtonText: "OK",
                    confirmButtonColor:
                        "#c01f53",
                });
            }, 150);
        } catch (error) {
            setSubmitting(false);

            console.error(
                "Counselling form error:",
                error
            );

            await Swal.fire({
                icon: "error",
                title: "Submission Failed",
                text:
                    error instanceof Error
                        ? error.message
                        : "Please try again.",
                confirmButtonText: "OK",
                confirmButtonColor:
                    "#631A33",
            });
        }
    };
    const destinationLoading =
        destinationsLoading ||
        destinationsFetching;

    return (
        <div
            className="rounded-[30px] border border-slate-100 bg-white p-5 shadow-[0_24px_80px_rgba(15,23,42,0.1)] sm:p-8 lg:p-10"
        >
            <header>
                <span
                    className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-primary"
                >
                    <Headphones className="h-4 w-4" />

                    Free consultation
                </span>

                <h3
                    className="mt-4 font-nunito text-2xl font-extrabold text-darkPrimary sm:text-3xl"
                >
                    Get{" "}
                    <span className="text-primary">
                        free
                    </span>{" "}
                    counselling today
                </h3>

                <p
                    className="mt-2 text-sm leading-7 text-slate-600"
                >
                    Complete the form and our
                    study abroad counsellors
                    will contact you.
                </p>
            </header>

            <form
                className="mt-8 space-y-5"
                onSubmit={handleSubmit}
                noValidate
            >
                <div className="grid gap-5 sm:grid-cols-2">
                    <InputField
                        name="firstname"
                        label="First name *"
                        value={
                            formData.firstname
                        }
                        onChange={
                            handleInputChange
                        }
                        icon={
                            <UserRound className="h-4 w-4" />
                        }
                        placeholder="Enter first name"
                        autoComplete="given-name"
                        error={
                            errors.firstname
                        }
                    />

                    <InputField
                        name="lastname"
                        label="Last name *"
                        value={
                            formData.lastname
                        }
                        onChange={
                            handleInputChange
                        }
                        icon={
                            <UserRound className="h-4 w-4" />
                        }
                        placeholder="Enter last name"
                        autoComplete="family-name"
                        error={
                            errors.lastname
                        }
                    />
                </div>

                <InputField
                    name="email"
                    type="email"
                    label="Email address *"
                    value={formData.email}
                    onChange={
                        handleInputChange
                    }
                    icon={
                        <Mail className="h-4 w-4" />
                    }
                    placeholder="Enter your email"
                    autoComplete="email"
                    error={errors.email}
                />

                <div>
                    <label
                        htmlFor="mobile"
                        className="mb-2 block text-sm font-bold text-slate-800"
                    >
                        Mobile number *
                    </label>

                    <div
                        className={cn(`
                            overflow-hidden
                            rounded-xl border
                            bg-white
                            transition
                            focus-within:ring-2
                            focus-within:ring-primary/20
                            ${errors.mobile
                                ? "border-red-500"
                                : "border-slate-200 focus-within:border-primary"
                            }
                        `)}
                    >
                        <PhoneInput
                            defaultCountry="in"
                            value={mobile}
                            onChange={(
                                phone
                            ) => {
                                setMobile(
                                    phone
                                );

                                clearFieldError(
                                    "mobile"
                                );
                            }}
                            inputProps={{
                                id: "mobile",
                                name: "mobile",
                                autoComplete:
                                    "tel",
                                "aria-invalid":
                                    Boolean(
                                        errors.mobile
                                    ),
                            }}
                            className="w-full"
                            inputClassName="
                                !h-12 !w-full
                                !border-0
                                !bg-transparent
                                !text-sm
                                !text-slate-800
                                !outline-none
                            "
                        />
                    </div>

                    {errors.mobile && (
                        <p
                            role="alert"
                            className="mt-1.5 text-xs font-medium text-red-600"
                        >
                            {errors.mobile}
                        </p>
                    )}
                </div>

                {destinationsError && (
                    <div
                        role="alert"
                        className="flex items-center justify-between gap-4 rounded-xl border border-red-100 bg-red-50 p-3"
                    >
                        <p className="text-xs font-medium text-red-700">
                            Unable to load
                            destinations.
                        </p>

                        <button
                            type="button"
                            onClick={() =>
                                refetchDestinations()
                            }
                            className="shrink-0 text-xs font-bold text-primary underline"
                        >
                            Retry
                        </button>
                    </div>
                )}

                <div className="grid gap-5 sm:grid-cols-2">
                    <SelectField
                        name="destination"
                        label="Preferred destination *"
                        value={
                            formData.destination
                        }
                        onChange={
                            handleSelectChange
                        }
                        icon={
                            <Globe2 className="h-4 w-4" />
                        }
                        options={
                            destinationOptions
                        }
                        loading={
                            destinationLoading
                        }
                        disabled={
                            destinationsError
                        }
                        error={
                            errors.destination
                        }
                    />

                    <SelectField
                        name="starttime"
                        label="When would you like to start? *"
                        value={
                            formData.starttime
                        }
                        onChange={
                            handleSelectChange
                        }
                        icon={
                            <CalendarDays className="h-4 w-4" />
                        }
                        options={
                            START_OPTIONS
                        }
                        error={
                            errors.starttime
                        }
                    />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                    <SelectField
                        name="nearestidp"
                        label="Nearest Medcity office *"
                        value={
                            formData.nearestidp
                        }
                        onChange={
                            handleSelectChange
                        }
                        icon={
                            <MapPin className="h-4 w-4" />
                        }
                        options={
                            OFFICE_OPTIONS
                        }
                        error={
                            errors.nearestidp
                        }
                    />

                    <SelectField
                        name="modeofcounselling"
                        label="Counselling mode *"
                        value={
                            formData.modeofcounselling
                        }
                        onChange={
                            handleSelectChange
                        }
                        icon={
                            <Headphones className="h-4 w-4" />
                        }
                        options={
                            COUNSELLING_MODE_OPTIONS
                        }
                        error={
                            errors.modeofcounselling
                        }
                    />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                    <SelectField
                        name="studylevel"
                        label="Preferred study level *"
                        value={
                            formData.studylevel
                        }
                        onChange={
                            handleSelectChange
                        }
                        icon={
                            <GraduationCap className="h-4 w-4" />
                        }
                        options={
                            STUDY_LEVEL_OPTIONS
                        }
                        error={
                            errors.studylevel
                        }
                    />

                    <SelectField
                        name="fund"
                        label="Funding option *"
                        value={
                            formData.fund
                        }
                        onChange={
                            handleSelectChange
                        }
                        icon={
                            <WalletCards className="h-4 w-4" />
                        }
                        options={
                            FUND_OPTIONS
                        }
                        error={errors.fund}
                    />
                </div>

                <button
                    type="submit"
                    disabled={submitting}
                    className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-darkPrimary px-6 py-3 text-sm font-bold text-white shadow-[0_14px_30px_rgba(192,31,83,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_38px_rgba(192,31,83,0.35)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {submitting
                        ? "Submitting..."
                        : "Request Free Counselling"}

                    {!submitting && (
                        <Send
                            aria-hidden="true"
                            className="h-4 w-4 transition-transform group-hover:translate-x-1"
                        />
                    )}
                </button>

                <p className="text-center text-xs leading-5 text-slate-500">
                    By submitting this form, you
                    agree to be contacted by
                    Medcity Study Abroad regarding
                    your enquiry.
                </p>
            </form>
        </div>
    );
};

export default CounsellingForm;