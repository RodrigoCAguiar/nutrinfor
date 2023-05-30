import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

import { styles } from './styles';

export function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>Refeições</Text>
      <StatusBar style="auto" />
    </View>
  );
}