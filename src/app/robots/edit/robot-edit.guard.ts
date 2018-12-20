import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

import { RobotEditComponent } from './Robot-edit.component';

@Injectable({
  providedIn: 'root'
})
export class RobotEditGuard implements CanDeactivate<RobotEditComponent> {

    canDeactivate(component: RobotEditComponent): boolean {
        if (component.isDirty) {
            const title = component.Robot.title || 'New Robot';
            return confirm(`Navigate away and lose all changes to ${title}?`);
        }
        return true;
    }
}
