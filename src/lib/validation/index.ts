import * as z from "zod";

export const SignupValidation = z.object({
    name: z.string().min(2, {message: 'To short'}),
    username: z.string().min(2, {message: 'To short'}),
    email: z.string().email({message: 'Invalid email'}),
    password: z.string().min(8, {message: 'Password must be at least 8 characters long'}),
  });

  export const SigninValidation = z.object({
    email: z.string().email({message: 'Invalid email'}),
    password: z.string().min(8, {message: 'Password must be at least 8 characters long'}),
  });

  export const PostValidation = z.object({
    caption: z.string().min(5, {message: 'To short'}).max(2200, {message: 'To long'}),
    file: z.custom<File[]>(),
    location: z.string().min(2, {message: 'To short'}).max(100, {message: 'To long'}),
    tags: z.string()
  });