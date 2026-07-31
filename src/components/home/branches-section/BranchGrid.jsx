import BranchCard from "./BranchCard";

const BranchGrid = ({ branches }) => {
    return (
        <div
            className="
                grid grid-cols-1 gap-4
                sm:grid-cols-2
                md:grid-cols-3
                lg:grid-cols-4
            "
        >
            {branches.map((branch, index) => (
                <BranchCard
                    key={branch}
                    branch={branch}
                    index={index}
                />
            ))}
        </div>
    );
};

export default BranchGrid;