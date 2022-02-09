import * as yup from 'yup';

export const createNewUserRequestSchema = yup.object({
  name: yup.string().min(1).required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export type CreateNewUserRequestDTO = yup.InferType<typeof createNewUserRequestSchema>;
