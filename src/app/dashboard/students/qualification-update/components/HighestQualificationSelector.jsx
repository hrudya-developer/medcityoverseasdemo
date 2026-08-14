import QualificationRadioGroup from "./QualificationRadioGroup";

const OPTIONS = [
    {
        value: "plus two",
        label: "Plus Two",
    },
    {
        value: "degree",
        label: "Degree",
    },
    {
        value: "masters",
        label: "Masters",
    },
];

export default function HighestQualificationSelector({
    value,
    onChange,
    error,
}) {
    return (
        <QualificationRadioGroup
            name="highest"
            value={value}
            options={OPTIONS}
            onChange={onChange}
            error={error}
        />
    );
}