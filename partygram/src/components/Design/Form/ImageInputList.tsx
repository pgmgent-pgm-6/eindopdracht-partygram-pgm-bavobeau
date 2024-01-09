import { StyleSheet, View } from "react-native"
import UploadedImage from "./UploadedImage";
import ImageUpload from "./ImageUpload";

const ImageInputList = () => {
  return (
    <View style={styles.imageInput}>
      <UploadedImage onPress={() => ("")} imageUri={require("@assets/images/icon.png")} />
      <ImageUpload onPress={() => ("")}/>
    </View>
  )
}

const styles = StyleSheet.create({
  imageInput:{
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    paddingVertical: 10,
  },
});


export default ImageInputList