import { Variables } from "@style";
import { Image, ImageURISource, Pressable, StyleSheet, View } from "react-native"

type Props = {
  onPress: () => void;
  imageUri: ImageURISource;
};

const UploadedImage = ({onPress, imageUri}: Props) => {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <Image source={imageUri} style={styles.image} />
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
    resizeMode: "cover",
    width: 80,
    height: 80,
    borderRadius: 15,
  },
});

export default UploadedImage