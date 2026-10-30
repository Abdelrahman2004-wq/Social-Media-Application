import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private readonly _HttpClient = inject(HttpClient);
  private readonly _PlatformId = inject(PLATFORM_ID);

  private getHeaders() {
    let token = '';
    if (isPlatformBrowser(this._PlatformId)) {
      token = localStorage.getItem('SocialToken') || '';
    }
    return {
      headers: { Authorization: `Bearer ${token}` },
    };
  }

  getAllComments(postId: string): Observable<any> {
    return this._HttpClient.get(`${environment.baseURL}posts/${postId}/comments`, this.getHeaders());
  }

  createComment(postId: string, content: string): Observable<any> {
    return this._HttpClient.post(
      `${environment.baseURL}posts/${postId}/comments`,
      { content },
      this.getHeaders()
    );
  }
}