import TestimonialCard from "@/components/home/testimonials/TestimonialCard";

export const metadata = {
    title:
        "Student Testimonials | Medcity Study Abroad",

    description:
        "Read student testimonials and success stories from Medcity Study Abroad.",

    alternates: {
        canonical:
            "https://medcityoverseas.com/all-testimonials",
    },
};

const getTestimonials = async () => {
    const baseUrl =
        process.env.NEXT_PUBLIC_SITE_URL ||
        "http://localhost:3000";

    try {
        const response = await fetch(
            `${baseUrl}/api/testimonials`,
            {
                next: {
                    revalidate: 3600,
                },
            }
        );

        if (!response.ok) {
            return [];
        }

        const result =
            await response.json();

        return Array.isArray(
            result?.testimonials
        )
            ? result.testimonials
            : [];
    } catch {
        return [];
    }
};

const AllTestimonialsPage =
    async () => {
        const testimonials =
            await getTestimonials();

        return (
            <main>
                <section className="bg-gradient-to-br from-[#fff6f9] via-white to-[#f3f9ff] px-4 py-16 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-[1500px]">
                        <header className="mx-auto max-w-3xl text-center">
                            <h1 className="font-nunito text-3xl font-extrabold text-darkPrimary sm:text-4xl lg:text-5xl">
                                Student Success
                                Stories
                            </h1>

                            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                                Discover genuine
                                experiences shared
                                by students who
                                started their study
                                abroad journey with
                                Medcity.
                            </p>
                        </header>

                        {testimonials.length >
                            0 ? (
                            <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
                                {testimonials.map(
                                    (
                                        testimonial
                                    ) => (
                                        <TestimonialCard
                                            key={
                                                testimonial.id
                                            }
                                            testimonial={
                                                testimonial
                                            }
                                        />
                                    )
                                )}
                            </div>
                        ) : (
                            <p className="mt-14 text-center text-slate-500">
                                No testimonials
                                found.
                            </p>
                        )}
                    </div>
                </section>
            </main>
        );
    };

export default AllTestimonialsPage;