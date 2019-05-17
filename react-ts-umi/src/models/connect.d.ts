import { RouterTypes } from 'umi';
import { AnyAction } from 'redux';
import { IRoute } from 'umi-types';
import { EffectsCommandMap } from 'dva';
import { match } from 'react-router-dom';
import { IMenuModelState } from '@/models/menu';

export interface ConnectState {
  // loading: Loading;
  // menu: IMenuModelState;
  // global: IGlobalModelState;
  // tabs: ITabsModelState;
  // user: IUserModelState;
  // userGroup: IUserGroupModelState;
  // action: IActionModelState;
  // policy: IPolicyModelState;
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: any) => T) => T}, // 后面需要将any改为ConnectState
) => void;