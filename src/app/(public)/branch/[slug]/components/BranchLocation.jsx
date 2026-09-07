import {
    ArrowUpRight,
    Mail,
    MapPin,
    Phone,
  } from "lucide-react";
  
  export default function BranchLocation({
    center,
  }) {
    if (!center) {
      return null;
    }
  
    const location =
      center?.seoLocation ||
      center?.city ||
      center?.district ||
      "Kerala";
  
    const phones = Array.isArray(
      center?.phones
    )
      ? center.phones.filter(Boolean)
      : center?.phone
        ? [center.phone]
        : [];
  
    const fallbackMapQuery =
      encodeURIComponent(
        center?.address ||
          `${center?.city || ""}, ${
            center?.state || ""
          }`
      );
  
    const googleMapsUrl =
      center?.mapLink ||
      `https://www.google.com/maps/search/?api=1&query=${fallbackMapQuery}`;
  
    const mapEmbedUrl =
      center?.mapEmbed ||
      `https://www.google.com/maps?q=${fallbackMapQuery}&output=embed`;
  
    return (
      <section
        aria-labelledby="branch-location-heading"
        className="
          relative
          overflow-hidden
          bg-white
          py-14
          sm:py-16
          lg:py-20
        "
      >
        {/* Background decoration */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -left-24
            top-20
            h-64
            w-64
            rounded-2xl
            bg-secondary/[0.06]
            blur-3xl
          "
        />
  
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -right-24
            bottom-0
            h-72
            w-72
            rounded-2xl
            bg-primary/[0.06]
            blur-3xl
          "
        />
  
        <div
          className="
            relative
            mx-auto
            grid
            max-w-7xl
            items-stretch
            gap-8
            px-5
            sm:px-6
            lg:grid-cols-[0.82fr_1.18fr]
            lg:px-8
          "
        >
          {/* ================= LEFT CONTENT ================= */}
          <div
            className="
              flex
              flex-col
              justify-center
            "
          >
            <div>
              <p
                className="
                  text-xs
                  font-black
                  uppercase
                  tracking-[0.22em]
                  text-primary
                "
              >
                Visit Our Branch
              </p>
  
              <h2
                id="branch-location-heading"
                className="
                  mt-3
                  text-3xl
                  font-black
                  leading-tight
                  text-darkPrimary
                  sm:text-4xl
                "
              >
                Get Directions to{" "}
                <span className="text-primary">
                  {location}
                </span>
              </h2>
  
              <p
                className="
                  mt-4
                  max-w-xl
                  text-base
                  leading-7
                  text-slate-600
                "
              >
                Visit Medcity Overseas{" "}
                {location} for personalised
                study abroad counselling,
                university admission guidance,
                course selection and student
                visa support.
              </p>
            </div>
  
            {/* ================= DETAILS ================= */}
            <div
              className="
                mt-8
                space-y-4
              "
            >
              {center?.address && (
                <LocationItem
                  icon={MapPin}
                  title="Branch Address"
                >
                  <address
                    className="
                      not-italic
                      text-sm
                      leading-6
                      text-slate-600
                    "
                  >
                    {center.address}
                  </address>
                </LocationItem>
              )}
  
              {phones.length > 0 && (
                <LocationItem
                  icon={Phone}
                  title="Call Our Branch"
                >
                  <div
                    className="
                      flex
                      flex-wrap
                      gap-x-3
                      gap-y-1.5
                    "
                  >
                    {phones.map(
                      (
                        phone,
                        index
                      ) => (
                        <a
                          key={`${phone}-${index}`}
                          href={`tel:${phone.replace(
                            /[^\d+]/g,
                            ""
                          )}`}
                          className="
                            text-sm
                            font-bold
                            text-secondary
                            transition-colors
                            hover:text-primary
                            hover:underline
                          "
                        >
                          {phone}
                        </a>
                      )
                    )}
                  </div>
                </LocationItem>
              )}
  
              {center?.email && (
                <LocationItem
                  icon={Mail}
                  title="Email Us"
                >
                  <a
                    href={`mailto:${center.email}`}
                    className="
                      break-all
                      text-sm
                      font-bold
                      text-secondary
                      transition-colors
                      hover:text-primary
                      hover:underline
                    "
                  >
                    {center.email}
                  </a>
                </LocationItem>
              )}
            </div>
  
            {/* ================= MAP BUTTON ================= */}
            <div className="mt-7">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Get directions to ${
                  center?.name ||
                  location
                }`}
                className="
                  group
                  inline-flex
                  items-center
                  gap-3
                  rounded-2xl
                  bg-primary
                  px-6
                  py-3.5
                  text-sm
                  font-extrabold
                  text-white
                  shadow-lg
                  shadow-primary/20
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:bg-darkPrimary
                  hover:shadow-xl
                  hover:shadow-primary/20
                  focus-visible:outline-none
                  focus-visible:ring-4
                  focus-visible:ring-primary/20
                "
              >
                Get Directions on Google Maps
  
                <ArrowUpRight
                  className="
                    h-4
                    w-4
                    transition-transform
                    duration-300
                    group-hover:translate-x-0.5
                    group-hover:-translate-y-0.5
                  "
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>
  
          {/* ================= MAP ================= */}
          <div
            className="
              relative
              min-h-[400px]
              overflow-hidden
              rounded-[30px]
              border
              border-slate-200/80
              bg-slate-100
              shadow-[0_20px_60px_rgba(15,23,42,0.10)]
              sm:min-h-[450px]
              lg:min-h-[500px]
            "
          >
            <iframe
              src={mapEmbedUrl}
              title={`${center?.name || location} location map`}
              width="100%"
              height="100%"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="
                absolute
                inset-0
                h-full
                w-full
                border-0
              "
            />
  
            {/* Map label */}
            <div
              className="
                pointer-events-none
                absolute
                bottom-5
                left-5
                right-5
                flex
                items-center
                gap-3
                rounded-2xl
                border
                border-white/70
                bg-white/95
                px-4
                py-3.5
                shadow-xl
                backdrop-blur-xl
                sm:right-auto
                sm:max-w-sm
              "
            >
              <span
                className="
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-primary/10
                  text-primary
                "
              >
                <MapPin
                  className="h-5 w-5"
                  aria-hidden="true"
                />
              </span>
  
              <div className="min-w-0">
                <p
                  className="
                    truncate
                    text-sm
                    font-black
                    text-darkPrimary
                  "
                >
                  {center?.name ||
                    `Medcity ${location}`}
                </p>
  
                <p
                  className="
                    mt-0.5
                    truncate
                    text-xs
                    text-slate-500
                  "
                >
                  {center?.city}
                  {center?.state
                    ? `, ${center.state}`
                    : ""}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  
  function LocationItem({
    icon: Icon,
    title,
    children,
  }) {
    return (
      <div
        className="
          flex
          items-start
          gap-4
          rounded-[20px]
          border
          border-slate-100
          bg-[#f8fbff]
          p-5
          transition-all
          duration-300
          hover:border-primary/10
          hover:bg-white
          hover:shadow-lg
          hover:shadow-slate-900/5
        "
      >
        <span
          className="
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-primary/10
            text-primary
          "
        >
          <Icon
            className="h-5 w-5"
            aria-hidden="true"
          />
        </span>
  
        <div className="min-w-0">
          <p
            className="
              text-[11px]
              font-extrabold
              uppercase
              tracking-[0.12em]
              text-slate-400
            "
          >
            {title}
          </p>
  
          <div className="mt-1.5">
            {children}
          </div>
        </div>
      </div>
    );
  }