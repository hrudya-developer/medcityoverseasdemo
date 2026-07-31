import StudyAbroadBackground from "./StudyAbroadBackground";
import StudyAbroadContent from "./StudyAbroadContent";
import StudyAbroadVisual from "./StudyAbroadVisual";
import CounsellingCard from "./CounsellingCard";

const StudyAbroadIntro = () => {
    return (
        <div
            className="
        relative flex min-h-[640px]
        flex-col overflow-hidden
        rounded-[32px]
        border border-white/10
        bg-gradient-to-br
        from-[#16060c]
        via-darkPrimary
        to-[#0d111d]
        p-6 text-white
        shadow-[0_30px_90px_rgba(24,6,15,0.38)]
        sm:p-8
        lg:min-h-[660px]
      "
        >
            <StudyAbroadBackground />

            <StudyAbroadContent />

            <StudyAbroadVisual />

            <CounsellingCard />
        </div>
    );
};

export default StudyAbroadIntro;