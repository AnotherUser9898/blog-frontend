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

type CreatePost = {
  id: number;
  title: string;
  content: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  authorId: number;
};

type EditPost = CreatePost;

type GetAllPosts = {
  id: number;
  title: string;
  description: string;
  updatedAt: Date;
  author: {
    firstname: string;
    lastname: string;
  };
};

type GetPostById = {
  title: string;
  content: string;
  updatedAt: Date;
  description: string;
  author: {
    firstname: string;
    lastname: string;
  };
};

type GetAllPostsByUserId = {
  id: number;
  title: string;
  description: string;
  updatedAt: Date;
};

export {
  type RegisterUser,
  type LoginUser,
  type GetAllPostsByUserId,
  type GetAllPosts,
  type GetPostById,
  type EditPost,
  type CreatePost,
};
