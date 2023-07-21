import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.arabianchain.wallet",
  appName: "DubxMobileWallet",
  webDir: "dist",
  server: {
    androidScheme: "https",
  },
};

export default config;
