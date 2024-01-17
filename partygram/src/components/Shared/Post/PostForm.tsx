import * as yup from "yup";
import { CreatePostBody } from "@core/modules/posts/types";
import ErrorMessage from "@design/Text/ErrorMessage";
import AppForm from "@shared/Formik/AppForm";
import { useMutation } from "@tanstack/react-query";
import { View, StyleSheet } from "react-native";
import AppTextField from "@shared/Formik/AppTextField";
import AppSubmitButton from "@shared/Formik/AppSubmitButton";
import isVoid from "@core/utils/isVoid";
import { useState } from "react";
import ImagePickerDialog from "@design/ImagePicker/ImagePickerDialog";
import { getCurrentSession } from "@core/modules/auth/api";
import { uploadImage } from "@core/modules/files/api";
import { Bucket } from "@core/modules/files/constants";
import PostImage from "@design/Posts/PostImage";
import { Variables } from "@style";
import Button from "@design/Button/Button";
import DefaultView from "@design/View/DefaultView";

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

const PostForm = <T extends CreatePostBody>({
  initialValues,
  updateMethod,
  onSucces,
  label,
}: Props<T>) => {
  const [image, setImage] = useState<string>();
  const [showPicker, setShowPicker] = useState(false);
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: updateMethod,
    onSuccess: onSucces,
  });

  const handleImage = async (image: string) => {
    setShowPicker(false);
    if (!isVoid(image)) {
      setImage(image);
    }
  }

  const handleSubmit = async (values: T) => {
    if (image) {
      const session = await getCurrentSession();
      const fileName = `${session?.user.id}/${Date.now()}.jpg`;
      await uploadImage(Bucket.Posts, fileName, image);
      values.image = fileName;
      mutate(values);
    }
  };

  return (
    <AppForm
      initialValues={{ ...initialValues }}
      validationSchema={getSchema()}
      onSubmit={handleSubmit}
    >
      <DefaultView vertical={false} horizontal={true} style={styles.container}>
        {isError && <ErrorMessage error={error} />}
        <Button onPress={() => setShowPicker(true)}>
          Choose image
        </Button>
        {showPicker && (
          <ImagePickerDialog
            onDismiss={() => setShowPicker(false)}
            onImage={handleImage}
          />
        )}
        {image && (
          <View style={styles.imageContainer}>
            <PostImage source={{ uri: `data:image/jpeg;base64,${image}` }} />
          </View>
        )}
        <AppTextField
          name="description"
          label="Description"
          placeholder="Description"
          disabled={isPending}
        />
        <AppSubmitButton disabled={isPending}>{isPending ? 'Creating...' : label}</AppSubmitButton>
      </DefaultView>
    </AppForm>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: Variables.sizes.medium,
  },
  imageContainer: {
    width: "100%",
    height: 225,
  },
});

export default PostForm;
