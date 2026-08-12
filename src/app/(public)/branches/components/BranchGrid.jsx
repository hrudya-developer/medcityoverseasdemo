import BranchCard from "./BranchCard";

export default function BranchGrid({
    centers,
}) {
    return (
        <div
            id="branch-grid"
            className="mx-auto mt-10 grid w-full max-w-6xl grid-cols-1 gap-5 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-8 xl:gap-6"
        >
            {centers.map((center, index) => (
                <BranchCard
                    key={center.id}
                    center={center}
                    index={index}
                />
            ))}
        </div>
    );
}