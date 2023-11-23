// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import React,{ useState, useEffect } from "react";
// import { firebase  } from './config';

// import Login from './src/Login';
// import Registration from './src/Registration';
// import Dashboard from './src/Dashboard';
// import Header from './componentst/header';

// const Stack = createNativeStackNavigator();
// const auth = firebase.auth();


// function App(){
//   const [initializing, setInitializing] =useState(true);
//   const [user, setUser] = useState();

//   function onAuthStateChanged(user){
//     setUser(user);
//     if (initializing) setInitializing(false);

//   }
//   useEffect(() =>{
//     const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
//     return subscriber;

//   }, []);
//   if (initializing) return null;

//   if (!user){
//     return(
//       <Stack.Navigator>
//         <Stack.Screen
//         name="Login" 
//         component={Login}
//         options={{
//           headerTitle: () => <Header name="CLIP"/>,
//           headerStyle: {
//             height:150,
//             borderBottomLeftRadius:50,
//             borderBottomRightRadius:50,
//             backgroundColor:'#9905DB',
//             shadowColor:'#000',
//             elevation:25

//           }
        
//         }}
//         />
//         <Stack.Screen
//         name="Registration" 
//         component={Registration}
//         options={{
//           headerTitle: () => <Header name="CLIP"/>,
//           headerStyle: {
//             height:150,
//             borderBottomLeftRadius:50,
//             borderBottomRightRadius:50,
//             backgroundColor:'#9905DB',
//             shadowColor:'#000',
//             elevation:25
            
//           }
        
//         }}
//         />
//       </Stack.Navigator>
//     )
//   }
//   return(
//     <Stack.Navigator>
// <Stack.Screen
//         name="dashboard" 
//         component={dashboard}
//         options={{
//           headerTitle: () => <Header name="dashbpard"/>,
//           headerStyle: {
//             height:150,
//             borderBottomLeftRadius:50,
//             borderBottomRightRadius:50,
//             backgroundColor:'#9905DB',
//             shadowColor:'#000',
//             elevation:25
            
//           }
        
//         }}
//         />
//     </Stack.Navigator>
//   )
// }
// export default () => {
//   return(
//     <NavigationContainer>
//       <App/>
//     </NavigationContainer>
//   )
// }


import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { authentication } from './config'; // Check the path to your config file
import Header from './header'; // Adjust the path to your Header component

import Login from './src/Login';
import Registration from './src/Registration';
import Dashboard from './src/Dashboard'; 
import Home from './src/Home';
import DetailScreen from './src/DetailScreen';


const Stack = createNativeStackNavigator();

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = authentication.onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user ? (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                headerTitle: () => <Header name="CLIP" />,
                headerStyle: {
                  height: 150,
                  borderBottomLeftRadius: 50,
                  borderBottomRightRadius: 50,
                  backgroundColor: '#9905DB',
                  shadowColor: '#000',
                  elevation: 25,
                },
              }}
            />
            <Stack.Screen
              name="Registration"
              component={Registration}
              options={{
                headerTitle: () => <Header name="CLIP" />,
                headerStyle: {
                  height: 150,
                  borderBottomLeftRadius: 50,
                  borderBottomRightRadius: 50,
                  backgroundColor: '#9905DB',
                  shadowColor: '#000',
                  elevation: 25,
                },
              }}
            />
          </>
        ) : (
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerTitle: () => <Header name="Home" />,
              headerStyle: {
                height: 150,
                borderBottomLeftRadius: 50,
                borderBottomRightRadius: 50,
                backgroundColor: '#9905DB',
                shadowColor: '#000',
                elevation: 25,
              },
            }}
          />
        )}
        {/* Add DetailScreen to the stack */}
        <Stack.Screen name="Detail" component={DetailScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;