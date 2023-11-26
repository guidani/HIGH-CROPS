import { ClerkProvider } from "@clerk/clerk-expo";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import * as SecureStore from "expo-secure-store";
import { StyleSheet } from "react-native";
import "react-native-gesture-handler";
import Routes from "./src/routes";
import SignInWithOAuth from "./src/views/Auth/SignInWithOAuth";

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

export default function App() {
  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY || ""}
    >
      <SignedIn>
        <Routes />
      </SignedIn>
      <SignedOut>
        <SignInWithOAuth />
      </SignedOut>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
