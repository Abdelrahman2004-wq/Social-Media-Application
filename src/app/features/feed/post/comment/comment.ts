import { Component, inject, input, OnInit, signal } from '@angular/core';
import { CommentService } from '../../../../core/service/comment';


@Component({
  selector: 'app-comment',
  imports: [],
  templateUrl: './comment.html',
  styleUrl: './comment.css',
})
export class Comment implements OnInit {
  private readonly _CommentService = inject(CommentService);

  postId = input.required<string>();
  allComments = signal<IComment[]>([]);

  ngOnInit(): void {
    this.getComments();
  }

  getComments(): void {
    this._CommentService.getAllComments(this.postId()).subscribe({
      next: (res) => {
        console.log(res.data.comments);
        this.allComments.set(res.data.comments);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  submitComment(content: string): void {
    if (!content.trim()) return;

    this._CommentService.createComment(this.postId(), content).subscribe({
      next: (res) => {
        console.log(res);
        this.getComments();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}