import { PrismaClient, User, Post } from '@prisma/client';
import { NewPostRequestDTO, UpdatePostRequestDTO } from './posts/dto';
import { compareSync, hashSync } from 'bcrypt';
import { CreateNewUserRequestDTO } from './auth/dto';

export type { User, Post };

const prisma = new PrismaClient();

export const getAllPosts = () => {
  return prisma.post.findMany({
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
};

export const getPost = (id: number) => {
  return prisma.post.findFirst({
    where: {
      id,
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
};

export const createNewPost = (data: NewPostRequestDTO, authorId: number) => {
  return prisma.post.create({
    data: {
      ...data,
      authorId,
    },
  });
};

export const updatePost = (authorId: number, postId: number, postData: UpdatePostRequestDTO) => {
  return prisma.user.update({
    where: {
      id: authorId,
    },
    data: {
      posts: {
        update: {
          where: {
            id: postId,
          },
          data: postData,
        },
      },
    },
  });
};

export const deletePost = (authorId: number, postId: number) => {
  return prisma.user.update({
    where: {
      id: authorId,
    },
    data: {
      posts: {
        delete: {
          id: postId,
        },
      },
    },
  });
};

export const createNewUser = ({ name, email, password }: CreateNewUserRequestDTO) => {
  return prisma.user.create({
    data: {
      name,
      email,
      password: hashPassword(password),
    },
  });
};

export const verifyUserAndSelect = async (email: string, password: string) => {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!user || !verifyPassword(password, user.password)) {
    throw new Error('User not found');
  }

  const { password: x, ...safeUser } = user;

  return safeUser;
};

const hashPassword = (password: string) => hashSync(password, 10);
const verifyPassword = (password: string, hash: string) => compareSync(password, hash);
