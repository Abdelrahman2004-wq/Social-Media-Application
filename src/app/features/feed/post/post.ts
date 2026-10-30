import { IPost } from './../../../core/interface/post';
import { Component, inject, OnInit, signal, PLATFORM_ID } from '@angular/core';
import { PostService } from '../../../core/service/post';
import { RouterLink } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { initFlowbite } from 'flowbite';
import { FlowbiteService } from '../../../core/service/flowbite';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Comment } from './comment/comment';


@Component({
  selector: 'app-post',
  imports: [RouterLink, ReactiveFormsModule, Comment],
  templateUrl: './post.html',
  styleUrl: './post.css',
})
export class Post implements OnInit{
//Injects
  private readonly _FlowbiteService = inject(FlowbiteService);
  private readonly _PostService =inject(PostService);
  private readonly _PlatformId = inject(PLATFORM_ID); 
//Properties
  allPosts =signal<IPost[]>([]);
  userID = signal("");
  file = signal<File|null>(null);
  imageSrc = signal("");
//Controls
  privacy = new FormControl("public");
  content = new FormControl("");

  ngOnInit():void{
    this.getPosts();

    if (isPlatformBrowser(this._PlatformId)) {
      const storedUser = localStorage.getItem('SocailUser');
      if (storedUser) {
        this.userID.set(JSON.parse(storedUser)._id);
      }
    }
  }

  getPosts():void {
    this._PostService.getAllPosts().subscribe({
      next:(res)=>{
          console.log(res.data.posts);
          this.allPosts.set(res.data.posts);

          this._FlowbiteService.loadFlowbite((flowbite) => {
          initFlowbite();
        });
      },
      error:(err)=>{
          console.log(err)
      }
    }
    )
  }

  imageFolder(e:Event):void{
    let input = e.target as HTMLInputElement;
    
    if(input.files){
      console.log(input.files[0]);
      this.file.set(input.files[0]);
      this.imageSrc.set(URL.createObjectURL(input.files[0]));
    }
  }

  submitForm(e:SubmitEvent , myElement:HTMLFormElement){
    e.preventDefault();
    let formData = new FormData();

    if(this.content.value){
      formData.append("body",this.content.value);
    }

    if(this.file()){
      formData.append("image",this.file()!);
    }

    if(this.privacy.value){
      formData.append("privacy",this.privacy.value)
    }

    for (let pair of formData.entries()) {
    console.log(pair[0] + ':', pair[1]);
  }
  
    this._PostService.createPost(formData).subscribe(
      {
        next:(res)=>{
          console.log(res)
          this.getPosts();
        },
        error:(err)=>{
          console.log(err);
        },
        complete:()=>{
          myElement.reset();
          this.imageSrc.set("");
        }
      }
    )
  }

  deleteItem(id:string):void{
    this._PostService.deletePost(id).subscribe({
      next:(res)=>{
        console.log(res);
        if(res.success){
        this.getPosts();
      }
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
}
