"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Swal from "sweetalert2";

import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Home,
  ShieldCheck,
  Sparkles,
  User,
} from "lucide-react";

import { PhoneInput } from "react-international-phone";

import "react-international-phone/style.css";

export default function SetUserProfilePage() {
  const router = useRouter();

  const [uid, setUid] = useState(null);
  const [email, setEmail] = useState("");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [countryCode, setCountryCode] = useState("in");
  const [dialCode, setDialCode] = useState("91");

  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("Female");
  const [dob, setDob] = useState("");

  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  // Get OTP/login data from sessionStorage
  useEffect(() => {
    try {
      const storedAuth = sessionStorage.getItem("auth");

      if (!storedAuth) {
        router.replace("/login");
        return;
      }

      const auth = JSON.parse(storedAuth);

      if (!auth?.uid) {
        router.replace("/login");
        return;
      }

      setUid(auth.uid);
      setEmail(auth.email || "");
    } catch (error) {
      console.error("Unable to read auth session:", error);
      router.replace("/login");
    } finally {
      setPageLoading(false);
    }
  }, [router]);

  const validateForm = () => {
    if (!name.trim() || name.trim().length < 3) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Name",
        text: "Please enter your full name.",
        confirmButtonColor: "#c01f53",
      });

      return false;
    }

    const phoneDigits = phone.replace(/\D/g, "");

    if (!phone || phoneDigits.length < 4) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Phone",
        text: "Please enter a valid phone number.",
        confirmButtonColor: "#c01f53",
      });

      return false;
    }

    if (!dob) {
      Swal.fire({
        icon: "warning",
        title: "Date of Birth Required",
        text: "Please select your date of birth.",
        confirmButtonColor: "#c01f53",
      });

      return false;
    }

    const today = new Date();
    const selectedDob = new Date(dob);

    let age = today.getFullYear() - selectedDob.getFullYear();

    const monthDifference = today.getMonth() - selectedDob.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 &&
        today.getDate() < selectedDob.getDate())
    ) {
      age--;
    }

    if (age < 16) {
      Swal.fire({
        icon: "warning",
        title: "Age Restriction",
        text: "You must be at least 16 years old.",
        confirmButtonColor: "#c01f53",
      });

      return false;
    }

    if (!address.trim() || address.trim().length < 10) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Address",
        text: "Please enter your complete address.",
        confirmButtonColor: "#c01f53",
      });

      return false;
    }

    if (!acceptedTerms) {
      Swal.fire({
        icon: "warning",
        title: "Accept Terms",
        text: "Please accept the terms and conditions.",
        confirmButtonColor: "#c01f53",
      });

      return false;
    }

    if (!uid) {
      Swal.fire({
        icon: "error",
        title: "Session Expired",
        text: "Please login again.",
        confirmButtonColor: "#c01f53",
      });

      router.replace("/login");

      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      const response = await fetch("/api/student/profile", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          uid,
          name: name.trim(),
          mobile: phone,
          country: countryCode,
          code: dialCode,
          address: address.trim(),
          gender,
          dob,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result?.status) {
        throw new Error(
          result?.message ||
            result?.msg ||
            "Unable to create your profile."
        );
      }

      // Replace your previous Redux userRegister logic
      const user = {
        uid,
        name: name.trim(),
        mobile: phone,
        country: countryCode,
        code: dialCode,
        address: address.trim(),
        gender,
        dob,
        email,
        isLoggedIn: true,
      };

      sessionStorage.setItem(
        "auth",
        JSON.stringify({
          user,
          uid,
          email,
          name: name.trim(),
          isLoggedIn: true,
        })
      );

      await Swal.fire({
        icon: "success",
        title: "Profile Created",
        text: "Welcome to Medcity Study Abroad.",
        confirmButtonColor: "#c01f53",
      });

      router.replace("/dashboard/students");
    } catch (error) {
      console.error("Profile creation failed:", error);

      Swal.fire({
        icon: "error",
        title: "Unable to Continue",
        text: error.message || "Something went wrong. Please try again.",
        confirmButtonColor: "#c01f53",
      });
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#f7f8fc]">
        <div className="flex items-center gap-3 text-[#631A33]">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#c01f53]/20 border-t-[#c01f53]" />

          <span className="font-semibold">
            Preparing your profile...
          </span>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7f8fc] px-4 py-8 sm:px-6 lg:px-8">
      {/* Decorative background */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#c01f53]/10 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[#0466AF]/10 blur-3xl" />

      <div className="relative mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl overflow-hidden rounded-[32px] border border-white/80 bg-white shadow-[0_30px_100px_rgba(15,23,42,0.12)] lg:grid-cols-[0.85fr_1.15fr]">
        {/* Left section */}
        <section className="relative hidden overflow-hidden bg-[#631A33] p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(192,31,83,0.65),transparent_45%)]" />

          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-[#0466AF]/30 blur-3xl" />

          <div className="relative">
            <div className="mb-10 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold backdrop-blur">
              <Sparkles size={15} className="text-[#F7EC22]" />

              Almost there
            </div>

            <h1 className="max-w-md text-4xl font-black leading-tight xl:text-5xl">
              Complete your
              <span className="block text-[#F7EC22]">
                student profile.
              </span>
            </h1>

            <p className="mt-6 max-w-md text-sm leading-7 text-white/70">
              Tell us a little about yourself so we can personalize
              your study abroad experience and recommendations.
            </p>
          </div>

          <div className="relative space-y-4">
            <Feature
              icon={CheckCircle2}
              title="Personalized Recommendations"
              text="Discover courses and universities that match your profile."
            />

            <Feature
              icon={ShieldCheck}
              title="Secure Information"
              text="Your details are used to improve your student experience."
            />
          </div>
        </section>

        {/* Form */}
        <section className="flex items-center p-5 sm:p-8 lg:p-12">
          <div className="mx-auto w-full max-w-2xl">
            <div className="mb-8">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#c01f53]/10 text-[#c01f53]">
                <User size={22} />
              </div>

              <h2 className="text-2xl font-black text-[#631A33] sm:text-3xl">
                Create Your Profile
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Enter your personal information to continue to your
                student dashboard.
              </p>

              {email && (
                <div className="mt-4 rounded-xl border border-[#0466AF]/10 bg-[#0466AF]/5 px-4 py-3">
                  <p className="text-xs font-semibold text-slate-500">
                    Signed in as
                  </p>

                  <p className="mt-0.5 text-sm font-bold text-[#0466AF]">
                    {email}
                  </p>
                </div>
              )}
            </div>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 gap-5 md:grid-cols-2"
            >
              {/* Full name */}
              <div className="md:col-span-2">
                <FormLabel>Full Name</FormLabel>

                <div className="mt-2 flex h-14 items-center rounded-xl border border-slate-200 bg-white px-4 transition focus-within:border-[#c01f53] focus-within:ring-4 focus-within:ring-[#c01f53]/10">
                  <User size={18} className="shrink-0 text-slate-400" />

                  <input
                    type="text"
                    value={name}
                    onChange={(event) =>
                      setName(event.target.value)
                    }
                    placeholder="Enter your full name"
                    className="h-full w-full bg-transparent px-3 text-sm font-medium outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Date of birth */}
              <div>
                <FormLabel>Date of Birth</FormLabel>

                <div className="mt-2 flex h-14 items-center rounded-xl border border-slate-200 bg-white px-4 transition focus-within:border-[#c01f53] focus-within:ring-4 focus-within:ring-[#c01f53]/10">
                  <CalendarDays
                    size={18}
                    className="shrink-0 text-slate-400"
                  />

                  <input
                    type="date"
                    value={dob}
                    onChange={(event) =>
                      setDob(event.target.value)
                    }
                    className="h-full w-full bg-transparent px-3 text-sm font-medium outline-none"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <FormLabel>Contact Number</FormLabel>

                <div className="mt-2 flex min-h-14 items-center rounded-xl border border-slate-200 bg-white px-3 transition focus-within:border-[#c01f53] focus-within:ring-4 focus-within:ring-[#c01f53]/10">
                  <PhoneInput
                    defaultCountry="in"
                    value={phone}
                    onChange={(value, meta) => {
                      setPhone(value);

                      setCountryCode(
                        meta?.country?.iso2 || "in"
                      );

                      setDialCode(
                        meta?.country?.dialCode || "91"
                      );
                    }}
                    className="w-full"
                    inputClassName="!h-12 !w-full !border-0 !bg-transparent !text-sm !shadow-none !outline-none"
                    countrySelectorStyleProps={{
                      buttonClassName:
                        "!h-12 !border-0 !bg-transparent",
                    }}
                  />
                </div>
              </div>

              {/* Gender */}
              <div className="md:col-span-2">
                <FormLabel>Gender</FormLabel>

                <div className="mt-2 grid grid-cols-3 gap-3">
                  {["Male", "Female", "Other"].map((item) => {
                    const selected = gender === item;

                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setGender(item)}
                        className={`rounded-xl border px-3 py-3.5 text-sm font-bold transition ${
                          selected
                            ? "border-[#c01f53] bg-[#c01f53] text-white shadow-md shadow-[#c01f53]/20"
                            : "border-slate-200 bg-white text-slate-600 hover:border-[#c01f53]/40 hover:bg-[#c01f53]/5"
                        }`}
                      >
                        {item}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Address */}
              <div className="md:col-span-2">
                <FormLabel>Address</FormLabel>

                <div className="mt-2 flex rounded-xl border border-slate-200 bg-white px-4 py-3 transition focus-within:border-[#c01f53] focus-within:ring-4 focus-within:ring-[#c01f53]/10">
                  <Home
                    size={18}
                    className="mt-1 shrink-0 text-slate-400"
                  />

                  <textarea
                    value={address}
                    onChange={(event) =>
                      setAddress(event.target.value)
                    }
                    placeholder="Enter your complete address"
                    rows={3}
                    className="w-full resize-none bg-transparent px-3 text-sm font-medium leading-6 outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Terms */}
              <label className="md:col-span-2 flex cursor-pointer items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(event) =>
                    setAcceptedTerms(event.target.checked)
                  }
                  className="mt-0.5 h-4 w-4 accent-[#c01f53]"
                />

                <span className="text-xs leading-5 text-slate-600">
                  I agree to the{" "}
                  <span className="font-bold text-[#c01f53]">
                    Terms & Conditions
                  </span>{" "}
                  and consent to the processing of my information.
                </span>
              </label>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="group flex h-14 items-center justify-center gap-3 rounded-xl bg-[#631A33] px-6 text-sm font-black text-white shadow-lg shadow-[#631A33]/15 transition hover:bg-[#c01f53] disabled:cursor-not-allowed disabled:opacity-60 md:col-span-2"
              >
                {loading ? (
                  <>
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                    Creating Profile...
                  </>
                ) : (
                  <>
                    Continue to Dashboard

                    <ArrowRight
                      size={18}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}

function FormLabel({ children }) {
  return (
    <label className="text-xs font-extrabold uppercase tracking-wide text-[#631A33]">
      {children}
    </label>
  );
}

function Feature({ icon: Icon, title, text }) {
  return (
    <div className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10">
        <Icon size={20} className="text-[#F7EC22]" />
      </div>

      <div>
        <p className="text-sm font-bold">{title}</p>

        <p className="mt-1 text-xs leading-5 text-white/60">
          {text}
        </p>
      </div>
    </div>
  );
}