import { StyleSheet } from "react-native";
import Icons from "@expo/vector-icons/MaterialCommunityIcons";
import Title from "@design/Text/Title";
import Text from "@design/Text/Text";
import { Variables } from "@style";
import CenteredView from "@design/View/CenteredView";
import SecondaryButton from "@design/Button/SecondaryButton";
import DefaultView from "./DefaultView";

type Props = {
  title?: string;
  description: string;
  icon?: string;
  onPress?: () => void;
};

const EmptyView = ({ title, description, icon, onPress }: Props) => {
  if (!title && !icon && !onPress) {
    return (
      <DefaultView>
        <Text color="light" style={styles.text}>
          {description}
        </Text>
      </DefaultView>
    )
  }
  
  return (
    <CenteredView>
      {icon ? <Icons name={`${icon}-outline`} size={Variables.sizes.xxxl} color={Variables.colors.gray} /> : null}
      {title ? <Title style={[styles.title, styles.text]}>{title}</Title> : null}
      <Text color="light" style={styles.text}>
        {description}
      </Text>
      {onPress ? <SecondaryButton onPress={onPress} style={styles.button}>
        Toevoegen
      </SecondaryButton> : null}
    </CenteredView>
  );
};

const styles = StyleSheet.create({
  title: {
    marginVertical: Variables.sizes.xs,
  },
  text: {
    textAlign: "center",
    paddingHorizontal: Variables.sizes.large,
  },
  button: {
    marginTop: Variables.sizes.medium,
  },
});

export default EmptyView;