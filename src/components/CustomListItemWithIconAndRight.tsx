import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from 'react';
import { List, Text, useTheme } from 'react-native-paper';

interface IProps {
  title: string;
  iconName?: any;
  rightValue: any;
}

export default function CustomListItemWithIconAndRight({ iconName = "exclamation", rightValue = 0, title = "title" }: IProps) {
  const theme = useTheme();
  return (
    <List.Item
      title={title}
      style={{
        paddingHorizontal: 10,
        backgroundColor: `${theme.colors.primary}`,
        margin: 4,
        borderRadius: 10,
      }}
      left={(props) => (
        <MaterialCommunityIcons
          name={iconName}
          size={24}
          color="black"
        />
      )}
      right={(props) => <Text variant="bodyLarge" style={{ fontWeight: '700' }}>{rightValue}</Text>}
    />
  )
}