
import Image from "next/image";

import { placementContent } from "./placementData";

export default function PlacementCard() {
  const { images } = placementContent;

  return (
    <div
      className="
        relative mx-auto
        w-full max-w-[820px]
        aspect-[1.08]
        sm:aspect-[1.2]
        lg:aspect-[0.95]
        xl:aspect-[1.1]
        2xl:aspect-[1.2]
      "
    >
      {/* Large destination image */}
      <div
        className="
          group absolute
          right-[1%] top-[3%]
          h-[70%] w-[79%]
          overflow-hidden
          rounded-[24px]
          border-[4px] border-white
          bg-[#e8eef6]
          shadow-[0_22px_60px_rgba(25,35,65,0.15)]
          sm:rounded-[34px]
        "
      >
        <Image
          src={images.destination}
          alt="London Tower Bridge at sunset"
          fill
          sizes="(max-width: 1023px) 80vw, 40vw"
          className="
            object-cover object-center
            transition-transform
            duration-700
            group-hover:scale-[1.04]
          "
        />
      </div>

      {/* Nurse image overlapping destination */}
      <div
        className="
          group absolute
          left-[1%] top-[32%] z-10
          h-[49%] w-[43%]
          overflow-hidden
          rounded-[22px]
          border-[4px] border-white
          bg-[#e8f0f5]
          shadow-[0_18px_48px_rgba(25,35,65,0.19)]
          sm:rounded-[30px]
        "
      >
        <Image
          src={images.nurse}
          alt="Professional nurse in blue medical scrubs"
          fill
          sizes="(max-width: 1023px) 45vw, 22vw"
          className="
            object-cover object-center
            transition-transform
            duration-700
            group-hover:scale-[1.05]
          "
        />
      </div>

      {/* Student image overlapping bottom */}
      <div
        className="
          group absolute
          bottom-[3%] right-[18%] z-20
          h-[30%] w-[43%]
          overflow-hidden
          rounded-[22px]
          border-[4px] border-white
          bg-[#f2f3f6]
          shadow-[0_18px_48px_rgba(25,35,65,0.17)]
          sm:rounded-[30px]
        "
      >
        <Image
          src={images.student}
          alt="Student exploring international opportunities on a laptop"
          fill
          sizes="(max-width: 1023px) 45vw, 22vw"
          className="
            object-cover object-center
            transition-transform
            duration-700
            group-hover:scale-[1.05]
          "
        />
      </div>
    </div>
  );
}
