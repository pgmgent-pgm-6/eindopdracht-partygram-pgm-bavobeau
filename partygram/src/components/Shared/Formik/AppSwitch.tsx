import { useFormikContext } from "formik";
import React from "react";
import Switch, { SwitchProps } from "@design/Form/Switch";

type Props = SwitchProps

const AppSwitch = ({ name, value, children }: Props) => {
  const { values, errors, touched, setFieldValue, handleBlur } = useFormikContext<Record<string, any>>();
  const hasError = errors[name] && touched[name];

  return (
  <Switch value={value}>
    {children}
  </Switch>
  )
};

export default AppSwitch;
