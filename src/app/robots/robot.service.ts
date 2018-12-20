import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Robot } from './Robot';

@Injectable({
  providedIn: 'root'
})
export class RobotService {
  private RobotsUrl = 'api/Robots';

  constructor(private http: HttpClient) { }

  getRobots(): Observable<Robot[]> {
    return this.http.get<Robot[]>(this.RobotsUrl)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getRobot(id: number): Observable<Robot> {
    if (id === 0) {
      return of(this.initializeRobot());
    }
    const url = `${this.RobotsUrl}/${id}`;
    return this.http.get<Robot>(url)
      .pipe(
        tap(data => console.log('Data: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  saveRobot(Robot: Robot): Observable<Robot> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (Robot.id === 0) {
      return this.createRobot(Robot, headers);
    }
    return this.updateRobot(Robot, headers);
  }

  deleteRobot(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    const url = `${this.RobotsUrl}/${id}`;
    return this.http.delete<Robot>(url, { headers: headers })
      .pipe(
        tap(data => console.log('deleteRobot: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  private createRobot(Robot: Robot, headers: HttpHeaders): Observable<Robot> {
    Robot.id = null;
    return this.http.post<Robot>(this.RobotsUrl, Robot, { headers: headers })
      .pipe(
        tap(data => console.log('createRobot: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  private updateRobot(Robot: Robot, headers: HttpHeaders): Observable<Robot> {
    const url = `${this.RobotsUrl}/${Robot.id}`;
    return this.http.put<Robot>(url, Robot, { headers: headers })
      .pipe(
        tap(data => console.log('updateRobot: ' + Robot.id)),
        catchError(this.handleError)
      );
  }

  private initializeRobot(): Robot {
    // Return an initialized object
    return {
      id: 0,
      approvalRating: null,
      description: '',
      manufact: '',
      imageurl: '',
      mpaa: '',
      price: null,
      releaseDate: '',
      starRating: null,
      title: '',
      category: '',
      tags: []
    };
  }

  private handleError(err: any) {

    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

}
