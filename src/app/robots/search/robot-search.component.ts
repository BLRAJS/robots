import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  templateUrl: './Robot-search.component.html',
  styleUrls: ['./Robot-search.component.css']
})
export class RobotSearchComponent implements OnInit {
  pageTitle = 'Advanced Search';
  errorMessage: string;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  search(criteria): void {
    this.router.navigate(['/Robots'], { queryParams: criteria });
  }
}
