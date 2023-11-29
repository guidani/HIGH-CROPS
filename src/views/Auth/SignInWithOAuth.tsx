import { useAuth, useOAuth } from "@clerk/clerk-expo";
import * as WebBrowser from "expo-web-browser";
import React from "react";
import { Button } from "react-native";
import { Text } from "react-native-paper";
import ViewCenter from "../../components/ViewCenter";
import { useWarmUpBrowser } from "../../hooks/warmUpBrowser";

WebBrowser.maybeCompleteAuthSession();

const SignInWithOAuth = () => {
  const { userId } = useAuth();
  // Warm up the android browser to improve UX
  // https://docs.expo.dev/guides/authentication/#improving-user-experience
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        //@ts-ignore
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <ViewCenter>
      <Text variant="headlineLarge">HIGH CROPS</Text>
      <Text variant="bodyMedium">Entre para continuar</Text>
      <Button title="Entrar com o Google" onPress={onPress} />
    </ViewCenter>
  );
};
export default SignInWithOAuth;
