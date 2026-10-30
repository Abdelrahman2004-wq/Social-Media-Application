import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly _HttpClient = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);

//Headers
  getHeaders() {
    let token = '';
    if (isPlatformBrowser(this.platformId)) {
      token = localStorage.getItem('SocialToken') || '';
    }
    return {
      headers: { Authorization: `Bearer ${token}` },
    };
  }

  //GetAllPosts
  getAllPosts(): Observable<any> {
    return this._HttpClient.get(`${environment.baseURL}posts`, this.getHeaders());
  }

  //GetOnePost
  getOnePost(postId: string): Observable<any> {
    return this._HttpClient.get(`${environment.baseURL}posts/${postId}`, this.getHeaders());
  }

  //DeletePost
  deletePost(postId: string): Observable<any> {
    return this._HttpClient.delete(`${environment.baseURL}posts/${postId}`, this.getHeaders());
  }

  //CreatePost
  createPost(data: object): Observable<any> {
    return this._HttpClient.post(`${environment.baseURL}posts`, data, this.getHeaders());
  }
}