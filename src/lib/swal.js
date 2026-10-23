/*
 * SweetAlert2 is only needed once a form is submitted, so it loads on
 * first use instead of with every page. If the script cannot be fetched
 * (for example the connection dropped), the same text is shown in a
 * plain browser alert so the visitor still gets the message.
 */
export async function fireSwal(options) {
    let Swal;

    try {
        ({ default: Swal } = await import("sweetalert2"));
    } catch (error) {
        console.error("SweetAlert2 could not be loaded:", error);

        window.alert(
            [options?.title, options?.text]
                .filter(Boolean)
                .join("\n\n")
        );

        return { isConfirmed: true };
    }

    return Swal.fire(options);
}

/*
 * Starts fetching SweetAlert2 without showing anything. Call it when a
 * form appears so the dialog is ready by the time it is submitted.
 */
export function preloadSwal() {
    import("sweetalert2").catch(() => {
        // fireSwal retries the import and falls back to an alert.
    });
}
