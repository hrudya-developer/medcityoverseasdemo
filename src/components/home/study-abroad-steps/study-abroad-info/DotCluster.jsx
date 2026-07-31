const DotCluster = ({
    className = "",
    count = 30,
    columns = 6,
}) => {
    return (
        <div
            aria-hidden="true"
            className={`
        pointer-events-none
        absolute grid gap-2.5
        ${className}
      `}
            style={{
                gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
            }}
        >
            {Array.from({ length: count }).map(
                (_, index) => (
                    <span
                        key={index}
                        className="
              h-1.5 w-1.5
              rounded-full bg-white
            "
                    />
                )
            )}
        </div>
    );
};

export default DotCluster;