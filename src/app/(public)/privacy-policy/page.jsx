import PrivacyBreadcrumb from "./components/PrivacyBreadcrumb";
import PrivacyCTA from "./components/PrivacyCTA";
import PrivacyHero from "./components/PrivacyHero";
import PrivacyIntro from "./components/PrivacyIntro";
import PrivacySection from "./components/PrivacySection";
import PrivacyTrustGrid from "./components/PrivacyTrustGrid";
import { applySeoOverrides, DEFAULT_OG_IMAGE } from "@/lib/pageSeo";
import Link from "next/link";
import FaqList from "@/components/seo/FaqList";
import OfficialSources from "@/components/seo/OfficialSources";
import PageSchema from "@/components/seo/PageSchema";
import QuestionAnswer from "@/components/seo/QuestionAnswer";
import QuickAnswer from "@/components/seo/QuickAnswer";

const SITE_URL =
    "https://medcityoverseas.com";

const PAGE_TITLE =
    "Privacy Policy: How We Protect Your Data | Medcity Overseas";

const PAGE_DESCRIPTION =
    "Read the Medcity Overseas Privacy Policy to understand how we collect, use, protect and manage personal information across our study abroad services.";

// Every answer here restates the policy below; keep them in step.
const FAQS = [
    {
        question: "What personal information does Medcity Overseas collect?",
        answer:
            "We may collect your name, contact details, educational information, preferred study destination and other information needed to provide our services, when you contact us, register, request counselling or apply for study abroad opportunities.",
    },
    {
        question: "How does Medcity Overseas protect my information?",
        answer:
            "We take reasonable administrative, technical and organisational measures to protect personal information against unauthorised access, misuse, loss or disclosure.",
    },
    {
        question: "Can I ask Medcity Overseas to correct or delete my data?",
        answer:
            "Yes. You may request access to, correction of, or deletion of your personal information, subject to applicable legal and operational requirements. Contact us on +91 90729 82555 or through the contact page to make a request.",
    },
];

const pageMetadata = {
    title: {
        absolute: PAGE_TITLE,
    },

    description: PAGE_DESCRIPTION,

    alternates: {
        canonical:
            `${SITE_URL}/privacy-policy`,
    },

    robots: {
        index: true,
        follow: true,
    },

    openGraph: {
        title: PAGE_TITLE,

        images: [DEFAULT_OG_IMAGE],

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
        <div className="bg-white">
            <PageSchema
                path="/privacy-policy"
                name={PAGE_TITLE}
                description={PAGE_DESCRIPTION}
                breadcrumbs={[
                    { name: "Home", path: "/" },
                    { name: "Privacy Policy", path: "/privacy-policy" },
                ]}
            />

            <PrivacyHero />

            <PrivacyBreadcrumb />

            <QuickAnswer className="pt-10">
                This Privacy Policy explains how Medcity Overseas (Medcity International Overseas Corporation) collects, uses and protects the personal information you share through our website, student portal, mobile app and counselling sessions. We use it to provide study abroad services, and you can ask to access, correct or delete it.
            </QuickAnswer>

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

                <div className="mt-6">
                    <QuestionAnswer
                        className="!px-0"
                        question="How does Medcity Overseas use your personal information?"
                        answer="Medcity Overseas uses the information you share to provide counselling, university and course guidance, admissions assistance, visa support, student services and relevant communication. It may also be used to improve our website and services. You can ask us to access, correct or delete your personal information, subject to legal and operational requirements."
                        points={[
                            { title: "Access", text: "ask what personal information we hold about you." },
                            { title: "Correction", text: "ask us to fix details that are wrong or out of date." },
                            { title: "Deletion", text: "ask us to delete your personal information." },
                        ]}
                    />
                </div>

                <FaqList
                    className="mt-12 !px-0"
                    path="/privacy-policy"
                    faqs={FAQS}
                    title="Privacy questions"
                />

                <OfficialSources
                    className="mt-12 !px-0"
                    title="Data protection in India"
                    intro="India's data protection law is administered by the Ministry of Electronics and Information Technology."
                    links={[
                        {
                            label: "Ministry of Electronics and Information Technology",
                            href: "https://www.meity.gov.in/",
                            note: "The Government of India ministry responsible for data protection rules.",
                        },
                    ]}
                />

                <p className="mt-10 text-sm leading-7 text-slate-600">
                    Questions about this policy? Visit the{" "}
                    <Link href="/contact-us" className="font-bold text-primary hover:underline">
                        contact page
                    </Link>
                    , read{" "}
                    <Link href="/about-us" className="font-bold text-primary hover:underline">
                        about Medcity Overseas
                    </Link>{" "}
                    or find your nearest{" "}
                    <Link href="/branches" className="font-bold text-primary hover:underline">
                        Medcity branch
                    </Link>
                    .
                </p>

                <div className="mt-6">
                    <PrivacyCTA />
                </div>
            </div>
        </div>
    );
}

// Search details edited in the admin apply on top of these.
export async function generateMetadata() {
  return applySeoOverrides(pageMetadata);
}
