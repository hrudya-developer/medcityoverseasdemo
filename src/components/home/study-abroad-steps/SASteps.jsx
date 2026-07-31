import StudyAbroadIntro from "./study-abroad-info/StudyAbroadIntro";
import StudyAbroadStepsList from "./StudyAbroadStepsList";

const SASteps = () => {
    return (
        <section
            id="study-abroad-steps"
            aria-labelledby="study-abroad-steps-heading"
            className="
        relative isolate overflow-hidden
        bg-gradient-to-br
        from-white
        via-[#fff8fb]
        to-[#f4f8ff]
        px-4 py-12
        sm:px-6 sm:py-14
        lg:px-8 lg:py-16
      "
        >
            {/* Background pattern */}
            <div
                aria-hidden="true"
                className="
          absolute inset-0 -z-20
          bg-[radial-gradient(circle_at_center,rgba(192,31,83,0.06)_1px,transparent_1px)]
          bg-[size:26px_26px]
          opacity-60
        "
            />

            {/* Pink glow */}
            <div
                aria-hidden="true"
                className="
          absolute -left-32 top-10 -z-10
          h-80 w-80 rounded-full
          bg-primary/10 blur-[100px]
        "
            />

            {/* Blue glow */}
            <div
                aria-hidden="true"
                className="
          absolute -right-32 bottom-0 -z-10
          h-80 w-80 rounded-full
          bg-secondary/10 blur-[100px]
        "
            />

            <div
                className="
          mx-auto grid max-w-[1450px]
          grid-cols-1 gap-10
          lg:grid-cols-[0.88fr_1.12fr]
          lg:items-center lg:gap-12
          xl:gap-16
        "
            >
                <StudyAbroadIntro />
                <StudyAbroadStepsList />
            </div>
        </section>
    );
};

export default SASteps;