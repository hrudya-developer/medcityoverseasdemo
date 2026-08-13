"use client";

import PersonalFields from "@/app/(public)/register-user-profile/components/PersonalFields";
import DobField from "@/app/(public)/register-user-profile/components/DobField";
import ContactField from "@/app/(public)/register-user-profile/components/ContactField";
import GenderField from "@/app/(public)/register-user-profile/components/GenderField";
import AddressField from "@/app/(public)/register-user-profile/components/AddressField";

import EditProfileActions from "./EditProfileActions";

export default function EditProfileForm({
    form,
    loading,
    updateField,
    onSubmit,
    onCancel,
}) {
    function handleSubmit(
        event
    ) {
        event.preventDefault();

        onSubmit();
    }

    return (
        <form
            onSubmit={
                handleSubmit
            }
            className="
                space-y-4
                p-6
                sm:p-7
            "
        >
            <PersonalFields
                form={form}
                email={
                    form.email
                }
                onChange={
                    updateField
                }
            />

            <div
                className="
                    grid
                    grid-cols-1
                    gap-4
                    sm:grid-cols-2
                "
            >
                <DobField
                    value={
                        form.dob
                    }
                    onChange={(
                        value
                    ) =>
                        updateField(
                            "dob",
                            value
                        )
                    }
                />

                <ContactField
                    form={form}
                    onChange={
                        updateField
                    }
                />
            </div>

            <GenderField
                value={
                    form.gender
                }
                onChange={(
                    value
                ) =>
                    updateField(
                        "gender",
                        value
                    )
                }
            />

            <AddressField
                value={
                    form.address
                }
                onChange={(
                    value
                ) =>
                    updateField(
                        "address",
                        value
                    )
                }
            />

            <EditProfileActions
                loading={
                    loading
                }
                onCancel={
                    onCancel
                }
            />
        </form>
    );
}