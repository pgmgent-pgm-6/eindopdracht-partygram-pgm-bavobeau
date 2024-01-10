import { useState } from "react";
import { SwitchComponent, Text } from "react-native";

export type SwitchProps = {
  name?: string;
  value: string;
  children?: string;
}

const Switch = ({ value, children}: SwitchProps) => {
  const [switchValue, setSwitchValue] = useState(false);
  const toggleSwitch = () => setSwitchValue(previousState => !previousState);
  return (
    <>
      <SwitchComponent value={switchValue} onValueChange={toggleSwitch} />
      <Text>{children}</Text>
    </>
  )
}

export default Switch