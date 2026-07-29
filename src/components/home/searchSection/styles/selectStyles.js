export const selectStyles = {
    control: (base) => ({
        ...base,
        minHeight: "40px",
        border: "none",
        backgroundColor: "transparent",
        boxShadow: "none",
        cursor: "pointer",

        "&:hover": {
            border: "none",
        },
    }),

    valueContainer: (base) => ({
        ...base,
        padding: "0 4px",
    }),

    singleValue: (base) => ({
        ...base,
        color: "#ffffff",
        fontSize: "13px",
        fontWeight: 700,
    }),

    placeholder: (base) => ({
        ...base,
        color: "rgba(255,255,255,0.65)",
        fontSize: "13px",
        fontWeight: 600,
    }),

    input: (base) => ({
        ...base,
        color: "#ffffff",
        fontSize: "13px",
        margin: 0,
        padding: 0,
    }),

    dropdownIndicator: (base) => ({
        ...base,
        color: "rgba(255,255,255,0.6)",
        padding: 4,

        "&:hover": {
            color: "#ffffff",
        },
    }),

    clearIndicator: (base) => ({
        ...base,
        color: "rgba(255,255,255,0.55)",
        padding: 4,

        "&:hover": {
            color: "#ffffff",
        },
    }),

    indicatorSeparator: () => ({
        display: "none",
    }),

    loadingIndicator: (base) => ({
        ...base,
        color: "#ffffff",
    }),

    menuPortal: (base) => ({
        ...base,
        zIndex: 999999,
    }),

    menu: (base) => ({
        ...base,
        marginTop: 8,
        padding: 6,
        borderRadius: 16,
        overflow: "hidden",
        border: "1px solid #e2e8f0",
        boxShadow:
            "0 20px 45px rgba(15,23,42,0.18)",
    }),

    menuList: (base) => ({
        ...base,
        maxHeight: 240,
        padding: 4,
    }),

    option: (base, state) => ({
        ...base,
        padding: "11px 12px",
        borderRadius: 10,
        fontSize: "13px",
        fontWeight: state.isSelected
            ? 700
            : 600,
        cursor: "pointer",

        backgroundColor: state.isSelected
            ? "#c01f53"
            : state.isFocused
                ? "#fdf2f6"
                : "#ffffff",

        color: state.isSelected
            ? "#ffffff"
            : state.isFocused
                ? "#c01f53"
                : "#334155",
    }),

    noOptionsMessage: (base) => ({
        ...base,
        fontSize: "13px",
        color: "#64748b",
    }),
};