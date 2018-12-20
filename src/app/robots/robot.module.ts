import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

import { RobotListComponent } from './Robot-list.component';
import { RobotDetailComponent } from './Robot-detail.component';
import { RobotEditComponent } from './edit/Robot-edit.component';
import { RobotEditInfoComponent } from './edit/Robot-edit-info.component';
import { RobotEditTagsComponent } from './edit/Robot-edit-tags.component';

import { RobotResolver } from './Robot.resolver';
import { RobotEditGuard } from './edit/Robot-edit.guard';
import { RobotSearchComponent } from './search/Robot-search.component';
import { RobotEditReactiveComponent } from './edit/Robot-edit-reactive.component';

const robotRoutes: Routes = [
  { path: '', component: RobotListComponent },
  { path: 'search', component: RobotSearchComponent },
  {
    path: ':id',
    resolve: { Robot: RobotResolver },
    component: RobotDetailComponent
  },
  {
    path: ':id/editReactive',
    resolve: { Robot: RobotResolver },
    component: RobotEditReactiveComponent
  },
  {
    path: ':id/edit',
    resolve: { Robot: RobotResolver },
    canDeactivate: [RobotEditGuard],
    component: RobotEditComponent,
    children: [
      { path: '', redirectTo: 'info', pathMatch: 'full' },
      { path: 'info', component: RobotEditInfoComponent },
      { path: 'tags', component: RobotEditTagsComponent }
    ]
  }
];

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(robotRoutes)
  ],
  declarations: [
    RobotListComponent,
    RobotDetailComponent,
    RobotEditComponent,
    RobotEditInfoComponent,
    RobotEditTagsComponent,
    RobotEditReactiveComponent,
    RobotSearchComponent
  ]
})
export class RobotModule { }
