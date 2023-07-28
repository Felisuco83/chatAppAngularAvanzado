import { ActionReducerMap } from '@ngrx/store';
import { userNameReducer } from './appReducer';
import { IAppStore } from '../IAppStore';

export const Rootreducer: ActionReducerMap<IAppStore> = {
    userNameState: userNameReducer,
}