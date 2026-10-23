"use client";

import dynamic from "next/dynamic";

/*
 * The counselling modal pulls in the form, react-select, the phone
 * field, SimpleBar and SweetAlert2. It renders nothing until it is
 * opened, so its code is fetched on the first open instead of with
 * every page.
 */
const CounsellingModal = dynamic(
    () => import("./CounsellingModal"),
    { ssr: false }
);

export default function LazyCounsellingModal({
    open,
    onClose,
}) {
    if (!open) {
        return null;
    }

    return (
        <CounsellingModal
            open={open}
            onClose={onClose}
        />
    );
}
