import React from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";

interface Props {
  children: React.ReactNode;
}

export default function ViewLayout({ children }: Props) {
  const theme = useTheme();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      {children}
    </View>
  );
}
