import CounsellingForm from "./CounsellingForm";
import CounsellingIntro from "./CounsellingIntro";

const CounsellingSection = () => {
    return (
        <section
            id="counselling"
            aria-labelledby="counselling-heading"
            className="relative scroll-mt-28 overflow-hidden bg-gradient-to-b from-white via-[#fffafd] to-[#f7faff] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
        >
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-primary/10 blur-[110px]"
            />

            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-secondary/10 blur-[120px]"
            />

            <div
                className="relative z-10 mx-auto grid w-full max-w-[1450px] items-stretch gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10"
            >
                <CounsellingIntro />

                <CounsellingForm />
            </div>
        </section>
    );
};

export default CounsellingSection;