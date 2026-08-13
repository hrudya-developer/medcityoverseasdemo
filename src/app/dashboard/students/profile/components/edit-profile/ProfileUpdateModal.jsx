"use client";

"use client";

import EditProfileHeader from "./EditProfileHeader";
import EditProfileForm from "./EditProfileForm";
import useEditProfile from "./useEditProfile";

export default function ProfileUpdateModal({
    open,
    onClose,
    profile,
    onUpdated,
}) {
    const {
        form,
        loading,
        updateField,
        submit,
    } = useEditProfile({
        open,
        profile,

        onUpdated:
            async () => {
                await onUpdated?.();

                onClose();
            },
    });

    if (!open) {
        return null;
    }

    return (
        <div
            className="
                fixed
                inset-0
                z-[100]

                flex
                items-center
                justify-center

                bg-slate-950/55

                p-4

                backdrop-blur-sm
            "
            onMouseDown={
                loading
                    ? undefined
                    : onClose
            }
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="edit-profile-title"

                onMouseDown={(event) =>
                    event.stopPropagation()
                }

                className="
                    max-h-[92vh]

                    w-full
                    max-w-3xl

                    overflow-y-auto

                    rounded-[28px]

                    border
                    border-white/70

                    bg-white

                    shadow-[0_30px_90px_rgba(15,23,42,0.30)]
                "
            >
                <EditProfileHeader
                    loading={
                        loading
                    }
                    onClose={
                        onClose
                    }
                />

                <EditProfileForm
                    form={form}
                    loading={
                        loading
                    }
                    updateField={
                        updateField
                    }
                    onSubmit={
                        submit
                    }
                    onCancel={
                        onClose
                    }
                />
            </div>
        </div>
    );
}