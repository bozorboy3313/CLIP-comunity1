// import{ View, Text, TouchableOpacity,TextInput,StyleSheet} from 'react-native'
// import React, {useState} from 'react';
// import {useNavigation } from '@react-navigation/native';
// import {firebase} from '../config';



// const Login = () => {
//     const navigation = useNavigation()
//     const [email, setEmail] =useState('')
//     const [password, setPassword] = useState('')

//     loginUser = async(email,password) =>{
//         try {
//             await firebase.auth().signInWithEmailAndPassword(email,password)
//                     } catch (error){
//                         alert(error.message)
//                     }
//     }

//     return (
//         <View style={styles.container}>
//             <Text style={{fontWeight:'bold',fontSize:26}}>
//                 로그인
//             </Text>
//             <View style={{marginTop:40}}>
//             <TextInput
//                 style={styles.textInput}
//                 placeholder="Email"
//                 onChangeText={(email)=>setEmail(email)}
//                 autoCapitalize="none"
//                 autoCorrect={false}/>

//             <TextInput
//                 style={styles.textInput}
//                 placeholder="Password"
//                 onChangeText={(Password)=>setPassword(Password)}
//                 autoCapitalize="none"
//                 autoCorrect={false}
//                 secureTextEntry={true}
//                 />
//             </View>
//             <TouchableOpacity
//             onPress={()=> loginUser(email,password)}
//             style={styleS.button}
//             >
//                 <Text style={{fontWeight:'bold',fontSize:22}}>Login</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//             onPress={()=> navigation.navigate('Registration')}
//             style={{marginTop:20}}
//             >
//                 <Text style={{fontWeight:'bold',fontSize:16}}>
//                     계정이 없으신까요? 회원 가입하기
//                     </Text>
//             </TouchableOpacity>
//         </View>
//     )

// }

// export default Login


// const styles = StyleSheet.create({
//     container: {
//         flex:1,
//         alignItems:'center',
//         margin:100,
//     },
//     textInput:{
//         paddingTop:20,
//         paddingBottom:10,
//         width:400,
//         fontSize:20,
//         borderBottomWidth:1,
//         borderBottomColor:'#0000',
//         marginBottom:10,
//         textAlign:'center'
//     },
//     button:{
//         marginTop:50,
//         height:70,
//         width:250,
//         backgroundColor:'#9905DB',
//         alignItems:'center',
//         justifyContent:'center',
//         borderRadius:50,

//     }
// })




import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { authentication } from '../config';
import { signInWithEmailAndPassword } from 'firebase/auth';



const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  loginUser = async (email, password) => {
    try {
      await signInWithEmailAndPassword(authentication, email, password);
      alert("로그인 됐습니다");
    } catch (error) {
        alert("아이디이나 비밀번호가 다릅니다");
    }
  };  
  

  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: 'bold', fontSize: 26 }}>
        로그인
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
        onPress={() => loginUser(email, password)}
        style={styles.button}
      >
        <Text style={{ fontWeight: 'bold', fontSize: 22 }}>로그인</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Registration')}
        style={{ marginTop: 20 }}
      >
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
          계정이 없으신가요? 회원 가입하기
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

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
