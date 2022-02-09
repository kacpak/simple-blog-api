import * as yup from 'yup';

export const newPostRequestSchema = yup
  .object({
    title: yup.string().min(3).required(),
    content: yup.string().required(),
    published: yup.boolean().optional(),
  })
  .noUnknown();

export type NewPostRequestDTO = yup.InferType<typeof newPostRequestSchema>;

export const updatePostRequestSchema = yup
  .object({
    title: yup.string().optional(),
    content: yup.string().optional(),
    published: yup.boolean().optional(),
  })
  .noUnknown();
export type UpdatePostRequestDTO = yup.InferType<typeof updatePostRequestSchema>;
