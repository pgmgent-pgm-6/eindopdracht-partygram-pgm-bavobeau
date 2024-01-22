import { CreateThreadBody } from "@core/modules/threads/types";
import AppForm from "@shared/Formik/AppForm";
import { useMutation } from "@tanstack/react-query";
import { View } from "react-native";
import ErrorMessage from "@design/Text/ErrorMessage";
import AppTextField from "@shared/Formik/AppTextField";
import AppSubmitButton from "@shared/Formik/AppSubmitButton";
import * as yup from "yup";

const getSchema = () => {
  return yup.object().shape({
    message: yup.string().required(),
  });
};

type Props<T> = {
  initialValues: T;
  updateMethod: (values: T) => Promise<any>;
  label: string;
};

const ThreadForm = <T extends CreateThreadBody>({
  initialValues,
  updateMethod,
  label,
}: Props<T>) => {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: updateMethod,
    onSuccess: () => {},
  });

  const handleSubmit = async (values: T) => {
    mutate(values);
  };

  return (
    <AppForm
      initialValues={initialValues}
      validationSchema={getSchema()}
      onSubmit={handleSubmit}
    >
      <View>
        {isError && <ErrorMessage error={error} />}
        <AppTextField
          name="message"
          label="Message"
          keyboardType="default"
          disabled={isPending}
        />
        <AppSubmitButton disabled={isPending}>{label}</AppSubmitButton>
      </View>
    </AppForm>
  );
};

export default ThreadForm;
