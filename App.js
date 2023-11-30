
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { authentication } from './config'; // Check the path to your config file
import Header from './header'; // Adjust the path to your Header component

import Login from './src/Login';
import Registration from './src/Registration';
import Dashboard from './src/Dashboard'; 
import Home from './src/Home';
import CreatePost from './src/CreatePost';
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
            name="CreatePost"
            component={CreatePost}
            options={{
              headerTitle: () => <Header name="CreatePost" />,
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