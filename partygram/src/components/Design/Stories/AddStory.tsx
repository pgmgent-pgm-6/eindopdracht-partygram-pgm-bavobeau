import Icons from "@expo/vector-icons/MaterialCommunityIcons";
import { Variables } from "@style";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet } from "react-native"

const AddStory = () => {
  const router = useRouter();

  const handleAddStory = () => {
    router.push("/stories/create");
  }

  return (
    <Pressable style={styles.container} accessibilityLabel={"Add story"} onPress={handleAddStory} android_ripple={{ borderless: true }}>
      <Icons name={"plus"} color={Variables.colors.text} size={Variables.sizes.xxl} />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 64,
    height: 64,
    borderRadius: 64,
    backgroundColor: Variables.colors.grayLight,
    marginHorizontal: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AddStory