import CounsellingForm from "./CounsellingForm";
import CounsellingIntro from "./CounsellingIntro";

const CounsellingSection = () => {
    return (
        <section
            id="counselling"
            aria-labelledby="counselling-heading"
            className="
                scroll-mt-28
                bg-gradient-to-b
                from-white
                via-[#fffafd]
                to-[#f7faff]
                px-4 py-12
                sm:px-6 sm:py-16
                lg:px-8 lg:py-20
            "
        >
            <div
                className="
                    mx-auto grid
                    max-w-[1450px]
                    items-stretch gap-8
                    lg:grid-cols-[0.9fr_1.1fr]
                    lg:gap-10
                "
            >
                <CounsellingIntro />

                <CounsellingForm />
            </div>
        </section>
    );
};

export default CounsellingSection;