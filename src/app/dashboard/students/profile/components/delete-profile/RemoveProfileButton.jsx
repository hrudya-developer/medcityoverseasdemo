"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function RemoveProfileButton({ uid }) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        if (!uid) {
            await Swal.fire({
                icon: "error",
                title: "User ID not found",
                text: "Unable to identify the current user.",
            });

            return;
        }

        const result = await Swal.fire({
            title: "Delete account?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete account",
            cancelButtonText: "Cancel",
            reverseButtons: true,
            focusCancel: true,
        });

        if (!result.isConfirmed) return;

        try {
            setLoading(true);

            Swal.fire({
                title: "Deleting account...",
                text: "Please wait.",
                allowOutsideClick: false,
                allowEscapeKey: false,
                didOpen: () => {
                    Swal.showLoading();
                },
            });

            const response = await fetch(
                "/api/dashboard/student/profile/delete-profile",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        uid: String(uid),
                    }),
                }
            );

            const data = await response
                .json()
                .catch(() => null);

            if (!response.ok) {
                throw new Error(
                    data?.msg ||
                        `Delete failed with status ${response.status}`
                );
            }

            if (data?.status !== true) {
                throw new Error(
                    data?.msg ||
                        "Unable to delete account."
                );
            }

            await Swal.fire({
                icon: "success",
                title: "Account deleted",
                text:
                    data?.msg ||
                    "Your profile has been deleted successfully.",
                confirmButtonText: "OK",
            });

            localStorage.removeItem("token");
            localStorage.removeItem("user");

            router.replace("/login");
            router.refresh();
        } catch (error) {
            console.error(
                "Delete account error:",
                error
            );

            await Swal.fire({
                icon: "error",
                title: "Delete failed",
                text:
                    error instanceof Error
                        ? error.message
                        : "Something went wrong while deleting the account.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="
                inline-flex
                items-center
                gap-2
                rounded-xl
                border
                border-red-200
                bg-red-50
                px-4
                py-2.5
                text-xs
                font-bold
                text-red-600
                transition-all

                hover:-translate-y-0.5
                hover:border-red-300
                hover:bg-red-100

                disabled:cursor-not-allowed
                disabled:opacity-50
            "
        >
            <Trash2 size={14} />

            {loading
                ? "Deleting..."
                : "Delete Account"}
        </button>
    );
}