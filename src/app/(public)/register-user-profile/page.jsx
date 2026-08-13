import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
    SESSION_COOKIE_NAME,
    verifySessionToken,
} from "@/lib/auth/session";

import RegisterProfileForm from "./components/RegisterProfileForm";

export const dynamic = "force-dynamic";

export default async function RegisterUserProfilePage() {
    const cookieStore =
        await cookies();

    const token =
        cookieStore.get(
            SESSION_COOKIE_NAME
        )?.value;

    if (!token) {
        redirect("/login");
    }

    const session =
        verifySessionToken(token);

    if (!session) {
        redirect("/login");
    }

    return (
        <main
            className="
                min-h-screen
                bg-[#f7f8fc]
                px-4
                py-8

                sm:px-6
            "
        >
            <div className="mx-auto max-w-4xl">
                <RegisterProfileForm
                    email={
                        session.email || ""
                    }
                />
            </div>
        </main>
    );
}