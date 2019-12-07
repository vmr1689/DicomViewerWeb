import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SpinnerService {

  private _loadingSource = new BehaviorSubject<boolean>(false);
  public loadingStatus$ = this._loadingSource.asObservable();

  constructor() { }

  public show() {
    this._loadingSource.next(true);
  }

  public hide() {
    this._loadingSource.next(false);
  }

}