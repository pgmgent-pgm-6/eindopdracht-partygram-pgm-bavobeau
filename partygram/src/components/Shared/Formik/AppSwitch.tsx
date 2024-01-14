import SwitchComp, { SwitchProps } from "@design/Form/SwitchComp";
import { useFormikContext } from "formik";

type Props = Omit<SwitchProps, "value" | "onChangeSwitch">;

const AppSwitch = ({ name, label, ...rest }: Props) => {
  const { values, errors, touched, setFieldValue, handleBlur } = useFormikContext<Record<string, any>>();
  const hasError = errors[name] && touched[name];

  return (
    <SwitchComp
      name={name}
      label={label}
      value={values[name]}
      onChangeSwitch={(bool: boolean) => setFieldValue(name, bool)}
      onBlur={handleBlur(name)}
      error={hasError ? errors[name] : null}
      {...rest}
    />
  );
};

export default AppSwitch;
