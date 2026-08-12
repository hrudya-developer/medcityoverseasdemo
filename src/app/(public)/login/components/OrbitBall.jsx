import cn from "@/lib/cn";

export default function OrbitBall({
    size = "h-2.5 w-2.5",
    color = "bg-[#d30b55]",
    shadow = "",
    orbitSize = 280,
    duration = "18s",
    delay = "0s",
    reverse = false,
}) {
    const numericOrbitSize =
        typeof orbitSize === "number"
            ? orbitSize
            : Number.parseFloat(orbitSize) || 280;

    return (
        <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2"
            style={{
                width: `${numericOrbitSize}px`,
                height: `${numericOrbitSize}px`,
                transform: "translate(-50%, -50%)",
            }}
        >
            <div
                className={cn(`
          relative h-full w-full
          ${reverse
                        ? "login-orbit-reverse-spin"
                        : "login-orbit-spin"}
        `)}
                style={{
                    animationDuration: duration,
                    animationDelay: delay,
                }}
            >
                <span
                    className={cn(`
            absolute left-1/2 top-0
            -translate-x-1/2 -translate-y-1/2
            rounded-full
            ${size}
            ${color}
            ${shadow}
          `)}
                />
            </div>
        </div>
    );
}