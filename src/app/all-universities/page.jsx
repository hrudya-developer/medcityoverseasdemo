import { redirect } from "next/navigation";

export default function AllUniversitiesPage() {
    redirect(
        "/all-universities/6?country=Germany"
    );
}