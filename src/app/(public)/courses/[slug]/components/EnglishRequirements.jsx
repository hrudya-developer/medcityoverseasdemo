import {
    getValue,
} from "../utils/courseDetailsHelpers";

export default function EnglishRequirements({
    course,
}) {
    const minimum = [
        getValue(course?.ielts, "-"),
        getValue(course?.toefl, "-"),
        getValue(course?.pte, "-"),
        getValue(course?.duolingo, "-"),
        getValue(course?.gre, "-"),
        getValue(course?.gmat, "-"),
    ];

    const lessThanMinimum = [
        getValue(course?.ieltsless, "-"),
        getValue(course?.toeflless, "-"),
        getValue(course?.pteless, "-"),
        "-",
        "-",
        "-",
    ];

    return (
        <section
            className="mx-auto max-w-7xl px-5 py-5 lg:px-12"
        >
            <h2
                className="text-center font-extrabold uppercase text-primary"
            >
                English Language Requirements
            </h2>

            <div
                className="mt-6 overflow-x-auto rounded-xl bg-blue-50 shadow-sm"
            >
                <table
                    className="w-full min-w-[700px] text-center text-sm"
                >
                    <thead className="bg-secondary text-white">
                        <tr>
                            <th className="p-4">
                                Requirement
                            </th>
                            <th>IELTS</th>
                            <th>TOEFL iBT</th>
                            <th>PTE</th>
                            <th>Duolingo</th>
                            <th>GRE</th>
                            <th>GMAT</th>
                        </tr>
                    </thead>

                    <tbody>
                        <RequirementRow
                            label="Minimum Required"
                            values={minimum}
                        />

                        <RequirementRow
                            label="Less than Minimum"
                            values={lessThanMinimum}
                        />
                    </tbody>
                </table>
            </div>
        </section>
    );
}

function RequirementRow({
    label,
    values,
}) {
    return (
        <tr className="border-b border-white last:border-b-0">
            <td className="p-4 text-left font-semibold">
                {label}
            </td>

            {values.map((value, index) => (
                <td
                    key={index}
                    className="p-4 font-medium"
                >
                    {value}
                </td>
            ))}
        </tr>
    );
}