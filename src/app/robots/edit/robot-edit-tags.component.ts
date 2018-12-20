import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Robot } from '../Robot';

@Component({
  templateUrl: './Robot-edit-tags.component.html'
})
export class RobotEditTagsComponent implements OnInit {
  errorMessage: string;
  newTags = '';
  Robot: Robot;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.parent.data.subscribe(data => {
      this.Robot = data['Robot'];
    });
  }

  // Add the defined tags
  addTags(): void {
    const tagArray = this.newTags.split(',');
    this.Robot.tags = this.Robot.tags ? this.Robot.tags.concat(tagArray) : tagArray;
    this.newTags = '';
  }

  // Remove the tag from the array of tags.
  removeTag(idx: number): void {
    this.Robot.tags.splice(idx, 1);
  }
}
