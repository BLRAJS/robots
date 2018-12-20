import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';

import { Robot } from './Robot';
import { RobotService } from './Robot.service';

@Injectable({
  providedIn: 'root'
})
export class RobotResolver implements Resolve<Robot> {

  constructor(private RobotService: RobotService) { }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<Robot> {
    const id = route.paramMap.get('id');
    return this.RobotService.getRobot(+id);
  }
}
