import BranchImageCard from "./BranchImageCard";
import BranchServicesCard from "./BranchServicesCard";

export default function HeroVisual({
  center,
  location,
  branchName,
}) {
  if (!center) {
    return null;
  }

  return (
    <div
      className="
        mx-auto
        w-full
        max-w-[800px]
      "
    >
      <div
        className="
          grid
          gap-5
          md:grid-cols-2
          md:items-start
          xl:gap-6
        "
      >
        <BranchImageCard
          center={center}
          location={location}
          branchName={branchName}
        />

        <BranchServicesCard />
      </div>
    </div>
  );
}