import { Action } from '@ngrx/store';
import {ISP} from '../home/home.model';
export enum HomeActionTypes {
    LoadISPs = '[ISPs]',
    LoadDetailISP= '[ISP Detail]',
    UpdateAPIHitsCount='[API Hits Count]',
    TotalIsps='[Total ISP Count]'

  }
  
  export class PopulateIspsAction implements Action {
    readonly type = HomeActionTypes.LoadISPs;
  
    constructor(public payload: ISP[]) { }
  }
  export class PopulateSelectedIspAction implements Action {
    readonly type = HomeActionTypes.LoadDetailISP;
  
    constructor(public payload: ISP) { }
  }
  export class UpdateAPIHitsCount implements Action {
    readonly type = HomeActionTypes.UpdateAPIHitsCount;
  
    constructor(public payload: number) { }
  }
  export class TotalIsps implements Action {
    readonly type = HomeActionTypes.TotalIsps;
  
    constructor(public payload: number) { }
  }
  // Union the valid types
export type IspActions = PopulateIspsAction | PopulateSelectedIspAction | UpdateAPIHitsCount | TotalIsps;