export const getThemeIcon = (theme) => {
    switch (theme) {
        case "dark": return "moon";
        case "light": return "sunny";
        default: return "desktop-outline";
    }
};

export const darkBtn = [
    { text: "light", icon: "sunny" },
    { text: "dark", icon: "moon" },
    { text: "system", icon: "desktop-outline" }
];