import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

import global_en from "./translations/en/global.json";
import global_es from "./translations/es/global.json";
import global_ar from "./translations/ar/global.json";
import global_de from "./translations/de/global.json";
import global_ru from "./translations/ru/global.json";
import global_pl from "./translations/pl/global.json";
import global_sk from "./translations/sk/global.json";
import global_sr from "./translations/sr/global.json";
import i18next from "i18next";
import { I18nextProvider } from "react-i18next";

i18next.init({
  interpolation: { escapeValue: false },
  lng: "en",
  resources: {
    en: {
      global: global_en,
    },
    es: {
      global: global_es,
    },
    ar: {
      global: global_ar,
    },
    de: {
      global: global_de,
    },
    ru: {
      global: global_ru,
    },
    pl: {
      global: global_pl,
    },
    sk: {
      global: global_sk,
    },
    sr: {
      global: global_sr,
    },
  },
});

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>
  </React.StrictMode>
);
