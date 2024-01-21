import { CreateCommentBody } from "@core/modules/comments/types";
import AppForm from "@shared/Formik/AppForm";
import { useMutation } from "@tanstack/react-query";
import * as yup from "yup";
import { View } from "react-native";
import ErrorMessage from "@design/Text/ErrorMessage";
import AppTextField from "@shared/Formik/AppTextField";
import AppSubmitButton from "@shared/Formik/AppSubmitButton";

const getSchema = () => {
  return yup.object().shape({
    description: yup.string().required(),
  });
};

type Props<T> = {
  initialValues: T;
  onSucces: () => void;
  updateMethod: (values: T) => Promise<any>;
  label: string;
};

const CommentForm = <T extends CreateCommentBody>({
  initialValues,
  updateMethod,
  onSucces,
  label,
}: Props<T>) => {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: updateMethod,
    onSuccess: onSucces,
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
          name="description"
          label="Description"
          keyboardType="default"
          disabled={isPending}
        />
        <AppSubmitButton disabled={isPending}>{label}</AppSubmitButton>
      </View>
    </AppForm>
  )
}

export default CommentForm;