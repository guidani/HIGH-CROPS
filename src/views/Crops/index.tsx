import { View, Text } from 'react-native'
import React from 'react'
import CropsStackRoutes from '../../routes/cropstack.routes'


interface Props {
  navigation: any;
  route: any;
}


export default function Crops({ route, navigation }: Props) {
  return (
    <CropsStackRoutes/>
  )
}