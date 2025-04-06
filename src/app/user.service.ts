import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { type RegisterUser, LoginUser, Post, PostGet } from './user.model';

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
    return this.http.get<{ message: string; posts: Post[] }>(
      this.baseUrl + 'post'
    );
  }

  getAllPostsByUserId(headers: { [key: string]: string } = {}) {
    return this.http.get<{ message: string; posts: Post[] }>(
      this.baseUrl + 'post/user',
      { headers }
    );
  }

  getPostById(postId: number) {
    return this.http.get<{ message: string; post: Post }>(
      this.baseUrl + `post/${String(postId)}`
    );
  }

  createPost(
    headers: { [key: string]: string } = {},
    post: { title: string; content: string }
  ) {
    return this.http.post<{ message: string; post: Post }>(
      this.baseUrl + 'post',
      post,
      { headers }
    );
  }

  editPost(
    headers: { [key: string]: string } = {},
    post: { title: string; content: string },
    postId: number
  ) {
    return this.http.post<{ message: string; post: Post }>(
      this.baseUrl + `post/${String(postId)}`,
      post,
      { headers }
    );
  }

  constructor() {}
}
