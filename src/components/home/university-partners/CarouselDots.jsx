export default function CarouselDots({
  count,
  active,
  onChange,
}) {
  return (
    <div className="mt-8 flex justify-center gap-2">
      {Array.from({ length: count }).map((_, index) => (
        <button
          key={index}
          type="button"
          onClick={() => onChange(index)}
          aria-label={`Go to slide ${index + 1}`}
          className={`h-2.5 rounded-full transition-all ${
            active === index
              ? "w-7 bg-darkPrimary"
              : "w-2.5 bg-primary/10 hover:bg-primary"
          }`}
        />
      ))}
    </div>
  );
}