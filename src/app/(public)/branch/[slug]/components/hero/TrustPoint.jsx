import {
    CheckCircle2,
  } from "lucide-react";
  
  export default function TrustPoint({
    text,
  }) {
    return (
      <span
        className="
          inline-flex
          items-center
          gap-1.5
        "
      >
        <CheckCircle2
          className="
            h-3.5
            w-3.5
            shrink-0
            text-primary
          "
          aria-hidden="true"
        />
  
        <span>
          {text}
        </span>
      </span>
    );
  }