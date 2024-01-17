import { Image, ImageSourcePropType, StyleProp, StyleSheet } from "react-native";
import ImageBaseLayout from "./ImageBaseLayout";

type Props = {
  style?: StyleProp<Object>;
  source: ImageSourcePropType;
}

const PostImage = ({style, source}: Props) => {
  return (
    <ImageBaseLayout style={style}>
      <Image style={styles.image} source={source} resizeMode="cover" />
    </ImageBaseLayout>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
  },
});

export default PostImage