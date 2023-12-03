import React from 'react';
import { FlatList } from 'react-native';
import { Divider, List, Text } from 'react-native-paper';
import useGetHistory from '../hooks/useGetHistory';

interface IProps {
  valor: string;
}

export default function ShowFlatListHistoryBySensor({ valor }: IProps) {
  const { history } = useGetHistory(valor);

  return (
    <FlatList
      data={history}
      ItemSeparatorComponent={() => <Divider />}
      ListEmptyComponent={() => (
        <Text variant="bodyLarge" style={{ paddingHorizontal: 10 }}>
          Nada encontrado.
        </Text>
      )}
      renderItem={({ item, index }) => {
        return (
          <List.Item
            key={index}
            title={`Última irrigação em: ${item}`}
          />
        );
      }}
    />
  )
}