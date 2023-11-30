
import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import Swiper from 'react-native-swiper';
import { MaterialIcons } from '@expo/vector-icons'; // Assuming you have the necessary icon library

const DetailScreen = ({ route }) => {
  // Destructure parameters from route
  const { title, category, keywords, content, location, price, images } = route.params;

  return (
    <ScrollView style={styles.container}>
      {/* Image Slider */}
      <View style={styles.imageContainer}>
        {images && images.length > 0 && (
          <Swiper style={styles.wrapper} showsButtons>
            {images.map((imageUrl, index) => (
                <Image  key={index} source={{ uri: String(imageUrl) }} style={styles.image} />
  
            ))}
          </Swiper>
        )}
      </View>
    
      {/* Rest of your content */}
      <View style={styles.headerContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.category}>{category}</Text>
      </View>
      <View style={styles.keywordsContainer}>
        <Text style={styles.keywordsText}>{keywords}</Text>
      </View>
      <View style={styles.locationContainer}>
        <MaterialIcons name="location-on" size={24} color="#333" />
        <Text style={styles.locationText}>{location}</Text>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.priceText}>{price}</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.contentText}>{content}</Text>
      </View>
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    height: 400,
  },
  wrapper: {},
  image: {
    flex: 1,
    width: null,
    height: null,
  },
    
  headerContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  category: {
    fontSize: 18,
    color: '#666',
  },
  keywordsContainer: {
    backgroundColor: '#9905DB',
    padding: 8,
    margin: 16,
    borderRadius: 8,
  },
  keywordsText: {
    fontSize: 16,
    color: '#fff',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
  },
  locationText: {
    fontSize: 16,
    marginLeft: 8,
    color: '#333',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#9905DB',
  },
  contentContainer: {
    padding: 16,
  },
  contentText: {
    fontSize: 16,
    color: '#333',
  },
});

export default DetailScreen;
