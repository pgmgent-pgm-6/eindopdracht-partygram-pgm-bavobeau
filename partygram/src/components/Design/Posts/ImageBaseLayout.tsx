import { StyleSheet } from "react-native";
import { StyleProp, View } from "react-native";

type Props = {
  style?: StyleProp<Object>;
  children: React.ReactNode;
}

const ImageBaseLayout = ({ style, children }: Props) => {
  return (
    <View style={[styles.container, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
})

export default ImageBaseLayout;