import { useAuth } from "@clerk/clerk-expo";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";

export default function SignOutButton() {
  const { isLoaded, signOut } = useAuth();

  if (!isLoaded) {
    return null;
  }

  return (
    <View>
      <Button
        onPress={() => {
          signOut();
        }}
        icon={() => <FontAwesome name="sign-out" size={24} color="black" />}
      >
        {""}
      </Button>
    </View>
  );
}
