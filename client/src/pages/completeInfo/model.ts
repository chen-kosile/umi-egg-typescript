// import { AnyAction } from 'redux';
import { Effect } from 'dva';
import { routerRedux } from 'dva/router';
// import { message } from 'antd';
import { ConnectState } from '@/models/connect.d';
import { fakeSubmitForm } from './service';
import { setAuthority } from './utils/utils';

// export type Effect = (
//   action: AnyAction,
//   effects: EffectsCommandMap & { select: <T>(func: (state: {}) => T) => T },
// ) => void;

export interface ModelType {
  namespace: string;
  state: {};
  effects: {
    submitRegularForm: Effect;
  };
}
const Model: ModelType = {
  namespace: 'formAndbasicForm',

  state: {},

  effects: {
    *submitRegularForm({ payload }, { call, select, put }) {
      const user = yield select((state: ConnectState) => state.user.currentUser);
      const response = yield call(fakeSubmitForm, {
        ...payload,
        userId: user.userId
      });
      if (response.status === 200) {
        setAuthority(payload.roleType);
        yield put(routerRedux.replace('/'));
      }
    },
  },
};

export default Model;
