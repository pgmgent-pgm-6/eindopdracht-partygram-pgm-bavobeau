import Icons from "@expo/vector-icons/MaterialCommunityIcons";
import { Variables } from "@style";
import { Pressable, StyleSheet } from "react-native"

type Props = {
  title: string; 
  icon: string;
  onPress?: () => void;
}

const StoryButton = ({title, icon, onPress}: Props) => {
  return (
    <Pressable style={styles.container} accessibilityLabel={title} onPress={onPress} android_ripple={{ borderless: true }}>
      <Icons name={icon} color={Variables.colors.text} size={Variables.sizes.xxl} />
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

export default StoryButton;