import { useRouter } from "expo-router";
import { Pressable, Text, StyleSheet } from "react-native";
import React from "react";
import { Variables } from "@style";

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
          key={index}
          onPress={() => {router.push(`/search?q=${processedWord.text}`)}}
        >
          <Text style={styles.hashtag}>{`#${processedWord.text}`}</Text>
        </Pressable>
      );
    }
    return <Text style={styles.text} key={index}>{processedWord.text}</Text>;
  });

  return <>{result}</>;
};

const styles = StyleSheet.create({
  hashtag: {
    color: Variables.colors.primary,
    fontFamily: Variables.fonts.bold,
    paddingRight: Variables.sizes.xxs,
  },
  text: {
    paddingRight: Variables.sizes.xxs,
  }
});

export default processHashtags;