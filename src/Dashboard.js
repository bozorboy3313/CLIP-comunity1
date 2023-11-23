// import{ View, Text,} from 'react-native'
// import React from 'react'

// const dashboard = () => {
//     return (
//         <View>
//             <Text>Dashboard</Text>
//         </View>
//     )

// }

// export default dashboard


import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { authentication } from '../config'; // Adjust the path as needed
import { signOut } from 'firebase/auth'; // Import the signOut method

const Dashboard = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await signOut(authentication); // Call signOut on the authentication object
      navigation.navigate('Login'); // Navigate back to the login view
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text></Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
