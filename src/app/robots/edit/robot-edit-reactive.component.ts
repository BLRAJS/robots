import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Robot } from '../Robot';
import { RobotService } from '../Robot.service';

import { NumberValidators } from '../../shared/number.validator';

@Component({
  templateUrl: './Robot-edit-reactive.component.html'
})
export class RobotEditReactiveComponent implements OnInit {
  pageTitle = 'Edit Robot';
  editForm: FormGroup;
  formError: { [id: string]: string };
  private validationMessages: { [id: string]: { [id: string]: string } };
  Robot: Robot;
  errorMessage: string;

  constructor(private fb: FormBuilder,
              private RobotService: RobotService,
              private router: Router,
              private route: ActivatedRoute) {

    // Without FormBuilder
    // this.editForm = new FormGroup({
    //     title: new FormControl('', [Validators.required,
    //                                 Validators.minLength(3),
    //                                 Validators.maxLength(50)]),
    //     manufact: new FormControl('', [Validators.required,
    //                                    Validators.minLength(5),
    //                                    Validators.maxLength(50)]),
    //     starRating: new FormControl('', NumberValidators.range(1, 5)),
    //     description: new FormControl('')
    // });

    // With FormBuilder
    this.editForm = this.fb.group({
      title: ['', [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50)]],
      manufact: ['', [Validators.required,
      Validators.minLength(5),
      Validators.maxLength(50)]],
      starRating: ['', NumberValidators.range(1, 5)],
      description: ['']
    });

    // Watch all of the controls on the form
    this.editForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    // this.editForm.valueChanges
    //         .debounceTime(500)
    //         .subscribe(data => this.onValueChanged(data));

    // Watch one control on the form.
    this.editForm.get('title').valueChanges
      .subscribe(value => console.log(`Title Changed to: ${value}`));

    // Initialize strings
    this.formError = {
      'title': '',
      'manufact': '',
      'starRating': '',
      'description': ''
    };

    this.validationMessages = {
      'title': {
        'required': 'Robot title is required',
        'minlength': 'Robot title must be at least three characters.',
        'maxlength': 'Robot title cannot exceed 50 characters.'
      },
      'manufact': {
        'required': 'manufact is required',
        'minlength': 'manufact must be at least 5 characters.',
        'maxlength': 'manufact cannot exceed 50 characters.'
      },
      'starRating': {
        'range': 'Rate the Robot between 1 (lowest) and 5 (highest).'
      }
    };
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        const id = +params['id'];
        this.getRobot(id);
      }
    );
  }

  getRobot(id: number): void {
    this.RobotService.getRobot(id).subscribe(
      Robot => this.onRobotRetrieved(Robot),
      error => this.errorMessage = <any>error
    );
  }

  onRobotRetrieved(Robot: Robot): void {
    if (this.editForm) {
      this.editForm.reset();
    }
    this.Robot = Robot;

    if (this.Robot.id === 0) {
      this.pageTitle = 'Add Robot (Reactive)';
    } else {
      this.pageTitle = `Edit Robot (Reactive): ${this.Robot.title}`;
    }

    // Update the data on the form
    this.editForm.patchValue({
      title: this.Robot.title,
      manufact: this.Robot.manufact,
      starRating: this.Robot.starRating,
      description: this.Robot.description
    });
  }

  // Start of a generic validator
  onValueChanged(data: any): void {
    Object.keys(this.formError).forEach(field => {
      const hasError = this.editForm.get(field).dirty &&
        !this.editForm.get(field).valid;
      this.formError[field] = '';
      if (hasError) {
        Object.keys(this.editForm.get(field).errors).forEach(rule =>
          this.formError[field] += this.validationMessages[field][rule] + ' '
        );
      }
    });
  }

  saveRobot(): void {
    console.log(this.editForm);
    if (this.editForm.dirty && this.editForm.valid) {
      // Copy the form values over the object values
      const m = Object.assign({}, this.Robot, this.editForm.value);

      this.RobotService.saveRobot(m).subscribe(
        () => this.onSaveComplete(),
        (error: any) => this.errorMessage = <any>error
      );
    } else if (!this.editForm.dirty) {
      this.onSaveComplete();
    }
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.editForm.reset();
    this.router.navigate(['/Robots']);
  }
}
