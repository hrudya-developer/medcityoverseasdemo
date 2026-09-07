import {
    notFound,
} from "next/navigation";

import {
    centers,
} from "../../branches/data/centersData";

import BranchHero from "./components/BranchHero";
import BranchContactBar from "./components/BranchContactBar";
import BranchAbout from "./components/BranchAbout";
import BranchServices from "./components/BranchServices";
import BranchLocation from "./components/BranchLocation";
import BranchCTA from "./components/BranchCTA";

import {
    buildBranchMetadata,
} from "./seo/branchSeo";

import BranchSchema from "./seo/BranchSchema";
import BranchFAQ from "./components/BranchFAQ";

/* =========================================================
   GET CENTER
========================================================= */

function getCenterBySlug(
    slug
) {
    return centers.find(
        (center) =>
            center.slug === slug
    );
}

/* =========================================================
   STATIC PARAMS
========================================================= */

export function generateStaticParams() {
    return centers.map(
        (center) => ({
            slug:
                center.slug,
        })
    );
}

/* =========================================================
   METADATA
========================================================= */

export async function generateMetadata({
    params,
}) {
    const { slug } =
        await params;

    const center =
        getCenterBySlug(slug);

    return buildBranchMetadata(
        center
    );
}

/* =========================================================
   PAGE
========================================================= */

export default async function BranchPage({
    params,
}) {
    const { slug } =
        await params;

    const center =
        getCenterBySlug(slug);

    if (!center) {
        notFound();
    }

    return (
        <>
            <BranchSchema
                center={center}
            />

            <main className="overflow-hidden bg-white">
                <BranchHero
                    center={center}
                />

                <BranchContactBar
                    center={center}
                />

                <BranchAbout
                    center={center}
                />

                <BranchServices
                    center={center}
                />

                <BranchLocation
                    center={center}
                />

                <BranchCTA
                    center={center}
                />
               <BranchFAQ center={center} />
            </main>
        </>
    );
}