import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
  private _starCount: number = 0;
  
  constructor() {    
  }
  ngOnInit() {
  }
  onClick1() {
    if (this._starCount === 1) {
      this._starCount = 0;
    } else {
      this._starCount = 1;
    }
  }
  onClick2() {
    this._starCount = 2;
  }
  onClick3() {
    this._starCount = 3;
  }
  onClick4() {
    this._starCount = 4;
  }
  onClick5() {
    this._starCount = 5;
  }
  get starCount() {
    return this._starCount;
  }
}
