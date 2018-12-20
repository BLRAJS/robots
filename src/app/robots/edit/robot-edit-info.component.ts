import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Robot } from '../Robot';

@Component({
  templateUrl: './Robot-edit-info.component.html'
})
export class RobotEditInfoComponent implements OnInit {
  @ViewChild(NgForm) RobotForm: NgForm;

  errorMessage: string;
  Robot: Robot;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.parent.data.subscribe(data => {
      this.Robot = data['Robot'];

      if (this.RobotForm) {
        this.RobotForm.reset();
      }
    });
  }
}
