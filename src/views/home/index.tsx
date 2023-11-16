import React from "react";
import { useTheme } from "react-native-paper";
import HomeStackRoutes from "../../routes/stack.routes";

interface Props {
  navigation: any;
}

export default function Home({ navigation }: Props) {
  const theme = useTheme();
  return (
 
    <HomeStackRoutes />
  );
}
