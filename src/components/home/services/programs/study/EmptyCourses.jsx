export default function EmptyCourses() {
    return (
        <p
            role="status"
            className="
                rounded-3xl
                border
                border-slate-200
                bg-gradient-to-br
                from-white
                via-[#fff8fb]
                to-[#eef7ff]
                px-5
                py-12
                text-center
                text-sm
                font-semibold
                text-slate-600
                shadow-sm
            "
        >
            No popular courses are available at the moment.
        </p>
    );
}