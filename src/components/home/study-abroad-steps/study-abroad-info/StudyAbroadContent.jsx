import {
    CheckCircle2,
} from "lucide-react";

import StudyAbroadStats from "./StudyAbroadStats";
import { supportPoints } from "./studyAbroadData";

const StudyAbroadContent = () => {
    return (
        <div
            className="
        relative z-20
        mx-auto w-full max-w-xl
        text-center
        lg:mx-0 lg:text-left
      "
        >
            <div
                className="
          mb-5 inline-flex
          items-center justify-center
          gap-2.5 rounded-full
          border border-logoYellow/25
          bg-logoYellow/10
          px-4 py-2
          backdrop-blur-md
        "
            >
                <span
                    aria-hidden="true"
                    className="
            relative flex h-2.5 w-2.5
            items-center justify-center
          "
                >
                    <span
                        className="
              absolute h-full w-full
              animate-ping rounded-full
              bg-logoYellow/50
            "
                    />

                    <span
                        className="
              relative h-2 w-2
              rounded-full bg-logoYellow
            "
                    />
                </span>

                <p
                    className="
            text-[11px] font-extrabold
            uppercase tracking-[0.18em]
            text-logoYellow sm:text-xs
          "
                >
                    Study Abroad Journey
                </p>
            </div>

            <h2
                id="study-abroad-steps-heading"
                className="
          mx-auto max-w-2xl
          font-nunito text-3xl
          font-extrabold leading-[1.08]
          text-white
          sm:text-4xl
          lg:mx-0 lg:text-[46px]
        "
            >
                Your Path to{" "}
                <span
                    className="
            bg-gradient-to-r
            from-logoYellow
            via-white
            to-[#8ac8ff]
            bg-clip-text
            text-transparent
          "
                >
                    Global Education
                </span>
            </h2>

            <p
                className="
          mx-auto mt-5 max-w-xl
          text-sm leading-7
          text-white/70
          sm:text-base sm:leading-8
          lg:mx-0
        "
            >
                From choosing the right destination and university to
                applications, visas and travel preparation, we guide you through
                every important stage of your study abroad journey.
            </p>

            <div
                className="
          mx-auto mt-5 flex
          max-w-md flex-wrap
          justify-center
          gap-x-5 gap-y-3
          lg:mx-0 lg:justify-start
        "
            >
                {supportPoints.map((point) => (
                    <div
                        key={point}
                        className="
              flex items-center gap-2
              text-xs text-white/70
              sm:text-sm
            "
                    >
                        <CheckCircle2
                            aria-hidden="true"
                            className="
                h-4 w-4 shrink-0
                text-logoYellow
              "
                        />

                        {point}
                    </div>
                ))}
            </div>

            <StudyAbroadStats />
        </div>
    );
};

export default StudyAbroadContent;