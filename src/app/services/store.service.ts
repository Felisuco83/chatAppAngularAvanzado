import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store'
import { IAppStore } from '../store/IAppStore';
@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private store: Store<any>) { }

  getState(state: string) {
    var cadena = this.store.select(state);
    return cadena;
  }

  async updateState(obj: any) {
    this.store.dispatch({ type: obj.type, payload: obj.payload });
  }
}
