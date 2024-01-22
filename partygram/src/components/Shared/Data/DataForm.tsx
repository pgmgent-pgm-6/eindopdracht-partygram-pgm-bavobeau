import { Data } from '@core/modules/data/types';
import AppForm from '@shared/Formik/AppForm';
import AppSubmitButton from '@shared/Formik/AppSubmitButton';
import AppSwitch from '@shared/Formik/AppSwitch';
import { useMutation } from '@tanstack/react-query';
import * as yup from 'yup';

const getSchema = () => {
  return yup.object({
    likes: yup.boolean(),
    stories: yup.boolean(),
  });
};

type Props<T> = {
  initialValues: T;
  onSuccess: () => void;
  updateMethod: (values: T) => Promise<any>;
  label: string;
};

const DataForm = <T extends Data>({
  initialValues,
  onSuccess,
  updateMethod,
  label,
}: Props<T>) => {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: updateMethod,
    onSuccess: onSuccess,
  });

  const handleSubmit = async (data: T) => {
    mutate(data);
  };
  return (
    <AppForm
      initialValues={{ ...initialValues }}
      validationSchema={getSchema()}
      onSubmit={handleSubmit}
    >
      <AppSwitch name="likes" label="Do you want to see likes?" disabled={isPending} />
      <AppSwitch name="stories" label="Do you want to see stories?" disabled={isPending} />
      <AppSubmitButton disabled={isPending}>{label}</AppSubmitButton> 
    </AppForm>
  )
}

export default DataForm