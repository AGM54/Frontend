export type RootStackParamList = {
  Welcome: undefined;
  Register: undefined;
  Login: undefined;
  ForgotPassword: undefined;
  Electricidad: undefined;
  ElectronLesson: undefined;
  Generacion: undefined;
  Vcr: undefined;
  ConductoresYa: undefined;
  Cnne: undefined;
  Tabs: undefined;
};

export type TabParamList = {
  Home: undefined;
  Progress: undefined;
  Profile: undefined;
};



// types/env.d.ts
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // Firebase variables
      EXPO_PUBLIC_FIREBASE_API_KEY: string;
      EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN: string;
      EXPO_PUBLIC_FIREBASE_PROJECT_ID: string;
      EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET: string;
      EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: string;
      EXPO_PUBLIC_FIREBASE_APP_ID: string;
      EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID: string;
      
      // Otras variables que puedas tener
      EXPO_PUBLIC_API_URL?: string;
      EXPO_PUBLIC_APP_ENV?: 'development' | 'staging' | 'production';
    }
  }
}

export {};