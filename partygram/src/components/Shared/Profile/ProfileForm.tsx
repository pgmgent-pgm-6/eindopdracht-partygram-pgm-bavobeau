import { CreateProfileBody, UpdateProfileBody } from '@core/modules/profiles/types';
import AppForm from '@shared/Formik/AppForm';
import { useMutation } from '@tanstack/react-query';
import * as yup from 'yup';
import { View } from 'react-native';
import ErrorMessage from '@design/Text/ErrorMessage';
import AppTextField from '@shared/Formik/AppTextField';
import AppSwitch from '@shared/Formik/AppSwitch';
import AppSubmitButton from '@shared/Formik/AppSubmitButton';

const getSchema = () => {
  return yup.object().shape({
    username: yup.string(),
    first_name: yup.string(),
    last_name: yup.string(),
    condition: yup.boolean(),
  });
};

type Props<T, U> = {
  initialValues: T;
  onSuccess: (data: U) => void;
  updateMethod: (values: T) => Promise<U>;
  label: string;
};

const ProfileForm = <T extends CreateProfileBody | UpdateProfileBody, U>({
  initialValues,
  onSuccess,
  updateMethod,
  label,
}: Props<T, U>) => {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: updateMethod,
    onSuccess: onSuccess,
  });

  const handleSubmit = async (data: T) => {
    mutate(data);
  }

  return (
    <AppForm
      initialValues={{ ...initialValues}}
      onSubmit={handleSubmit}
      validationSchema={getSchema()}
    >
      <View>
        {isError && <ErrorMessage error={error} />}
        <AppTextField name="username" label="Username" disabled={isPending} />
        <AppTextField
          name="first_name"
          label="First name"
          disabled={isPending}
        />
        <AppTextField name="last_name" label="Last name" disabled={isPending} />
        <AppSwitch
          name="condition"
          label="Do you agree with our conditions?"
          disabled={isPending}
        />
        <AppSubmitButton disabled={isPending}>{label}</AppSubmitButton>
      </View>
    </AppForm>
  )
}

export default ProfileForm;