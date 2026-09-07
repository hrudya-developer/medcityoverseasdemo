export default function HeroBackground() {
    return (
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          overflow-hidden
        "
      >
        {/* Primary glow */}
  
        <div
          className="
            absolute
            -left-40
            top-10
            h-[420px]
            w-[420px]
            rounded-full
            bg-primary/[0.055]
            blur-[115px]
          "
        />
  
        {/* Secondary glow */}
  
        <div
          className="
            absolute
            -right-36
            top-16
            h-[440px]
            w-[440px]
            rounded-full
            bg-secondary/[0.055]
            blur-[120px]
          "
        />
  
        {/* Yellow glow */}
  
        <div
          className="
            absolute
            left-[51%]
            top-[8%]
            h-[190px]
            w-[190px]
            rounded-full
            bg-logoYellow/[0.08]
            blur-[90px]
          "
        />
  
        <DotPattern
          className="
            left-[48%]
            top-8
          "
          color="#0466af"
        />
  
        <DotPattern
          className="
            -left-4
            top-[45%]
          "
          color="#c01f53"
        />
  
        <DotPattern
          className="
            bottom-5
            right-[24%]
          "
          color="#0466af"
        />
  
        {/* Arc patterns */}
  
        <div
          className="
            absolute
            -bottom-[260px]
            -left-[245px]
            h-[480px]
            w-[480px]
            rounded-full
            border
            border-primary/[0.07]
          "
        />
  
        <div
          className="
            absolute
            -bottom-[220px]
            -left-[205px]
            h-[400px]
            w-[400px]
            rounded-full
            border
            border-primary/[0.06]
          "
        />
  
        <div
          className="
            absolute
            -bottom-[180px]
            -left-[165px]
            h-[320px]
            w-[320px]
            rounded-full
            border
            border-secondary/[0.05]
          "
        />
      </div>
    );
  }
  
  function DotPattern({
    className = "",
    color,
  }) {
    return (
      <div
        className={`
          absolute
          h-[105px]
          w-[105px]
          opacity-[0.12]
          ${className}
        `}
        style={{
          backgroundImage:
            `radial-gradient(circle, ${color} 1.15px, transparent 1.15px)`,
  
          backgroundSize:
            "14px 14px",
        }}
      />
    );
  }