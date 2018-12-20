import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Robot } from '../Robot';
import { RobotService } from '../Robot.service';

@Component({
  templateUrl: './Robot-edit.component.html',
  styleUrls: ['./Robot-edit.component.css']
})
export class RobotEditComponent implements OnInit {
  pageTitle = 'Robot Edit';
  errorMessage = '';

  private currentRobot: Robot;
  private originalRobot: Robot;
  private dataIsValid: { [key: string]: boolean } = {};

  get isDirty(): boolean {
    return JSON.stringify(this.originalRobot) !== JSON.stringify(this.currentRobot);
  }

  get Robot(): Robot {
    return this.currentRobot;
  }
  set Robot(value: Robot) {
    this.currentRobot = value;
    // Clone the object to retain a copy
    this.originalRobot = Object.assign({}, value);
  }

  constructor(private route: ActivatedRoute,
              private router: Router,
              private RobotService: RobotService) { }

  ngOnInit(): void {
    // Watch for changes to the resolve data
    this.route.data.subscribe(data => {
      this.onRobotRetrieved(data['Robot']);
    });
  }

  onRobotRetrieved(Robot: Robot): void {
    this.Robot = Robot;

    // Adjust the title
    if (this.Robot.id === 0) {
      this.pageTitle = 'Add Robot';
    } else {
      this.pageTitle = `Edit Robot: ${this.Robot.title}`;
    }
  }

  deleteRobot(): void {
    if (!this.Robot.id) {
      // Don't delete, it was never saved.
      this.onSaveComplete(`${this.Robot.title} was deleted`);
    } else {
      if (confirm(`Really delete the Robot: ${this.Robot.title}?`)) {
        this.RobotService.deleteRobot(this.Robot.id).subscribe(
          () => this.onSaveComplete(`${this.Robot.title} was deleted`)
        );
      }
    }
  }

  isValid(path?: string): boolean {
    this.validate();
    if (path) {
      return this.dataIsValid[path];
    }
    return (this.dataIsValid &&
      Object.keys(this.dataIsValid).every(d => this.dataIsValid[d] === true));
  }

  saveRobot(): void {
    if (this.isValid()) {
      this.RobotService.saveRobot(this.Robot).subscribe(
        () => this.onSaveComplete(`${this.Robot.title} was saved`)
      );
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  onSaveComplete(message?: string): void {
    console.log(message);
    this.reset();
    // Navigate back to the Robot list
    this.router.navigate(['/Robots']);
  }

  // Reset the data
  // Required after a save so the data is no longer seen as dirty.
  reset(): void {
    this.dataIsValid = null;
    this.currentRobot = null;
    this.originalRobot = null;
  }

  validate(): void {
    // Clear the validation object
    this.dataIsValid = {};

    // 'info' tab
    if (this.Robot.title &&
      this.Robot.title.length >= 3 &&
      this.Robot.title.length <= 50 &&
      this.Robot.manufact &&
      this.Robot.manufact.length >= 5 &&
      this.Robot.manufact.length <= 50 &&
      (!this.Robot.starRating ||
        this.Robot.starRating >= 1 &&
        this.Robot.starRating <= 5)
    ) {
      this.dataIsValid['info'] = true;
    } else {
      this.dataIsValid['info'] = false;
    }

    // 'tags' tab
    if (this.Robot.category &&
      this.Robot.category.length >= 3) {
      this.dataIsValid['tags'] = true;
    } else {
      this.dataIsValid['tags'] = false;
    }
  }
}
