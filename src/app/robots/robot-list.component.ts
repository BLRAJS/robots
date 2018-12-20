import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Robot } from './Robot';
import { RobotService } from './Robot.service';
import { RobotParameterService } from './Robot-parameter.service';

@Component({
  templateUrl: './Robot-list.component.html',
  styleUrls: ['./Robot-list.component.css']
})
export class RobotListComponent implements OnInit {
  pageTitle = 'Robot List';
  filteredRobots: Robot[];
  Robots: Robot[];
  errorMessage: string;

  get listFilter(): string {
    return this.RobotParameterService.filterBy;
  }
  set listFilter(value: string) {
    this.RobotParameterService.filterBy = value;
    this.filteredRobots = this.performFilter(this.listFilter);
  }

  get showImage(): boolean {
    return this.RobotParameterService.displayPosters;
  }
  set showImage(value: boolean) {
    this.RobotParameterService.displayPosters = value;
  }

  constructor(private RobotService: RobotService,
    private RobotParameterService: RobotParameterService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.pageTitle = 'Robot List';
      // If parameters are passed in,
      // clear any existing filter
      if (Object.keys(params).length) {
        this.listFilter = null;
      }
      this.getRobots();
    });
  }

  getRobots(): void {
    this.RobotService.getRobots()
      .subscribe(
        (Robots: Robot[]) => {
          this.Robots = this.performSearch(Robots);
          this.filteredRobots = this.performFilter(this.listFilter);
        },
        (error: any) => this.errorMessage = <any>error);
  }

  // Local filter
  performFilter(filterBy: string): Robot[] {
    if (filterBy) {
      filterBy = filterBy.toLocaleLowerCase();
      return this.Robots.filter((Robot: Robot) =>
        Robot.title.toLocaleLowerCase().indexOf(filterBy) !== -1);
    } else {
      return this.Robots;
    }
  }

  // Advanced search
  performSearch(Robots: Robot[]): Robot[] {
    const params = this.route.snapshot.queryParamMap;
    if (params.keys.length) {
      this.pageTitle = 'Robot List From Advanced Search';
      return Robots.filter((Robot: Robot) =>
        (params.get('title') ?
          Robot.title.toLocaleLowerCase().indexOf(params.get('title').toLocaleLowerCase()) !== -1 : true) &&
        (params.get('manufact') ?
          Robot.manufact.toLocaleLowerCase().indexOf(params.get('manufact').toLocaleLowerCase()) !== -1 : true) &&
        (params.get('description') ?
          Robot.description.toLocaleLowerCase().indexOf(params.get('description').toLocaleLowerCase()) !== -1 : true) &&
        (params.get('minStarRating') ? Robot.starRating >= +params.get('minStarRating') : true) &&
        (params.get('maxStarRating') ? Robot.starRating <= +params.get('maxStarRating') : true)
      );
    }
    return Robots;
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }
}
