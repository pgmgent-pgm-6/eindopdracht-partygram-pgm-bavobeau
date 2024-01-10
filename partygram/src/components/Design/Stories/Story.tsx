import { Variables } from '@style';
import React from 'react'
import { Image, ImageStyle, Pressable, StyleProp, StyleSheet } from 'react-native';

type Props = {
  story_id: string;
  style?: StyleProp<ImageStyle>;
};

const Story = ({style}: Props) => {
  return (
    <Pressable>
      <Image style={[styles.story, style]} source={require("@assets/images/favicon.png")} />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  story: {
    width: 64,
    height: 64,
    borderRadius: 64,
    borderWidth: 3,
    borderColor: Variables.colors.secondary,
    backgroundColor: Variables.colors.grayLight,
    marginHorizontal: 8,
  },
});

export default Story;