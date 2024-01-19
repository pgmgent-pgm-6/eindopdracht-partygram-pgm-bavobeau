import * as yup from "yup";

const getSchema = () => {
  return yup.object().shape({
    description: yup.string().required(),
  });
};

const CommentForm = () => {
  return (
    <>
    </>
  )
}

export default CommentForm;