import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.arabianchain.wallet",
  appName: "DubxMobileWallet",
  webDir: "dist",
  server: {
    androidScheme: "https",
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 500,
      launchAutoHide: true,
      androidScaleType: "CENTER_CROP",
      splashImmersive: true,
      backgroundColor: "#0f0e13",
      // launchShowDuration: 3000,
      // launchAutoHide: true,
      //launchFadeOutDuration: 3000,
      // backgroundColor: "#0f0e13",
      //androidSplashResourceName: "splash",
      // androidScaleType: "CENTER_CROP",
      //showSpinner: true,
      //androidSpinnerStyle: "large",
      // spinnerColor: "#999999",
      //splashFullScreen: true,
      // splashImmersive: true,
      //layoutName: "launch_screen",
      //useDialog: true,
      // launchAutoHide: false,
      // androidScaleType: "CENTER_CROP",
      // showSpinner: true,
      // splashFullScreen: false,
      // splashImmersive: false,
    },
  },
};

export default config;
