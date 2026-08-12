"use client";

import {
  BookOpen,
  CalendarDays,
  Edit,
  GraduationCap,
  Headphones,
  IdCard,
  Mail,
  MapPin,
  Percent,
  Phone,
  User,
} from "lucide-react";

const student = {
  name: "Hrudya",
  email: "hrudya@example.com",
  phone: "+91 98765 43210",
  dob: "12 May 2001",
  gender: "Female",
  place: "Kozhikode, Kerala",
};

const qualifications = [
  {
    icon: GraduationCap,
    label: "Highest Qualification",
    value: "Bachelor's Degree",
    color: "#c01f53",
  },
  {
    icon: BookOpen,
    label: "Tenth Syllabus",
    value: "CBSE",
    color: "#7c3aed",
  },
  {
    icon: Percent,
    label: "Tenth Overall",
    value: "92%",
    color: "#f97316",
  },
  {
    icon: BookOpen,
    label: "Twelfth Stream",
    value: "Science",
    color: "#0466AF",
  },
  {
    icon: Percent,
    label: "Twelfth Overall",
    value: "89%",
    color: "#22c55e",
  },
  {
    icon: Percent,
    label: "Twelfth English",
    value: "91%",
    color: "#ec4899",
  },
  {
    icon: GraduationCap,
    label: "Degree Stream",
    value: "Computer Science",
    color: "#0f766e",
  },
  {
    icon: Percent,
    label: "Degree Overall",
    value: "83%",
    color: "#ca8a04",
  },
  {
    icon: Headphones,
    label: "IELTS Overall",
    value: "7.5",
    color: "#c01f53",
  },
  {
    icon: Headphones,
    label: "IELTS Listening",
    value: "8.0",
    color: "#7c3aed",
  },
  {
    icon: Headphones,
    label: "IELTS Reading",
    value: "7.5",
    color: "#0466AF",
  },
  {
    icon: Headphones,
    label: "IELTS Speaking",
    value: "7.0",
    color: "#22c55e",
  },
];

function InfoCard({ icon: Icon, label, value, color }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200/70 bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_15px_40px_rgba(15,23,42,0.08)]">
      {/* subtle decoration */}
      <div
        className="absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-[0.05] transition-transform duration-500 group-hover:scale-125"
        style={{ backgroundColor: color }}
      />

      <div className="relative">
        <div className="mb-5 flex items-start justify-between">
          <div
            className="grid h-12 w-12 place-items-center rounded-2xl"
            style={{
              backgroundColor: `${color}12`,
              color,
            }}
          >
            <Icon size={21} strokeWidth={2} />
          </div>

          <div
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: color }}
          />
        </div>

        <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400">
          {label}
        </p>

        <p className="mt-2 break-words text-base font-bold text-slate-900">
          {value}
        </p>
      </div>
    </div>
  );
}

