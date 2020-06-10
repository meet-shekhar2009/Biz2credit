import { IspActions, HomeActionTypes } from './home.action';
import { ISP } from '../home/home.model'
export interface HomeState {
    currentISP: ISP;
    ISPs: ISP[];
    APIHitsCount: number;
    TotalIsps: number;

}
const initialState: HomeState = {
    currentISP: null,
    ISPs: [],
    APIHitsCount: 0,
    TotalIsps: 0
};
export function reducer(state = initialState, action: IspActions): HomeState {
    switch (action.type) {
        case HomeActionTypes.LoadISPs:
            return {
                ...state,
                ISPs: action.payload
            };
        case HomeActionTypes.LoadDetailISP:
            return {
                ...state,
                currentISP: action.payload
            }
        case HomeActionTypes.UpdateAPIHitsCount:
            return {
                ...state,
                APIHitsCount: action.payload
            }
        case HomeActionTypes.TotalIsps:
            return {
                ...state,
                TotalIsps: action.payload
            }
        default:
            return state;
    }

}