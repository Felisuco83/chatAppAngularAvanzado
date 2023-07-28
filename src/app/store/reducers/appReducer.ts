import { ACTION_SET_USERNAME } from '../actions/appActions';
import { IAppReducerState } from '../state/appState';

//Estado inicial
const initialState: IAppReducerState = {
    userName: 'Desconocido'
}

export function userNameReducer(state = initialState, action: any): IAppReducerState {
    switch (action.type) {
        case ACTION_SET_USERNAME:
            return { ...state, userName: action.payload }
            break;
    }
    return state;
}

