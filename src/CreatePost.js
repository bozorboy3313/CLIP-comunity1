import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../config'; // Adjust the import path based on your project structure

export default function CreatePost() {
  const [newCategory, setNewCategory] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newKeywords, setNewKeywords] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [images, setImages] = useState([]);
  
  const navigation = useNavigation();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsMultipleSelection: true,
    });
  
    console.log('Selected Image URIs:', result.assets.map((asset) => asset.uri));
  
    if (!result.cancelled) {
      //try {
        const storage = getStorage();
        const promises = result.assets.map(async (asset) => {
          const response = await fetch(asset.uri);
  
          // Log the content-type header
          console.log('Content Type:', response.headers.get('content-type'));
  
          // Check if the image format is supported (JPEG or PNG)
          if (
            response.headers.get('content-type').startsWith('image/jpeg') ||
            response.headers.get('content-type').startsWith('image/png')
          ) {
            const blob = await response.blob();
  
            // Generate a unique name for the image
            const imageName = `${Date.now()}_${asset.uri.substring(asset.uri.lastIndexOf('/') + 1)}`;
  
            // Reference to the storage bucket
            const storageRef = ref(storage, 'images/' + imageName);
  
            // Upload the image to Firebase Storage
            await uploadBytes(storageRef, blob);
            const urlFromFirebase = []
            // Get the download URL
            const downloadURL = await getDownloadURL(storageRef);
            urlFromFirebase.push(downloadURL)
            console.log(urlFromFirebase)
            return urlFromFirebase;
            
          } else {
            console.error('Unsupported image format:', response.headers.get('content-type'));
            return null; // or handle accordingly
          }
        });
  
        // Wait for all promises to resolve
        const validImageUrls = (await Promise.all(promises)).filter((url) => url !== null);
  
        // Update state with the new image URLs
        setImages([...images, ...validImageUrls]);
      //} catch (error) {
        //console.error('Error uploading image:', error);
      //}
    }
  };

  const addPost = async () => {
    if (newCategory && newTitle && newContent && newKeywords) {
      try {
        const postData = {
          category: newCategory,
          title: newTitle,
          content: newContent,
          keywords: newKeywords,
          location: newLocation,
          price: newPrice,
          images: images || [], // Ensure images is an array
        };

        await addDoc(collection(db, 'community'), postData);

        // Clear state after submission
        setNewCategory('');
        setNewTitle('');
        setNewContent('');
        setNewKeywords('');
        setNewLocation('');
        setNewPrice('');
        setImages([]);

        // Navigate back to the main screen or any other screen
        navigation.goBack();
      } catch (error) {
        console.error('Error adding post:', error);
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Create a New Post</Text>

      {/* Your input fields go here */}
      <TextInput
        style={styles.input}
        placeholder="Category"
        value={newCategory}
        onChangeText={(text) => setNewCategory(text)}
      />
      {/* ... (similar TextInput components for other fields) */}

      {/* Display selected images */}
      {/* {images.length > 0 && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {images.map((imageUrl, index) => (
            <Image key={index} source={{ uri: imageUrl }} style={styles.image} />
          ))}
        </ScrollView>
      )} */}

      {/* Button to pick images */}
      <Button title="Pick Images" onPress={pickImage} />

      {/* Button to add the post */}
      <Button title="Add Post" onPress={addPost} />


    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 8,
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
    marginBottom: 10,
  },
});
