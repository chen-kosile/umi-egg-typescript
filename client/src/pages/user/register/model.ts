import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import router from 'umi/router' 
import { message } from 'antd';       
 
import { fakeRegister, queryCaptcha } from './service';

export interface StateType {
  status?: 'ok' | 'error';
  currentAuthority?: 'user' | 'guest' | 'admin';
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: StateType) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    submit: Effect;
    getCaptcha: Effect;
  };
  reducers: {
    registerHandle: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'userAndregister',

  state: {
    status: undefined,
  },

  effects: {
    *submit({ payload }, { call, put }) {
      const response = yield call(fakeRegister, payload);
      if (response.status === 200) {
        message.success('注册成功');
        router.push('/user/login');
      }
      yield put({
        type: 'registerHandle',
        payload: response,
      });
    },

    *getCaptcha({ payload }, { call }) {
      const response = yield call(queryCaptcha, payload);
      if (response.code === 200) {
        message.success('发送成功');
      }
      return response;
    }
  },

  reducers: {
    registerHandle(state, { payload }) {
      return {
        ...state,
        status: payload.status,
      };
    },
  },
};

export default Model;
