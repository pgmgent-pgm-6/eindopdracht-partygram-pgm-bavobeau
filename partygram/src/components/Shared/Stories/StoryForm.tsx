import * as yup from "yup";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import isVoid from "@core/utils/isVoid";
import { getCurrentSession } from "@core/modules/auth/api";
import { uploadImage } from "@core/modules/files/api";
import { Bucket } from "@core/modules/files/constants";
import AppForm from "@shared/Formik/AppForm";
import DefaultView from "@design/View/DefaultView";
import ErrorMessage from "@design/Text/ErrorMessage";
import Button from "@design/Button/Button";
import ImagePickerDialog from "@design/ImagePicker/ImagePickerDialog";
import PostImage from "@design/Posts/PostImage";
import { View, StyleSheet } from "react-native";
import AppSubmitButton from "@shared/Formik/AppSubmitButton";
import { Variables } from "@style";
import { CreateStoryBody } from "@core/modules/stories/types";

const getSchema = () => {
  return yup.object().shape({
    image: yup.string(),
  });
};

type Props<T> = {
  initialValues: T;
  onSucces: () => void;
  updateMethod: (values: T) => Promise<any>;
  label: string;
};

const StoryForm = <T extends CreateStoryBody>({
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
  };

  const handleSubmit = async (values: T) => {
    if (image) {
      const session = await getCurrentSession();
      const fileName = `${session?.user.id}/${Date.now()}.jpg`;
      await uploadImage(Bucket.Stories, fileName, image);
      values.image = fileName;
      mutate(values);
    }
  };

  return (
    <AppForm
      validationSchema={getSchema()}
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      <DefaultView vertical={false} horizontal={true} style={styles.container}>
        {isError && <ErrorMessage error={error} />}
        <Button onPress={() => setShowPicker(true)} disabled={isPending}>
          {image ? "Change image" : "Add image"}
        </Button>
        {showPicker && (
          <ImagePickerDialog
            onImage={handleImage}
            onDismiss={() => setShowPicker(false)}
          />
        )}
        {image && (
          <View style={styles.imageContainer}>
            <PostImage source={{ uri: `data:image/jpeg;base64,${image}` }} />
          </View>
        )}
        <AppSubmitButton disabled={isPending || !image}>
          {isPending ? "Loading..." : label}
        </AppSubmitButton>
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

export default StoryForm;
