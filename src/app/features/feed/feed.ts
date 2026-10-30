import { Component } from '@angular/core';
import { Leftsidebar } from './leftsidebar/leftsidebar';
import { Rightsidebar } from './rightsidebar/rightsidebar';
import { Post } from './post/post';

@Component({
  selector: 'app-feed',
  imports: [Leftsidebar, Rightsidebar, Post],
  templateUrl: './feed.html',
  styleUrl: './feed.css',
})
export class Feed {}
