import { useState } from 'react'
import { updateProfile } from 'firebase/auth'
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  ActivityIndicator
} from 'react-native'

import { styles } from './styles'
import { FirebaseService } from '../../services/firebase'

export function SignUpScreen({ navigation }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function signUp() {
    if (email === '' && password === '') {
      Alert.alert("Insira dados corretamente!");
    } else {
      try {
        setIsLoading(true);
        await FirebaseService.signUp(name, email, password)
        setIsLoading(false);
        navigation.navigate('SignIn');
      } catch (e) {
        console.error(e);
        setIsLoading(false);
      }
    }
  }

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#9E9E9E" />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Nome Completo"
        value={name}
        onChangeText={(text) => setName(text)}
        textContentType='name'
        returnKeyType='next'
      />

      <TextInput
        style={styles.textInput}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType='email-address'
        textContentType='emailAddress'
        returnKeyType='next'
      />

      <TextInput
        style={styles.textInput}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
        textContentType='password'
        returnKeyType='send'
        enablesReturnKeyAutomatically
        onSubmitEditing={() => signUp()}
      />

      <Button
        color="#3740FE"
        title="Cadastro"
        onPress={signUp}
      />

      <Text style={styles.signText}
        onPress={() => navigation.navigate('Login')}>
        Já está cadastrado? Clique aqui para fazer login!
      </Text>
    </View>
  );
}
