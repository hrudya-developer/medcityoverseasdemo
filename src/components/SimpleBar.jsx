"use client";

import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

export default function CustomScrollbar({
    children,
    className = "",
}) {
    return (
        <SimpleBar
            className={className}
            autoHide={true}
            timeout={700}
        >
            {children}
        </SimpleBar>
    );
}