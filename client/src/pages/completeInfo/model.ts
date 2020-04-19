// import { AnyAction } from 'redux';
import { Effect } from 'dva';
import { Reducer } from 'redux';
import { routerRedux } from 'dva/router';
// import { message } from 'antd';
import { ConnectState } from '@/models/connect.d';
import { fakeSubmitForm, getTeacherList } from './service';
import { setAuthority } from './utils/utils';
import { CurrentUser } from '@/models/user';

// export type Effect = (
//   action: AnyAction,
//   effects: EffectsCommandMap & { select: <T>(func: (state: {}) => T) => T },
// ) => void;
export interface StateType {
  teacherList?: CurrentUser[];
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    submitRegularForm: Effect;
    queryTeacherList: Effect;
  };
  reducers: {
    save: Reducer;
  }
}
const Model: ModelType = {
  namespace: 'formAndbasicForm',

  state: {
    teacherList: []
  },

  effects: {
    *queryTeacherList(_, { call, put }) {
      const response = yield call(getTeacherList);
      if (response.status === 200) {
        yield put({
          type: 'save',
          payload: {
            ...response.data
          }
        })
      }
    },
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
  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload
      }
    }
  }
};

export default Model;
