import { useAuth, useUser } from "@clerk/clerk-expo";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";
import { ActivityIndicator, Avatar, Card, Text } from "react-native-paper";
import ViewCenter from "../../components/ViewCenter";

export default function UserStartPage() {
  const { isLoaded, userId } = useAuth();
  const { user } = useUser();

  if (!isLoaded) {
    return (
      <ViewCenter>
        <Text variant="displaySmall">Você não está logado(a)!</Text>
      </ViewCenter>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 12, gap: 4 }}>
      <Card>
        <Card.Title
          title={`${user?.firstName
            ?.charAt(0)
            .toUpperCase()}${user?.firstName?.slice(1)}`}
          subtitle={user?.emailAddresses.toString()}
          left={() => (
            <Avatar.Image
              size={24}
              source={{ uri: user?.imageUrl }}
              onError={() => (
                <FontAwesome name="user" size={24} color="black" />
              )}
              onProgress={() => <ActivityIndicator />}
            />
          )}
        />
        <Card.Content>
          <Text variant="bodyMedium">ID: {userId}</Text>
        </Card.Content>
      </Card>
    </View>
  );
}
