
import PlacementCard from "./PlacementCard";

export default function PlacementGrid() {
  return (
    <div
      className="
        relative flex h-full w-full
        min-w-0 items-center
        justify-center
        px-4 pb-10 pt-2
        sm:px-8 sm:pb-14
        lg:px-2 lg:py-12
        xl:px-6
        2xl:px-10
      "
    >
      <PlacementCard />
    </div>
  );
}
