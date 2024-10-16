import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import React, { useState } from 'react';
import { db } from './Firebase'; // Import your Firestore instance
import { collection, addDoc } from 'firebase/firestore'; // Import Firestore functions

const validEmojis = [
  {
    emoji: '😊',
    description: 'Smiling Face with Smiling Eyes',
    backgroundImage: require('./assets/Happy.jpg'),
    recommendations: ['Go for a walk', 'Listen to music', 'Call a friend', 'Write in a journal'],
  },
  {
    emoji: '😢',
    description: 'Crying Face',
    backgroundImage: require('./assets/Portrait-of-a-man-crying-009.webp'),
    recommendations: ['Watch a movie', 'Talk to someone', 'Meditate', 'Have a treat'],
  },
  {
    emoji: '💪',
    description: 'Confident',
    backgroundImage: require('./assets/Confident.jpg'),
    recommendations: ['Do a workout', 'Read a book', 'Try a new hobby', 'Make a to-do list'],
  },
  {
    emoji: '😠',
    description: 'Angry Face',
    backgroundImage: require('./assets/Angry.jpg'),
    recommendations: ['Take deep breaths', 'Go for a run', 'Write your thoughts', 'Do some yoga'],
  },
  {
    emoji: '❤️',
    description: 'Red Heart',
    backgroundImage: require('./assets/Love.jpg'),
    recommendations: ['Show gratitude', 'Help someone', 'Practice self-care', 'Cook a meal'],
  },
];

export default function App() {
  const [submittedEmoji, setSubmittedEmoji] = useState(null); // Store the selected emoji object
  const [selectedRecommendation, setSelectedRecommendation] = useState(null); // Store the selected recommendation

  const handleEmojiSubmit = async (selectedEmojiData) => {
    try {
      await addDoc(collection(db, 'emojis'), { emoji: selectedEmojiData.emoji });
      setSubmittedEmoji(selectedEmojiData);
      setSelectedRecommendation(null); 
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const handleRecommendationSelect = (recommendation) => {
    setSelectedRecommendation(recommendation);
  };

  return (
    <View style={styles.container}>
      {submittedEmoji && (
        <Image
          source={submittedEmoji.backgroundImage}
          style={styles.backgroundImage}
        />
      )}

      {selectedRecommendation ? (
        <View style={styles.overlayContainer}>
          <Text style={styles.recommendationText}>Great, now go {selectedRecommendation}!</Text>
        </View>
      ) : (
        submittedEmoji ? (
          <View style={styles.overlayContainer}>
            <Text style={styles.heading}>Here are some recommendations for you:</Text>
            <FlatList
              data={submittedEmoji.recommendations}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.recommendationButton}
                  onPress={() => handleRecommendationSelect(item)}
                >
                  <Text style={styles.recommendationText}>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        ) : (
          <View>
            <Text>How are you feeling?</Text>
            <View style={styles.emojiContainer}>
              {validEmojis.map((item) => (
                <TouchableOpacity
                  key={item.emoji}
                  onPress={() => handleEmojiSubmit(item)}
                >
                  <Text style={styles.emoji}>{item.emoji}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )
      )}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures the container takes up the full screen
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    position: 'absolute', // Keep the image in the background
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // Ensures the image covers the entire screen
  },
  overlayContainer: {
    flex: 1, // Ensures the content takes up the remaining screen space
    justifyContent: 'center', // Centers the content vertically
    alignItems: 'center', // Centers the content horizontally
    padding: 30,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000', // White text color for readability
    marginBottom: 20,
  },
  recommendationButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 15,
    marginVertical: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  recommendationText: {
    fontSize: 16,
    color: '#000',
  },
  emojiContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
    width: '100%',
  },
  emoji: {
    fontSize: 40,
    padding: 10,
  },
});
