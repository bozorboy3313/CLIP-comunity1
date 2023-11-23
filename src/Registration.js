
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {  authentication } from '../config'; // Import createUserWithEmailAndPassword
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';




const Registration = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegistration = async () => {
    try {
      await createUserWithEmailAndPassword(authentication, email, password);
      alert('Registration successful');
      navigation.navigate('Login');
    } catch (error) {
      alert('Error during registration: ' + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: 'bold', fontSize: 26 }}>
      회원가입
      </Text>
      <View style={{ marginTop: 40 }}>
        <TextInput
          style={styles.textInput}
          placeholder="이메일"
          onChangeText={(email) => setEmail(email)}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput
          style={styles.textInput}
          placeholder="비밀번호"
          onChangeText={(Password) => setPassword(Password)}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
        />
      </View>
      <TouchableOpacity
        onPress={() => handleRegistration()}
        style={styles.button}
      >
        <Text style={{ fontWeight: 'bold', fontSize: 22 }}>회원가입</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
        style={{ marginTop: 20 }}
      >
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
          계정이 있으신까요? 로그인하기 
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Registration;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    margin: 100,
  },
  textInput: {
    paddingTop: 20,
    paddingBottom: 10,
    width: 400,
    fontSize: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#0000',
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    marginTop: 50,
    height: 70,
    width: 250,
    backgroundColor: '#9905DB',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
});
