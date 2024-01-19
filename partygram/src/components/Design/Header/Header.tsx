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
  iconMiddle?: string;
  iconMiddleTitle?: string;
  iconMiddleOnPress?: () => void;
}

const Header = ({ title, style, icon, iconTitle, iconOnPress, iconMiddle, iconMiddleTitle, iconMiddleOnPress }: Props) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>{title}</Text>
      {iconMiddle && iconMiddleTitle &&
        <IconButton title={iconMiddleTitle} icon={iconMiddle} onPress={iconMiddleOnPress} />
      }
      <IconButton title={iconTitle} icon={icon} onPress={iconOnPress} />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: Variables.sizes.horizontalPadding,
    paddingVertical: Variables.sizes.medium,
    backgroundColor: Variables.colors.white,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Header