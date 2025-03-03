import React, { createContext, useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { SETTINGS_DATA } from "../api/endpoints/settings/index.jsx"; // SETTINGS_DATA işlevini buraya bağlayın.

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
    const [settings, setSettings] = useState(null);

    // Veri yükleme işlemi
    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const result = await SETTINGS_DATA();
                setSettings(result);
            } catch (error) {
                console.error("Ayarlar yüklenirken hata oluştu:", error);
            }
        };
        fetchSettings();
    }, []);

    return (
        <SettingsContext.Provider value={settings}>
            {children}
        </SettingsContext.Provider>
    );
};

// Kullanım kolaylığı için özel bir hook
export const useSettings = () => useContext(SettingsContext);
