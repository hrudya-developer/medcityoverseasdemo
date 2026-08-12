import Image from "next/image";
import {
  ArrowRight,
  BookOpen,
  FileText,
  GraduationCap,
  Heart,
  MapPin,
  University,
} from "lucide-react";

const courses = [
  { title: "Nursing", subtitle: "Build a rewarding career in healthcare.", image: "/images/nursing.jpg" },
  { title: "MBBS", subtitle: "Begin your journey in modern medicine.", image: "/images/mbbs.jpg" },
  { title: "Engineering", subtitle: "Innovate. Design. Build a better tomorrow.", image: "/images/engineering.jpg" },
];

const destinations = [
  { name: "Canada", image: "/images/canada.jpg", flag: "🇨🇦" },
  { name: "Finland", image: "/images/finland.jpg", flag: "🇫🇮" },
  { name: "Lithuania", image: "/images/lithuania.jpg", flag: "🇱🇹" },
  { name: "Australia", image: "/images/australia.jpg", flag: "🇦🇺" },
];

const universities = [
  ["PFH", "PFH Private University of Applied Sciences", "Göttingen, Germany"],
  ["ISM", "International School of Management", "Dortmund, Germany"],
  ["LU", "Lancaster University", "Leipzig, Germany"],
  ["IU", "International University of Applied Sciences—IU", "Thuringia, Germany"],
  ["SRH", "SRH University", "Berlin, Hamburg, Dresden"],
  ["UE", "University of Europe for Applied Sciences", "Berlin, Germany"],
  ["MU", "Macromedia University of Applied Sciences", "Berlin, Germany"],
  ["EU", "EU Business School", "Munich, Germany"],
  ["GISMA", "GISMA University of Applied Sciences", "Berlin, Germany"],
];

function SectionCard({ title, subtitle, icon: Icon, children, action = true }) {
  return (
    <section className="rounded-[28px] border border-slate-100 bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-5 flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-pink-50 text-[#d51a62]">
            <Icon size={20} />
          </div>
          <div>
            <h2 className="text-lg font-black text-[#111943] sm:text-xl">{title}</h2>
            <p className="mt-1 text-xs font-medium text-slate-400 sm:text-sm">{subtitle}</p>
          </div>
        </div>
        {action && <button className="hidden rounded-full border border-slate-200 px-4 py-2 text-xs font-bold text-indigo-600 sm:block">View All</button>}
      </div>
      {children}
    </section>
  );
}

export default function StudentDashboardPage() {
  return (
    <div className="mx-auto w-full max-w-[1500px] space-y-5 sm:space-y-6">
      <section className="relative min-h-[270px] overflow-hidden rounded-[30px] bg-[#111943] shadow-sm sm:min-h-[320px]">
        <Image src="/assets/study-abroad-student.png" alt="Study abroad destination" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050816]/95 via-[#17203d]/70 to-transparent" />
        <div className="relative flex min-h-[270px] items-center p-6 sm:min-h-[320px] sm:p-8 lg:p-10">
          <div className="max-w-xl">
            <p className="text-sm font-semibold text-white/90 sm:text-base">Welcome back, <span className="font-black">HRUDYA</span> 👋</p>
            <h1 className="mt-4 text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
              Your Dream,<br /><span className="text-[#ff2c75]">Our Guidance</span>
            </h1>
            <p className="mt-3 text-sm text-white/80 sm:text-base">Discover. Learn. Achieve.</p>
            <button className="mt-6 inline-flex items-center gap-3 rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#111943] shadow-lg">
              Find a Course <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          [FileText, "My Applications", "0", "Track submitted applications", "from-rose-50 to-white"],
          [Heart, "My Wishlist", "0", "Saved courses for later", "from-purple-50 to-white"],
          [BookOpen, "Find Courses", "Explore", "Search courses globally", "from-sky-50 to-white"],
          [GraduationCap, "Counselling", "Book Now", "Get expert guidance from our counsellors", "from-emerald-50 to-white"],
        ].map(([Icon, title, value, text, gradient]) => (
          <div key={title} className={`rounded-3xl border border-slate-100 bg-gradient-to-br ${gradient} p-5 shadow-sm sm:p-6`}>
            <div className="flex items-start justify-between">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-[#d51a62] shadow-sm"><Icon size={22} /></div>
              <ArrowRight size={17} className="text-slate-300" />
            </div>
            <p className="mt-5 text-sm font-black text-[#111943]">{title}</p>
            <p className="mt-2 text-2xl font-black text-indigo-600">{value}</p>
            <p className="mt-2 text-xs font-medium leading-5 text-slate-500">{text}</p>
          </div>
        ))}
      </section>

      <SectionCard title="Popular Courses" subtitle="Explore trending courses selected for students." icon={BookOpen}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {courses.map((course) => (
            <article key={course.title} className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">
              <div className="relative h-48 bg-slate-100">
                <Image src={course.image} alt={course.title} fill className="object-cover" />
              </div>
              <div className="p-5">
                <h3 className="text-base font-black text-[#111943]">{course.title}</h3>
                <p className="mt-2 text-xs leading-5 text-slate-500">{course.subtitle}</p>
                <button className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-indigo-600">Explore <ArrowRight size={15} /></button>
              </div>
            </article>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Destinations" subtitle="Pick your preferred country" icon={MapPin}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {destinations.map((item) => (
            <div key={item.name} className="relative h-44 overflow-hidden rounded-2xl bg-slate-100">
              <Image src={item.image} alt={item.name} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
              <div className="absolute left-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-white text-xl shadow">{item.flag}</div>
              <p className="absolute bottom-4 left-4 text-lg font-black text-white">{item.name}</p>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Top Universities & Colleges" subtitle="Discover and connect with top global institutions." icon={University}>
        <div className="mb-5 flex gap-2 overflow-x-auto pb-2">
          {["Germany", "Austria", "USA", "Australia", "Malta", "UK", "Ireland", "New Zealand", "France"].map((country, i) => (
            <button key={country} className={`shrink-0 rounded-full border px-4 py-2 text-xs font-bold ${i === 0 ? "border-[#d51a62] bg-[#d51a62] text-white" : "border-slate-200 bg-white text-[#111943]"}`}>
              {country}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
          {universities.map(([abbr, name, location]) => (
            <article key={name} className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
              <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-slate-50 text-sm font-black text-indigo-700 ring-1 ring-slate-100">{abbr}</div>
              <div className="min-w-0">
                <h3 className="line-clamp-2 text-sm font-black leading-5 text-[#111943]">{name}</h3>
                <p className="mt-2 flex items-center gap-1 text-xs font-medium text-slate-500"><MapPin size={12} />{location}</p>
              </div>
            </article>
          ))}
        </div>
      </SectionCard>

      <section className="overflow-hidden rounded-[28px] bg-gradient-to-r from-[#101a4d] via-[#5b245a] to-[#d51a62] p-6 text-white shadow-sm sm:p-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="grid h-12 w-12 place-items-center rounded-xl border border-cyan-300/50 bg-white/10"><GraduationCap /></div>
            <div>
              <h2 className="text-xl font-black sm:text-2xl">Your Future, Our Mission</h2>
              <p className="mt-1 text-sm text-white/75">We’re here to help you achieve your dreams.</p>
            </div>
          </div>
          <button className="inline-flex w-fit items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#111943]">Explore Courses <ArrowRight size={16} /></button>
        </div>
      </section>
    </div>
  );
}