export default function StudentProfilePage() {
  const profileRows = [
    {
      icon: IdCard,
      label: "Student Name",
      value: student.name,
      color: "#c01f53",
    },
    {
      icon: Mail,
      label: "Email Address",
      value: student.email,
      color: "#7c3aed",
    },
    {
      icon: Phone,
      label: "Contact Number",
      value: student.phone,
      color: "#22c55e",
    },
    {
      icon: CalendarDays,
      label: "Date of Birth",
      value: student.dob,
      color: "#f97316",
    },
    {
      icon: User,
      label: "Gender",
      value: student.gender,
      color: "#ec4899",
    },
    {
      icon: MapPin,
      label: "Location",
      value: student.place,
      color: "#0466AF",
    },
  ];

  return (
    <section className="space-y-7">
      {/* PROFILE HERO */}
      <div className="relative overflow-hidden rounded-[30px] border border-white/50 bg-gradient-to-br from-[#fff1f5] via-white to-[#edf7ff] shadow-[0_10px_40px_rgba(15,23,42,0.06)]">
        {/* Decorative blobs */}
        <div className="absolute -left-16 -top-20 h-64 w-64 rounded-full bg-[#c01f53]/10 blur-3xl" />

        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#0466AF]/10 blur-3xl" />

        {/* Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.025)_1px,transparent_1px)] bg-[size:28px_28px]" />

        <div className="relative p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col items-center gap-7 md:flex-row">
            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="absolute inset-0 scale-110 rounded-full bg-gradient-to-br from-[#c01f53] to-[#0466AF] opacity-20 blur-xl" />

              <div className="relative grid h-32 w-32 place-items-center rounded-full border-[6px] border-white bg-gradient-to-br from-[#c01f53] via-[#8f2550] to-[#631A33] text-4xl font-black text-white shadow-xl sm:h-36 sm:w-36">
                H
              </div>

              <span className="absolute bottom-2 right-2 h-7 w-7 rounded-full border-4 border-white bg-emerald-500" />
            </div>

            {/* Details */}
            <div className="flex-1 text-center md:text-left">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#c01f53]/10 bg-[#c01f53]/5 px-3 py-1.5 text-xs font-bold text-[#c01f53]">
                <span className="h-2 w-2 rounded-full bg-[#c01f53]" />
                STUDENT PROFILE
              </div>

              <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                Welcome back,{" "}
                <span className="text-[#c01f53]">{student.name}</span>
                <span className="ml-2">👋</span>
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                Keep your personal and academic information up to date to receive
                better study-abroad recommendations.
              </p>
            </div>

            {/* Decorative profile completeness */}
            <div className="hidden min-w-[170px] rounded-2xl border border-white/70 bg-white/75 p-4 shadow-sm backdrop-blur-xl lg:block">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">
                  Profile Status
                </span>

                <span className="text-xs font-black text-[#c01f53]">85%</span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full w-[85%] rounded-full bg-gradient-to-r from-[#c01f53] to-[#0466AF]" />
              </div>

              <p className="mt-3 text-[11px] leading-4 text-slate-400">
                Complete your profile for better recommendations.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* PERSONAL INFORMATION */}
      <div className="rounded-[28px] border border-slate-200/70 bg-[#f8fafc] p-5 shadow-sm sm:p-7">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#c01f53]">
              Personal Information
            </p>

            <h2 className="mt-1 text-2xl font-black text-slate-950">
              My Profile
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Your basic student information.
            </p>
          </div>

          <button
            type="button"
            className="group flex h-11 w-11 items-center justify-center rounded-full bg-[#c01f53] text-white shadow-[0_7px_20px_rgba(192,31,83,0.25)] transition hover:-translate-y-0.5 hover:bg-[#a81948]"
            aria-label="Edit profile"
          >
            <Edit
              size={17}
              className="transition-transform group-hover:rotate-[-8deg]"
            />
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {profileRows.map((item) => (
            <InfoCard key={item.label} {...item} />
          ))}
        </div>
      </div>

      {/* QUALIFICATIONS */}
      <div className="rounded-[28px] border border-slate-200/70 bg-[#f8fafc] p-5 shadow-sm sm:p-7">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#0466AF]">
              Academic Background
            </p>

            <h2 className="mt-1 text-2xl font-black text-slate-950">
              Qualification Details
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Academic qualifications and language proficiency.
            </p>
          </div>

          <button
            type="button"
            className="group flex h-11 w-11 items-center justify-center rounded-full bg-[#0466AF] text-white shadow-[0_7px_20px_rgba(4,102,175,0.25)] transition hover:-translate-y-0.5 hover:bg-[#035894]"
            aria-label="Edit qualification"
          >
            <Edit
              size={17}
              className="transition-transform group-hover:rotate-[-8deg]"
            />
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {qualifications.map((item) => (
            <InfoCard key={item.label} {...item} />
          ))}
        </div>
      </div>

      {/* ACCOUNT SETTINGS */}
      <div className="relative overflow-hidden rounded-[28px] border border-red-100 bg-gradient-to-r from-red-50 via-white to-red-50 p-5 sm:p-7">
        <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-red-100/60 blur-3xl" />

        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-red-500">
              Account Settings
            </p>

            <h3 className="mt-1 text-xl font-black text-slate-950">
              Manage your account
            </h3>

            <p className="mt-1 max-w-xl text-sm leading-6 text-slate-500">
              Account removal permanently deletes your student account and
              associated information.
            </p>
          </div>

          <button
            type="button"
            className="shrink-0 rounded-xl border border-red-200 bg-white px-5 py-3 text-sm font-bold text-red-600 shadow-sm transition hover:bg-red-50"
          >
            Delete Account
          </button>
        </div>
      </div>
    </section>
  );
}