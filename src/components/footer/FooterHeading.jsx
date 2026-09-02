export default function FooterHeading({
    children,
}) {
    return (
        <div
            className="
                text-center

                lg:text-left
            "
        >
            <h3
                className="
                    text-xl
                    font-black
                    text-white
                "
            >
                {children}
            </h3>

            <div
                aria-hidden="true"
                className="
                    mx-auto
                    mt-3
                    flex
                    items-center
                    justify-center
                    gap-1.5

                    lg:mx-0
                    lg:justify-start
                "
            >
                <span
                    className="
                        h-1
                        w-8
                        rounded-full
                        bg-primary
                    "
                />

                <span
                    className="
                        h-1
                        w-3
                        rounded-full
                        bg-logoYellow
                    "
                />
            </div>
        </div>
    );
}