const BranchBackground = () => {
    return (
        <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
            <div
                className="absolute -left-28 top-8 h-80 w-80 rounded-full bg-primary/5 blur-3xl"
            />

            <div
                className="absolute -right-28 bottom-4 h-80 w-80 rounded-full bg-secondary/5 blur-3xl"
            />

            <div
                className="absolute inset-0 opacity-[0.025] [background-image:radial-gradient(#631A33_1px,transparent_1px)] [background-size:23px_23px]"
            />

            <div
                className="absolute left-1/2 top-1/2 h-48 w-[75%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.025] blur-3xl"
            />
        </div>
    );
};

export default BranchBackground;