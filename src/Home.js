import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, FlatList, ScrollView, Modal, StyleSheet, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { db } from '../config'; // Adjust the import path based on your project structure
import { collection, addDoc, updateDoc, doc, onSnapshot, deleteDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigation } from '@react-navigation/native';





export default function App() {
  const [posts, setPosts] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newKeywords, setNewKeywords] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [editingPost, setEditingPost] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  
  // Inside your Home component
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'community'), (snapshot) => {
      const postsArray = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPosts(postsArray);
    });

    return () => unsubscribe();
  }, []);

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
        };
        
  
        if (image) {
          postData.image = image;
        }
  
        await addDoc(collection(db, 'community'), postData);
        setNewCategory('');
        setNewTitle('');
        setNewContent('');
        setNewKeywords('');
        setNewLocation('');
        setNewPrice('');
        setImage(null);
        setModalVisible(false);
      } catch (error) {
        console.error('Error adding post:', error);
      }
    }
  };
  
  const updatePost = async () => {
    if (editingPost) {
      try {
        const postData = {
          category: newCategory,
          title: newTitle,
          content: newContent,
          keywords: newKeywords,
          location: newLocation,
          price: newPrice,
        };
  
        if (image) {
          postData.image = image;
        }
  
        await updateDoc(doc(db, 'community', editingPost.id), postData);
        setEditingPost(null);
        setNewCategory('');
        setNewTitle('');
        setNewContent('');
        setNewKeywords('');
        setNewLocation('');
        setNewPrice('');
        setImage(null);
        setModalVisible(false);
      } catch (error) {
        console.error('Error updating post:', error);
      }
    }
  };
  
  

  const cancelEdit = () => {
    setEditingPost(null);
    setNewCategory('');
    setNewTitle('');
    setNewContent('');
    setNewKeywords('');
    setImage(null);
    setModalVisible(false);
  };

  const deletePost = async (id) => {
    try {
      const postRef = doc(db, 'community', id);
      await deleteDoc(postRef);
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };
  


    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    console.log('Selected Image URI:', result["assets"][0]["uri"]);
    if (!result.cancelled) {
      try {
        const storage = getStorage();
        const response = await fetch(result["assets"][0]["uri"]);
        const blob = await response.blob();
  
        // Generate a unique name for the image
        const imageName = `${Date.now()}_${result["assets"][0]["uri"].substring(result["assets"][0]["uri"].lastIndexOf('/') + 1)}`;
        
        // Reference to the storage bucket
        const storageRef = ref(storage, 'images/' + imageName);
        console.log(storageRef)
        // Upload the image to Firebase Storage
        await uploadBytes(storageRef, blob);
  
        // Get the download URL
        const downloadURL = await getDownloadURL(storageRef);
  
        setImage(downloadURL);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const editPost = (item) => {
    setEditingPost(item);
    setNewCategory(item.category);
    setNewTitle(item.title);
    setNewContent(item.content);
    setNewKeywords(item.keywords);
    setNewLocation(item.location);
    setNewPrice(item.price);
    setImage(item.image || null);
    setModalVisible(true);
  };
  
  
  
  

  
  
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 25, marginBottom: 25, marginTop: 30 }}>게시판</Text>

      {/* 검색 창 */}
      <TextInput
        style={styles.searchInput}
        placeholder="글 제목, 내용"
        // 추가 검색 로직
      />

      {/* 게시판 목록 */}
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.flatListItem}>
            <TouchableOpacity
              onPress={() => {
                // navigation.navigate('Test');  // navigate logic 구현 예정\
                navigation.navigate('Detail', {
                  title: item.title,
                  category: item.category,
                  keywords: item.keywords,
                  content: item.content,
                  location: item.location,
                  price: item.price,
                  image: item.image,
                });
              }}
              onLongPress={() => setEditingItem(editingItem === item ? null : item)} // 버튼 숨기기
            >
              <View style={{ flexDirection: 'row' }}>
                {item.image && <Image source={{ uri: item.image }} style={{ width: 80, height: 80, marginRight: 10, marginBottom: 10}} />}
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.title}</Text>
                  <Text>{item.category}</Text>
                  <Text style={{ padding:2,borderRadius: 8,}}>{item.keywords}</Text>
                  <Text>{item.price}원</Text>
                </View>
              </View>
            </TouchableOpacity>
            {editingItem === item && (
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Button title="수정" onPress={() => editPost(item)} color="purple" />
                <Button title="삭제" onPress={() => deletePost(item.id)} color="purple" />
              </View>
            )}
          </View>
        )}
      />

      {/* 글 작성 */}
      <View style={{ position: 'absolute', bottom: 20, right: 20 }}>
        <Button title="글 작성" onPress={() => setModalVisible(true)} color="purple"/>
      </View>

      {/* 게시글 작성 및 수정 */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={false}
      >
        <ScrollView style={{ flex: 1, padding: 20 }}>
          <Text style={{ fontSize: 24, marginBottom: 20 }}>
            {editingPost ? '게시글 수정' : '글 작성'}
          </Text>
          
          {image && <Image source={{ uri: image }} style={{ width: 100, height: 100, marginBottom: 10 }}/>}
          <Button title="이미지 업로드" onPress={pickImage} color="purple" />

          <TextInput
            style={[styles.textInput, { marginTop: 10 }]}
            placeholder="제목"
            value={newTitle}
            onChangeText={(text) => setNewTitle(text)}
          />
          <TextInput
            style={styles.textInput}
            placeholder="카테고리"
            value={newCategory}
            onChangeText={(text) => setNewCategory(text)}
          />
          <TextInput
            style={styles.textInput}
            placeholder="키워드(#)"
            value={newKeywords}
            onChangeText={(text) => setNewKeywords(text)}
          />
          <TextInput
              style={styles.textInput}
              placeholder="위치"
              value={newLocation}
              onChangeText={(text) => setNewLocation(text)}
            />
            <TextInput
              style={styles.textInput}
              placeholder="가격"
              value={newPrice}
              onChangeText={(text) => setNewPrice(text)}
            />
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: 'gray',
              padding: 8,
              marginBottom: 10,
              minHeight: 200, 
              textAlign: 'left', 
              textAlignVertical: 'top', 
            }}
            placeholder="내용을 입력하세요"
            value={newContent}
            onChangeText={(text) => setNewContent(text)}
            multiline={true} 
          />
          <View style={styles.buttonContainer}>
            <Button
              title={editingPost ? '수정' : '작성'}
              onPress={editingPost ? updatePost : addPost} color="purple"
            />
            <Button title="취소" onPress={cancelEdit} color="purple"/>
          </View>
        </ScrollView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  keywordsContainer: {
    backgroundColor: '#F5F5F5',
    padding: 8,
    margin: 16,
    borderRadius: 8,
  },
  
  keywordsText: {
    fontSize: 16,
    color: '#333',
    borderRadius: 8,  // Add this line
  },
  flatListItem: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 8,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 8,
    marginBottom: 10,
  },
});