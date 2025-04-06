type RegisterUser = {
  firstname: string;
  lastname: string;
  username: string;
  password: string;
};

type LoginUser = {
  username: string;
  password: string;
};

type PostGet = {
  title: string;
  content: string;
};

type PostDesc = {
  title: string;
  id: string;
};

type Post = {
  id: number;
  title: string;
  content: string;
  authorId: number;
};

export {
  type RegisterUser,
  type LoginUser,
  type PostGet,
  type PostDesc,
  type Post,
};
