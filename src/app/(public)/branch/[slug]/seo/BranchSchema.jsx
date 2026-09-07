import {
    getBranchCanonical,
    getBranchSeoDescription,
    getBranchSeoImage,
    getBranchSeoLocation,
    getBranchSeoTitle,
    SITE_NAME,
    SITE_URL,
  } from "./branchSeo";
  
  export default function BranchSchema({
    center,
  }) {
    if (!center) {
      return null;
    }
  
    const location =
      getBranchSeoLocation(
        center
      );
  
    const canonical =
      getBranchCanonical(
        center
      );
  
    const description =
      getBranchSeoDescription(
        center
      );
  
    const title =
      getBranchSeoTitle(
        center
      );
  
    const image =
      getBranchSeoImage(
        center
      );
  
    const phones =
      Array.isArray(
        center?.phones
      )
        ? center.phones.filter(
            Boolean
          )
        : [];
  
    const branchId =
      `${canonical}#branch`;
  
    const webPageId =
      `${canonical}#webpage`;
  
    const breadcrumbId =
      `${canonical}#breadcrumb`;
  
    const parentId =
      `${SITE_URL}/#organization`;
  
    const websiteId =
      `${SITE_URL}/#website`;
  
    const areaServed =
      buildAreaServed(
        center,
        location
      );
  
    const organization = {
      "@type": [
        "EducationalOrganization",
        "LocalBusiness",
      ],
  
      "@id": branchId,
  
      name:
        center.name,
  
      url:
        canonical,
  
      description,
  
      ...(image && {
        image: {
          "@type":
            "ImageObject",
  
          url: image,
        },
      }),
  
      ...(phones.length && {
        telephone:
          phones[0],
      }),
  
      ...(center?.email && {
        email:
          center.email,
      }),
  
      address: {
        "@type":
          "PostalAddress",
  
        ...(center?.address && {
          streetAddress:
            center.address,
        }),
  
        ...(center?.city && {
          addressLocality:
            center.city,
        }),
  
        ...(center?.district && {
          addressRegion:
            center.district,
        }),
  
        ...(center?.postalCode && {
          postalCode:
            center.postalCode,
        }),
  
        addressCountry: {
          "@type":
            "Country",
  
          name: "India",
        },
      },
  
      ...(areaServed.length && {
        areaServed,
      }),
  
      ...(center?.mapLink && {
        hasMap:
          center.mapLink,
      }),
  
      contactPoint:
        buildContactPoints(
          center,
          phones
        ),
  
      parentOrganization: {
        "@type":
          "EducationalOrganization",
  
        "@id":
          parentId,
  
        name:
          SITE_NAME,
  
        url:
          SITE_URL,
      },
    };
  
    const webpage = {
      "@type":
        "WebPage",
  
      "@id":
        webPageId,
  
      url:
        canonical,
  
      name:
        `${title} | ${SITE_NAME}`,
  
      description,
  
      inLanguage:
        "en-IN",
  
      isPartOf: {
        "@type":
          "WebSite",
  
        "@id":
          websiteId,
  
        name:
          SITE_NAME,
  
        url:
          SITE_URL,
      },
  
      about: {
        "@id":
          branchId,
      },
  
      mainEntity: {
        "@id":
          branchId,
      },
  
      breadcrumb: {
        "@id":
          breadcrumbId,
      },
  
      ...(image && {
        primaryImageOfPage: {
          "@type":
            "ImageObject",
  
          url: image,
        },
      }),
    };
  
    const breadcrumb = {
      "@type":
        "BreadcrumbList",
  
      "@id":
        breadcrumbId,
  
      itemListElement: [
        {
          "@type":
            "ListItem",
  
          position: 1,
  
          name: "Home",
  
          item:
            SITE_URL,
        },
  
        {
          "@type":
            "ListItem",
  
          position: 2,
  
          name:
            "Branches",
  
          item:
            `${SITE_URL}/branches`,
        },
  
        {
          "@type":
            "ListItem",
  
          position: 3,
  
          name:
            center.name,
  
          item:
            canonical,
        },
      ],
    };
  
    const schema = {
      "@context":
        "https://schema.org",
  
      "@graph": [
        organization,
        webpage,
        breadcrumb,
      ],
    };
  
    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              schema
            ).replace(
              /</g,
              "\\u003c"
            ),
        }}
      />
    );
  }
  
  /* =========================================================
     CONTACT POINT
  ========================================================= */
  
  function buildContactPoints(
    center,
    phones
  ) {
    const contactPoints =
      phones.map(
        (phone) => ({
          "@type":
            "ContactPoint",
  
          telephone:
            phone,
  
          contactType:
            "customer service",
  
          areaServed:
            "IN",
  
          availableLanguage: [
            "English",
            "Malayalam",
          ],
        })
      );
  
    if (
      center?.email &&
      contactPoints.length
    ) {
      contactPoints[0].email =
        center.email;
    }
  
    if (
      center?.email &&
      !contactPoints.length
    ) {
      contactPoints.push({
        "@type":
          "ContactPoint",
  
        email:
          center.email,
  
        contactType:
          "customer service",
  
        areaServed:
          "IN",
  
        availableLanguage: [
          "English",
          "Malayalam",
        ],
      });
    }
  
    return contactPoints;
  }
  
  /* =========================================================
     AREA SERVED
  ========================================================= */
  
  function buildAreaServed(
    center,
    location
  ) {
    const areas = [];
  
    if (location) {
      areas.push({
        "@type":
          "City",
  
        name:
          location,
      });
    }
  
    if (
      center?.city &&
      center.city !==
        location
    ) {
      areas.push({
        "@type":
          "City",
  
        name:
          center.city,
      });
    }
  
    if (
      center?.district &&
      center.district !==
        location &&
      center.district !==
        center.city
    ) {
      areas.push({
        "@type":
          "AdministrativeArea",
  
        name:
          center.district,
      });
    }
  
    if (center?.state) {
      areas.push({
        "@type":
          "State",
  
        name:
          center.state,
      });
    }
  
    return areas;
  }