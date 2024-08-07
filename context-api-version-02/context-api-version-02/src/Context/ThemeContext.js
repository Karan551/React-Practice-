import { createContext, useContext } from "react";

export const ThemeContext = createContext({
    themeMode: "light",
    darkMode: () => { },
    lightMode: () => { },
});


export const ThemeContextProvider = ThemeContext.Provider;


export function themeSwitcher() {
    return useContext(ThemeContext);
}