import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.css']
})
export class LikeComponent implements OnInit {
  liked = false; 
  constructor() {    
  }
  ngOnInit() {
  }
  onLike() {
    this.liked = !this.liked;
  }

  get title() {
    return (this.liked) ? 'Liked' : 'Like';
  }

}
