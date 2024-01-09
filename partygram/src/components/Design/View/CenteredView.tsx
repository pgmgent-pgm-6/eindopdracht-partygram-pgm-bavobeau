import { StyleProp, StyleSheet, View, ViewProps, ViewStyle } from "react-native";
import { Variables } from "@style";

type Props = {
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
} & ViewProps;

const CenteredView = ({ style, children, ...props }: Props) => {
  return (
    <View style={[styles.view, style]} {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: Variables.sizes.xxl,
  },
});

export default CenteredView;