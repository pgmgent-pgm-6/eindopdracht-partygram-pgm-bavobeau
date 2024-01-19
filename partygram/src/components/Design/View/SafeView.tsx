import { StyleProp, StyleSheet, ViewProps, ViewStyle } from "react-native";
import { Variables } from "@style";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
  style?: StyleProp<ViewStyle>;
  vertical?: boolean;
  horizontal?: boolean;
  children?: React.ReactNode;
} & ViewProps;

const SafeView = ({ style, vertical = true, horizontal = false, children, ...props }: Props) => {
  return (
    <SafeAreaView style={[styles.view, vertical && styles.verticalPadding, horizontal && styles.horizontalPadding, style]} {...props}>
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  verticalPadding: {
    paddingVertical: 0, 
  },
  horizontalPadding: {
    paddingHorizontal: Variables.sizes.xl,
  }
});

export default SafeView;