import { Sparkles } from "lucide-react";

import CounsellingButton from "../CounsellingButton";

const CounsellingCard = () => {
    return (
        <aside
            aria-label="Study abroad counselling support"
            className="
        absolute bottom-5
        left-5 right-5 z-30
        overflow-hidden
        rounded-[24px]
        border border-white/10
        bg-white/[0.08]
        p-4 text-white
        shadow-[0_20px_50px_rgba(0,0,0,0.3)]
        backdrop-blur-2xl
        sm:bottom-6 sm:left-6
        sm:right-6 sm:p-5
      "
        >
            <div
                aria-hidden="true"
                className="
          absolute -right-12
          -top-16 h-36 w-36
          rounded-full
          bg-primary/30 blur-3xl
        "
            />

            <div
                className="
          relative flex flex-col gap-4
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
            >
                <div
                    className="
            flex items-center gap-3
            text-center sm:text-left
          "
                >
                    <div
                        className="
              hidden h-10 w-10
              shrink-0 items-center
              justify-center
              rounded-2xl
              border border-logoYellow/20
              bg-logoYellow/10
              text-logoYellow
              sm:flex
            "
                    >
                        <Sparkles
                            aria-hidden="true"
                            className="h-5 w-5"
                        />
                    </div>

                    <div>
                        <h3
                            className="
                text-sm font-bold
                text-logoYellow
                sm:text-base
              "
                        >
                            Need expert guidance?
                        </h3>

                        <p
                            className="
                mt-1 text-xs
                leading-5 text-white/60
                sm:text-sm
              "
                        >
                            Speak with our counsellors and plan your next step.
                        </p>
                    </div>
                </div>

                <div className="flex justify-center sm:justify-end">
                    <CounsellingButton />
                </div>
            </div>
        </aside>
    );
};

export default CounsellingCard;