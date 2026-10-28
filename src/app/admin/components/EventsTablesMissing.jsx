/* Shown on the events admin pages until db/013_events.sql has been run. */
export default function EventsTablesMissing() {
    return (
        <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            Run db/013_events.sql in phpMyAdmin first.
        </div>
    );
}
