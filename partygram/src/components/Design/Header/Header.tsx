import IconButton from "@design/Button/IconButton";
import Text from "@design/Text/Text";
import { Variables } from "@style";
import { StyleSheet, StyleProp, View, ViewStyle } from "react-native"

type Props = {
  title: string;
  style?: StyleProp<ViewStyle>;
  icon: string;
  iconTitle: string;
  iconOnPress: () => void;
}

const Header = ({ title, style, icon, iconTitle, iconOnPress }: Props) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>{title}</Text>
      <IconButton title={iconTitle} icon={icon} onPress={iconOnPress} />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: Variables.sizes.horizontalPadding,
    paddingVertical: Variables.sizes.small,
    backgroundColor: Variables.colors.white,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Header