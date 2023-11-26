import { useOAuth } from "@clerk/clerk-expo";
import * as WebBrowser from "expo-web-browser";
import React from "react";
import { Button, View } from "react-native";
import { Text } from "react-native-paper";
import { useWarmUpBrowser } from "../../hooks/warmUpBrowser";

WebBrowser.maybeCompleteAuthSession();

const SignInWithOAuth = () => {
  // Warm up the android browser to improve UX
  // https://docs.expo.dev/guides/authentication/#improving-user-experience
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        //setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text variant="headlineLarge">HIGH CROPS</Text>
      <Text variant="bodyMedium">Entre para continuar</Text>
      <Button title="Sign in with Google" onPress={onPress} />
    </View>
  );
};
export default SignInWithOAuth;
