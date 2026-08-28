export default function CarouselButton({ direction, onClick }) {
  const isLeft = direction === "left";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isLeft ? "Previous universities" : "Next universities"}
      className="flex size-11 shrink-0 items-center justify-center rounded-full border border-primary/10 bg-white text-2xl text-primary shadow-md transition hover:bg-primary hover:text-white active:scale-95"
    >
      {isLeft ? "‹" : "›"}
    </button>
  );
}