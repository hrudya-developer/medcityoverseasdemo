import BranchesClient from "./BranchesClient";
import BranchBackground from "./BranchBackground";
import BranchCallout from "./BranchCallout";
import BranchSectionHeader from "./BranchSectionHeader";

const OurBranches = () => {
    return (
        <section
            id="our-branches"
            aria-labelledby="our-branches-heading"
            className="
                relative isolate overflow-hidden
                bg-white px-4 py-12
                sm:px-6 sm:py-16
                lg:px-8 lg:py-20
            "
        >
            <BranchBackground />

            <div
                className="
                    relative mx-auto
                    w-full max-w-7xl
                    overflow-hidden
                    rounded-[30px]
                    border border-slate-200/80
                    bg-white/95
                    px-5 py-8
                    shadow-[0_24px_65px_rgba(15,23,42,0.09)]
                    backdrop-blur-sm
                    sm:px-8 sm:py-10
                    lg:px-12 lg:py-12
                "
            >
                <div
                    aria-hidden="true"
                    className="
                        absolute inset-x-10 top-0 h-px
                        bg-gradient-to-r
                        from-transparent
                        via-primary/35
                        to-transparent
                    "
                />

                <BranchSectionHeader />

                <BranchesClient />

                <BranchCallout />
            </div>
        </section>
    );
};

export default OurBranches;