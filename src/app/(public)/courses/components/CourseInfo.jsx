export default function CourseInfo({
    icon: Icon,
    label,
    value,
  }) {
    return (
      <div className="min-w-0 rounded-xl bg-slate-50 p-3">
        <div className="mb-2 flex items-center gap-2">
          <div className="grid h-7 w-7 place-items-center rounded-lg bg-white text-[#c01f53] shadow-sm">
            <Icon size={13} />
          </div>
  
          <span className="truncate text-[9px] font-black uppercase text-slate-400">
            {label}
          </span>
        </div>
  
        <p className="truncate text-xs font-bold text-slate-800">
          {value || "N/A"}
        </p>
      </div>
    );
  }