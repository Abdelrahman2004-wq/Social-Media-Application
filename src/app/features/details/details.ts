import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../core/service/post';
import { IPost } from '../../core/interface/post';
import { Comment } from '../feed/post/comment/comment';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-details',
  imports: [Comment],
  templateUrl: './details.html',
  styleUrl: './details.css',
})
export class Details implements OnInit {
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _PostService = inject(PostService);
    private readonly _PlatformId = inject(PLATFORM_ID); 
  userID = signal("");
  postData = signal<IPost | null>(null);

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe((params) => {
      const postId = params.get('postId');
      if (postId) {
        this.getSinglePost(postId);
      }
    });

        if (isPlatformBrowser(this._PlatformId)) {
      const storedUser = localStorage.getItem('SocailUser');
      if (storedUser) {
        this.userID.set(JSON.parse(storedUser)._id);
      }
    }
  }

  getSinglePost(id: string) {
    this._PostService.getOnePost(id).subscribe({
      next: (res) => {
        this.postData.set(res.data.post);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

}