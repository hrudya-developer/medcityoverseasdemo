import PrivacyBreadcrumb from "./components/PrivacyBreadcrumb";
import PrivacyCTA from "./components/PrivacyCTA";
import PrivacyHero from "./components/PrivacyHero";
import PrivacyIntro from "./components/PrivacyIntro";
import PrivacySection from "./components/PrivacySection";
import PrivacyTrustGrid from "./components/PrivacyTrustGrid";

const SITE_URL =
    "https://medcityoverseas.com";

export const metadata = {
    title:
        "Privacy Policy | Medcity Overseas",

    description:
        "Read the Medcity Overseas Privacy Policy to understand how we collect, use, protect and manage personal information across our study abroad services.",

    alternates: {
        canonical:
            `${SITE_URL}/privacy-policy`,
    },

    robots: {
        index: true,
        follow: true,
    },

    openGraph: {
        title:
            "Privacy Policy | Medcity Overseas",

        description:
            "Learn how Medcity Overseas protects your personal information and handles data across our study abroad services.",

        url:
            `${SITE_URL}/privacy-policy`,

        siteName:
            "Medcity Overseas",

        type:
            "website",

        locale:
            "en_IN",
    },
};

export default function PrivacyPolicyPage() {
    return (
        <main className="bg-white">
            <PrivacyHero />

            <PrivacyBreadcrumb />

            <div
                className="
                    mx-auto
                    max-w-[1240px]
                    px-5
                    py-12

                    sm:px-8
                    sm:py-14

                    lg:py-16
                "
            >
                <PrivacyIntro />

                <PrivacyTrustGrid />

                <div className="mt-10">
                    <PrivacySection
                        number="1"
                        title="Introduction"
                    >
                        <p>
                            Medcity International
                            Overseas Corporation operates
                            a study abroad platform
                            that helps students
                            explore global education
                            opportunities.
                        </p>

                        <p>
                            We respect your privacy
                            and are committed to
                            protecting the personal
                            information you share
                            with us.
                        </p>

                        <p>
                            This Privacy Policy
                            applies to information
                            collected through our
                            website, services,
                            student portal, mobile
                            application, counselling
                            sessions and other
                            communications.
                        </p>
                    </PrivacySection>

                    <PrivacySection
                        number="2"
                        title="Information We Collect"
                    >
                        <p>
                            We may collect personal
                            information that you
                            provide when contacting
                            us, registering for our
                            services, requesting
                            counselling or applying
                            for study abroad
                            opportunities.
                        </p>

                        <p>
                            This may include your
                            name, contact details,
                            educational information,
                            preferred study
                            destination and other
                            information required to
                            provide our services.
                        </p>
                    </PrivacySection>

                    <PrivacySection
                        number="3"
                        title="How We Use Your Information"
                    >
                        <p>
                            We use your information
                            to provide counselling,
                            university and course
                            guidance, admissions
                            assistance, visa support,
                            student services and
                            relevant communication.
                        </p>

                        <p>
                            Information may also be
                            used to improve our
                            website, services and
                            overall student
                            experience.
                        </p>
                    </PrivacySection>

                    <PrivacySection
                        number="4"
                        title="Data Security"
                    >
                        <p>
                            We take reasonable
                            administrative,
                            technical and
                            organisational measures
                            to protect personal
                            information against
                            unauthorised access,
                            misuse, loss or
                            disclosure.
                        </p>
                    </PrivacySection>

                    <PrivacySection
                        number="5"
                        title="Your Rights"
                    >
                        <p>
                            You may request access
                            to, correction of, or
                            deletion of your
                            personal information,
                            subject to applicable
                            legal and operational
                            requirements.
                        </p>
                    </PrivacySection>
                </div>

                <div className="mt-4">
                    <PrivacyCTA />
                </div>
            </div>
        </main>
    );
}