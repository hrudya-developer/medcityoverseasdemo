import {
    Clock,
    GraduationCap,
    MapPin,
    Wallet,
  } from "lucide-react";
  
  function Info({
    icon: Icon,
    label,
    value,
  }) {
    return (
      <div className="rounded-xl bg-slate-50 p-3">
        <div className="mb-2 flex items-center gap-2">
          <div className="grid h-7 w-7 place-items-center rounded-lg bg-white text-[#c01f53]">
            <Icon
              size={13}
            />
          </div>
  
          <span className="text-[9px] font-black uppercase text-slate-400">
            {label}
          </span>
        </div>
  
        <p className="truncate text-xs font-bold text-slate-800">
          {value || "N/A"}
        </p>
      </div>
    );
  }
  
  export default function CourseCard({
    course,
  }) {
    const name =
      course?.course ||
      course?.course_name ||
      course?.name ||
      "Course";
  
    const university =
      course?.university ||
      course?.university_name ||
      "University";
  
    const country =
      course?.country ||
      course?.destination ||
      "";
  
    const level =
      course?.level ||
      "N/A";
  
    const duration =
      course?.duration ||
      "N/A";
  
    const fees =
      course?.fees
        ? `${course?.currency || ""} ${course.fees}`.trim()
        : "N/A";
  
    return (
      <article className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
        <div className="flex gap-4">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-[#c01f53] to-[#631A33] text-white">
            <GraduationCap
              size={21}
            />
          </div>
  
          <div className="min-w-0">
            <p className="text-[10px] font-black uppercase text-[#c01f53]">
              {level}
            </p>
  
            <h3 className="mt-1 text-base font-black">
              {name}
            </h3>
  
            <p className="mt-1 text-sm text-slate-500">
              {university}
            </p>
  
            {country && (
              <p className="mt-1 flex items-center gap-1 text-xs text-slate-400">
                <MapPin
                  size={12}
                />
  
                {country}
              </p>
            )}
          </div>
        </div>
  
        <div className="mt-5 grid grid-cols-3 gap-2">
          <Info
            icon={
              GraduationCap
            }
            label="Level"
            value={level}
          />
  
          <Info
            icon={Clock}
            label="Duration"
            value={
              duration
            }
          />
  
          <Info
            icon={Wallet}
            label="Fees"
            value={fees}
          />
        </div>
      </article>
    );
  }