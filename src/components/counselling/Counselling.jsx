"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import Select from "react-select";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

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

import counsellingImage from "@/assets/counselling.png";
import aeroplanePath from "@/assets/aeroplanePath.webp";

// Change this path only if your slice is stored elsewhere.
// import { fetchCountries } from "@/lib/redux/slices/countrySlice";

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

const getCountryName = (country) =>
    country?.name ||
    country?.title ||
    country?.destination ||
    country?.country_name ||
    country?.destination_name ||
    country?.country ||
    "";

const normalizeCountries = (data) => {
    if (!Array.isArray(data)) {
        return [];
    }

    return data.flatMap((item) => {
        if (Array.isArray(item)) {
            return normalizeCountries(item);
        }

        if (Array.isArray(item?.countries)) {
            return normalizeCountries(item.countries);
        }

        if (Array.isArray(item?.destinations)) {
            return normalizeCountries(item.destinations);
        }

        if (Array.isArray(item?.data)) {
            return normalizeCountries(item.data);
        }

        return [item];
    });
};

export default function Counselling() {
    const dispatch = useDispatch();

    const {
        countries = [],
        loading: countriesLoading = false,
    } = useSelector((state) => state.countryData || {});

    const { uid } = useSelector((state) => state.auth || {});
    const safeUid = uid ?? 0;

    const [formData, setFormData] = useState(INITIAL_FORM_DATA);
    const [mobile, setMobile] = useState("");
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (!countries.length) {
            dispatch(fetchCountries(safeUid));
        }
    }, [dispatch, safeUid, countries.length]);

    const destinationOptions = useMemo(() => {
        return normalizeCountries(countries)
            .map(getCountryName)
            .filter(Boolean)
            .filter(
                (country, index, countryList) =>
                    countryList.indexOf(country) === index
            );
    }, [countries]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previousData) => ({
            ...previousData,
            [name]: value,
        }));

        setErrors((previousErrors) => ({
            ...previousErrors,
            [name]: "",
        }));
    };

    const handleSelectChange = (name, value) => {
        setFormData((previousData) => ({
            ...previousData,
            [name]: value,
        }));

        setErrors((previousErrors) => ({
            ...previousErrors,
            [name]: "",
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.firstname.trim()) {
            newErrors.firstname = "First name is required";
        }

        if (!formData.lastname.trim()) {
            newErrors.lastname = "Last name is required";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email address is required";
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
        ) {
            newErrors.email = "Enter a valid email address";
        }

        const mobileDigits = mobile.replace(/\D/g, "");

        if (!mobile) {
            newErrors.mobile = "Mobile number is required";
        } else if (mobileDigits.length < 7) {
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
            newErrors.modeofcounselling =
                "Counselling mode is required";
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

        if (!validateForm()) {
            return;
        }

        setSubmitting(true);

        try {
            const response = await fetch("/api/enquiries", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...formData,
                    mobile,
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result?.message ||
                    "Something went wrong. Please try again."
                );
            }

            resetForm();

            await Swal.fire({
                icon: "success",
                title: "Submitted Successfully!",
                text: "Your enquiry has been submitted. Our team will contact you soon.",
                confirmButtonText: "OK",
                confirmButtonColor: "#071c4d",
            });
        } catch (error) {
            console.error("Enquiry submission error:", error);

            await Swal.fire({
                icon: "error",
                title: "Submission Failed",
                text:
                    error?.message ||
                    "Failed to submit enquiry. Please try again.",
                confirmButtonText: "OK",
                confirmButtonColor: "#071c4d",
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section
            id="gfc_wrapper"
            aria-labelledby="counselling-heading"
            className="w-full scroll-mt-28 bg-white py-10 lg:py-16"
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid items-center gap-8 lg:grid-cols-2">
                    <CounsellingVisual />

                    <div
                        className="
              rounded-[30px] bg-white p-6 shadow-xl
              sm:p-8 lg:p-10
            "
                    >
                        <h2
                            id="counselling-heading"
                            className="text-xl font-bold leading-tight text-[#071c4d]"
                        >
                            Get{" "}
                            <span className="text-primary">
                                FREE
                            </span>{" "}
                            Counselling Today!
                        </h2>

                        <div
                            aria-hidden="true"
                            className="mb-6 mt-5 h-1 w-14 rounded-full bg-primary"
                        />

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5"
                            noValidate
                        >
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
                                    className="mb-2 block text-sm font-semibold text-[#071c4d]"
                                >
                                    Mobile number*
                                </label>

                                <div
                                    className={`
                    rounded-lg border
                    ${errors.mobile
                                            ? "border-red-500"
                                            : "border-gray-300"
                                        }
                  `}
                                >
                                    <PhoneInput
                                        defaultCountry="in"
                                        value={mobile}
                                        onChange={(phone) => {
                                            setMobile(phone);

                                            setErrors((previousErrors) => ({
                                                ...previousErrors,
                                                mobile: "",
                                            }));
                                        }}
                                        inputProps={{
                                            id: "mobile",
                                            name: "mobile",
                                            required: true,
                                            autoComplete: "tel",
                                        }}
                                        className="w-full"
                                        inputClassName="
                      !w-full !border-0
                      !text-sm !outline-none
                    "
                                    />
                                </div>

                                {errors.mobile && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.mobile}
                                    </p>
                                )}
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <ReactSelectField
                                    name="destination"
                                    label="Your preferred study destination*"
                                    value={formData.destination}
                                    onChange={handleSelectChange}
                                    options={destinationOptions}
                                    loading={countriesLoading}
                                    icon={<Globe className="h-4 w-4" />}
                                    error={errors.destination}
                                />

                                <ReactSelectField
                                    name="starttime"
                                    label="When would you like to start?*"
                                    value={formData.starttime}
                                    onChange={handleSelectChange}
                                    options={[
                                        "Immediately",
                                        "Within 3 Months",
                                        "Within 6 Months",
                                        "Next Year",
                                    ]}
                                    icon={
                                        <CalendarDays className="h-4 w-4" />
                                    }
                                    error={errors.starttime}
                                />
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <ReactSelectField
                                    name="nearestidp"
                                    label="Nearest Medcity Office*"
                                    value={formData.nearestidp}
                                    onChange={handleSelectChange}
                                    options={[
                                        "Kochi",
                                        "Calicut",
                                        "Kannur",
                                        "Trivandrum",
                                    ]}
                                    icon={<MapPin className="h-4 w-4" />}
                                    error={errors.nearestidp}
                                />

                                <ReactSelectField
                                    name="modeofcounselling"
                                    label="Preferred mode of counselling*"
                                    value={formData.modeofcounselling}
                                    onChange={handleSelectChange}
                                    options={[
                                        "Online",
                                        "Offline",
                                        "Phone Call",
                                    ]}
                                    icon={
                                        <Headphones className="h-4 w-4" />
                                    }
                                    error={errors.modeofcounselling}
                                />
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <ReactSelectField
                                    name="studylevel"
                                    label="Preferred study level*"
                                    value={formData.studylevel}
                                    onChange={handleSelectChange}
                                    options={[
                                        "Bachelor's",
                                        "Master's",
                                        "Diploma",
                                        "PhD",
                                    ]}
                                    icon={
                                        <GraduationCap className="h-4 w-4" />
                                    }
                                    error={errors.studylevel}
                                />

                                <ReactSelectField
                                    name="fund"
                                    label="How would you fund your education?*"
                                    value={formData.fund}
                                    onChange={handleSelectChange}
                                    options={[
                                        "Self Funded",
                                        "Education Loan",
                                        "Scholarship",
                                        "Family Support",
                                    ]}
                                    icon={<Wallet className="h-4 w-4" />}
                                    error={errors.fund}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={submitting}
                                className="
                  rounded-lg bg-primary px-6 py-3
                  text-sm font-semibold text-white
                  transition-colors hover:bg-secondary
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
                            >
                                {submitting
                                    ? "Submitting..."
                                    : "Request Free Counselling"}
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
        <div
            className="
        relative flex min-h-[560px]
        flex-col justify-center overflow-hidden
        rounded-[30px] p-8
        lg:min-h-[700px]
      "
        >
            <Image
                src={counsellingImage}
                alt="Student receiving study abroad counselling"
                fill
                sizes="(max-width: 1023px) 100vw, 50vw"
                className="object-cover object-center"
            />

            <div
                aria-hidden="true"
                className="absolute inset-0 bg-black/80"
            />

            <div className="relative z-10 flex flex-col gap-10">
                <span
                    className="
            flex w-fit items-center gap-2
            rounded-full border border-white
            p-2 text-white
          "
                >
                    <Headphones
                        aria-hidden="true"
                        className="h-5 w-5"
                    />

                    <span className="text-sm font-bold">
                        Expert Guidance, Every Step
                    </span>
                </span>

                <h2
                    className="
            my-8 text-center font-nunito
            text-3xl font-extrabold
            leading-[1.2] text-white
            sm:text-4xl
            lg:text-left lg:text-5xl
          "
                >
                    Your Dream
                    <br />
                    University
                    <br />

                    <span
                        className="
              bg-gradient-to-r
              from-primary to-secondary
              bg-clip-text text-transparent
            "
                    >
                        Awaits You
                    </span>
                </h2>

                <div className="h-1 w-14 rounded-full bg-primary" />

                <p className="max-w-md text-lg leading-8 text-white">
                    We guide you at every step of your study abroad
                    journey.
                </p>
            </div>

            <div
                aria-hidden="true"
                className="
          absolute right-6 top-10 z-10
          hidden w-24 lg:block
        "
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
    return (
        <div>
            <label
                htmlFor={name}
                className="mb-2 block text-sm font-semibold text-[#071c4d]"
            >
                {label}
            </label>

            <div
                className={`
          flex items-center gap-3
          rounded-lg border px-4 py-2
          ${error
                        ? "border-red-500"
                        : "border-gray-300"
                    }
        `}
            >
                <span
                    aria-hidden="true"
                    className="text-gray-400"
                >
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
                    className="w-full bg-transparent text-sm outline-none"
                />
            </div>

            {error && (
                <p className="mt-1 text-xs text-red-500">
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
}) {
    const selectOptions = options.map((option) =>
        typeof option === "string"
            ? {
                label: option,
                value: option,
            }
            : option
    );

    const selectedValue = value
        ? selectOptions.find(
            (option) => option.value === value
        ) || {
            label: value,
            value,
        }
        : null;

    return (
        <div>
            <label
                htmlFor={name}
                className="mb-2 block text-sm font-semibold text-[#071c4d]"
            >
                {label}
            </label>

            <div
                className={`
          flex min-h-[42px] items-center gap-3
          rounded-lg border px-4
          ${error
                        ? "border-red-500"
                        : "border-gray-300"
                    }
        `}
            >
                <span
                    aria-hidden="true"
                    className="text-gray-400"
                >
                    {icon}
                </span>

                <div className="min-w-0 flex-1">
                    <Select
                        inputId={name}
                        instanceId={name}
                        name={name}
                        value={selectedValue}
                        onChange={(selectedOption) =>
                            onChange(
                                name,
                                selectedOption?.value || ""
                            )
                        }
                        options={selectOptions}
                        isSearchable
                        isDisabled={loading}
                        isLoading={loading}
                        placeholder={
                            loading ? "Loading..." : "Select option"
                        }
                        styles={{
                            control: (base) => ({
                                ...base,
                                minHeight: "40px",
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
                            indicatorSeparator: () => ({
                                display: "none",
                            }),
                            dropdownIndicator: (base) => ({
                                ...base,
                                padding: 0,
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
                <p className="mt-1 text-xs text-red-500">
                    {error}
                </p>
            )}
        </div>
    );
}