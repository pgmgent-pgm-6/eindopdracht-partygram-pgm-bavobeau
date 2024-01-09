import { Variables } from '@style';
import { Image, Pressable, StyleSheet, View } from 'react-native'

type Props = {
  onPress: () => void;
};

const ImageUpload = ({onPress}: Props) => {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <Image source={require("@assets/images/icon.png")} style={styles.image} />
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Variables.colors.grayLight,
    width: 80,
    height: 80,
    borderRadius: 15,
  },
  image: {
    width: 40,
    height: 40,
  },
});

export default ImageUpload