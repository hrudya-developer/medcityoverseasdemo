import { NOT_RECORDED } from "./courseDetailsHelpers";

/*
 * FAQs for a course page, built only from the course record. Shared by
 * the FAQ section (a client component) and the page's FAQPage markup
 * so both always say the same thing.
 */
export function createCourseFaqs({ course, details }) {
    const safeCourse = details.courseTitle || "this course";
    const safeUniversity = details.universityName || "the university";
    const safeCountry = details.country;

    const faqs = [];

    // 1. Course Description
    if (details.remarks && details.remarks !== "Course details are not available.") {
        faqs.push({
            question: `What is ${safeCourse} about?`,
            answer: details.remarks,
        });
    }

    // 2. Entry Requirement
    if (details.entryRequirement && details.entryRequirement !== "Entry requirement not available.") {
        faqs.push({
            question: `What are the entry requirements for ${safeCourse}?`,
            answer: details.entryRequirement,
        });
    }

    // 3. Level & Duration
    const levelText = details.level && details.level !== NOT_RECORDED ? `It is a ${details.level} program.` : "";
    const durationText = details.duration && details.duration !== NOT_RECORDED ? `The program duration is ${details.duration}.` : "";
    const intakeText = details.intakes && details.intakes !== NOT_RECORDED ? `Available intakes are ${details.intakes}.` : "";
    
    if (levelText || durationText || intakeText) {
        faqs.push({
            question: `What is the level, duration, and intake availability for ${safeCourse}?`,
            answer: `${levelText} ${durationText} ${intakeText}`.trim(),
        });
    }

    // 4. Fees
    const feesText = details.fees && details.fees !== NOT_RECORDED ? `The tuition fee listed for this course is ${details.fees}.` : "";
    const appFeeText = details.applicationFee && details.applicationFee !== NOT_RECORDED ? `The application fee is ${details.applicationFee}.` : "";
    const deadlineText = details.deadline && details.deadline !== NOT_RECORDED ? `The application deadline is ${details.deadline}.` : "";

    if (feesText || appFeeText || deadlineText) {
        faqs.push({
            question: `How much does ${safeCourse} cost and what is the deadline?`,
            answer: `${feesText} ${appFeeText} ${deadlineText}`.trim(),
        });
    }

    // 5. English language requirements
    const testScores = [];
    if (course?.ielts && course?.ielts !== "-") testScores.push(`IELTS: ${course.ielts}`);
    if (course?.toefl && course?.toefl !== "-") testScores.push(`TOEFL: ${course.toefl}`);
    if (course?.pte && course?.pte !== "-") testScores.push(`PTE: ${course.pte}`);
    if (course?.duolingo && course?.duolingo !== "-") testScores.push(`Duolingo: ${course.duolingo}`);
    if (course?.gre && course?.gre !== "-") testScores.push(`GRE: ${course.gre}`);
    if (course?.gmat && course?.gmat !== "-") testScores.push(`GMAT: ${course.gmat}`);

    if (testScores.length > 0) {
        faqs.push({
            question: `What English language and test scores are required for ${safeCourse}?`,
            answer: `The minimum test scores required are: ${testScores.join(", ")}.`,
        });
    }

    // 6. Generic Medcity help
    faqs.push({
        question: `How can Medcity Overseas help with my application to ${safeUniversity}?`,
        answer: `Medcity Overseas helps with your application to ${safeUniversity}${safeCountry ? ` in ${safeCountry}` : ""}: course shortlisting, preparing application documents, reviewing entry and English requirements, and guidance through the student visa process. Call or WhatsApp +91 90729 82555 for free counselling.`,
    });

    return faqs;
}
