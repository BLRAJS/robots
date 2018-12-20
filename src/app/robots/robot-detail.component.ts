import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Robot } from './Robot';
import { RobotService } from './Robot.service';

@Component({
  templateUrl: './Robot-detail.component.html',
  styleUrls: ['./Robot-detail.component.css']
})
export class RobotDetailComponent implements OnInit {
  pageTitle = 'Robot Detail';
  Robot: Robot;
  errorMessage: string;

  constructor(private RobotService: RobotService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.Robot = this.route.snapshot.data['Robot'];
  }

  onBack(): void {
    this.router.navigate(['/Robots']);
  }
}
