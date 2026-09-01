import {
  permanentRedirect,
} from "next/navigation";

export default async function LegacyUniversityDetailsPage({
  params,
}) {
  const { slug } =
    await params;

  if (!slug) {
    permanentRedirect(
      "/universities"
    );
  }

  permanentRedirect(
    `/universities/${slug}`
  );
}