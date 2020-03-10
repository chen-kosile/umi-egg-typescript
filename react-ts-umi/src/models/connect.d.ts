import { RouterTypes } from 'umi';
import { AnyAction } from 'redux';
import { IRoute } from 'umi-types';
import { EffectsCommandMap } from 'dva';
import { match } from 'react-router-dom';
import { IMenuModelState } from '@/models/menu';
import { ILoginModelState } from '@/models/login';
import { IGlobalModelState } from '@/models/global';
import { IUserModelState } from '@/models/user';
import { ISettingModelState } from '@/models/setting';
import { IActionModelState } from '@/models/action';
import { IUserGroupModelState } from '@/pages/system/models/user-group';
import { ISystemUserModelState } from '@/pages/system/models/system-user';
import { IPolicyModelState } from '@/models/policy';

export interface ConnectState {
  loading: Loading;
  menu: IMenuModelState;
  global: IGlobalModelState;
  setting: ISettingModelState;
  user: IUserModelState;
  login: ILoginModelState;
  systemUser: ISystemUserModelState;
  userGroup: IUserGroupModelState;
  action: IActionModelState;
  policy: IPolicyModelState;
}

export {
  IMenuModelState,
  IGlobalModelState,
  ISettingModelState,
  IUserGroupModelState,
  IActionModelState,
  IPolicyModelState,
  ILoginModelState,
  IUserModelState,
};

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: ConnectState) => T) => T },
) => void;

export type Dispatch = <P = any, C = (payload: P) => void>(action: {
  type: string;
  payload?: P;
  callback?: C;
  [key: string]: any;
}) => any;

export interface Loading {
  global: boolean;
  effects: { [key: string]: boolean | undefined };
  models: {
    menu?: boolean;
  };
}

export interface ConnectProps<P extends { [K in keyof P]?: string } = {}>
  extends Partial<RouterTypes<IRoute>> {
  dispatch?: Dispatch;
  match?: match<P>;
}

export default ConnectState;
