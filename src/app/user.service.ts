import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import {
  type RegisterUser,
  LoginUser,
  GetAllPosts,
  GetAllPostsByUserId,
  GetPostById,
  EditPost,
  CreatePost,
} from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:8080/';
  private http = inject(HttpClient);

  public userLoggedIn = signal(false);

  logout() {
    this.userLoggedIn.set(false);
    localStorage.removeItem('token');
  }

  registerUser(user: RegisterUser) {
    return this.http.post<{ user: RegisterUser; message: string }>(
      this.baseUrl + 'register',
      user
    );
  }

  loginUser(user: LoginUser) {
    return this.http.post<{ message: string; token: string }>(
      this.baseUrl + 'login',
      user
    );
  }

  getAllPosts() {
    return this.http.get<{ message: string; posts: GetAllPosts[] }>(
      this.baseUrl + 'post'
    );
  }

  getAllPostsByUserId(headers: { [key: string]: string } = {}) {
    return this.http.get<{ message: string; posts: GetAllPostsByUserId[] }>(
      this.baseUrl + 'post/user',
      { headers }
    );
  }

  getPostById(postId: number) {
    return this.http.get<{ message: string; post: GetPostById }>(
      this.baseUrl + `post/${String(postId)}`
    );
  }

  createPost(
    headers: { [key: string]: string } = {},
    post: { title: string; content: string; description: string }
  ) {
    return this.http.post<{ message: string; post: CreatePost }>(
      this.baseUrl + 'post',
      post,
      { headers }
    );
  }

  editPost(
    headers: { [key: string]: string } = {},
    post: { title: string; content: string; description: string },
    postId: number
  ) {
    return this.http.post<{ message: string; post: EditPost }>(
      this.baseUrl + `post/${String(postId)}`,
      post,
      { headers }
    );
  }

  constructor() {}
}
