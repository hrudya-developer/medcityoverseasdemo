import StudentShell from "./StudentShell";

import AuthBootstrap from "./AuthBootstrap";

export default function StudentLayout({
    children,
}) {
    return (
        <AuthBootstrap>
            <StudentShell>
                {children}
            </StudentShell>
        </AuthBootstrap>
    );
}