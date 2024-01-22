import { useRouter } from "expo-router";
import { Pressable, Text } from "react-native";
import React from "react";

interface ProcessedWord {
  text: string;
  isHashtag: boolean;
}

const processHashtags = (text: string): JSX.Element => {
  const router = useRouter();
  const words = text.split(" "); // Split by word boundaries

  const processedWords: ProcessedWord[] = words.map((word, index) => {
    if (word.startsWith('#')) {
      const hashtag = word.substring(1);
      return { text: hashtag, isHashtag: true };
    }
    return { text: word, isHashtag: false };
  });

  const result = processedWords.map((processedWord, index) => {
    if (processedWord.isHashtag) {
      return (
        <Pressable
          key={index} // Add a unique key to each Pressable element
          onPress={() => router.push(`/search?q=${processedWord.text}`)}
        >
          <Text>{`#${processedWord.text}`}</Text>
        </Pressable>
      );
    }
    return <Text key={index}>{processedWord.text}</Text>;
  });

  return <>{result}</>;
};

export default processHashtags;