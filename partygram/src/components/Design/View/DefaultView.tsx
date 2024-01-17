import { StyleProp, StyleSheet, View, ViewProps, ViewStyle } from "react-native";
import { Variables } from "@style";

type Props = {
  style?: StyleProp<ViewStyle>;
  vertical?: boolean;
  horizontal?: boolean;
  children?: React.ReactNode;
} & ViewProps;

const DefaultView = ({ style, vertical = true, horizontal = false, children, ...props }: Props) => {
  return (
    <View style={[styles.view, vertical && styles.verticalPadding, horizontal && styles.horizontalPadding, style]} {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  verticalPadding: {
    paddingTop: Variables.sizes.xl, 
  },
  horizontalPadding: {
    paddingHorizontal: Variables.sizes.xl,
  }
});

export default DefaultView;