import { Reducer } from 'redux';
import { Effect } from 'dva';
import { ConnectState } from '@/models/connect.d';
import { addFakeList, queryProcessList, removeFakeList, updateFakeList, deleteProcess } from './service';

import { BasicListItemDataType } from './data.d';

export interface StateType {
  list: BasicListItemDataType[];
  total: number;
}

// export type Effect = (
//   action: AnyAction,
//   effects: EffectsCommandMap & { select: <T>(func: (state: StateType) => T) => T },
// ) => void;

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    queryProcessList: Effect;
    appendFetch: Effect;
    submit: Effect;
    queryDeleteProcess: Effect;
  };
  reducers: {
    queryList: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'listAndbasicList',

  state: {
    list: [],
    total: 0
  },

  effects: {
    *queryProcessList({ payload }, { call, put }) {
      const response = yield call(queryProcessList, payload);
      yield put({
        type: 'queryList',
        payload: response.data,
      });
    },
    *queryDeleteProcess({ payload }, { call, put, select }) {
      const user = yield select((state: ConnectState) => state.user.currentUser);
      const response = yield call(deleteProcess, payload);
      if (response.status === 200) {
        yield put({
          type: 'queryProcessList',
          payload: {
            current: 0,
            pageSize: 20,
            userId: user.userId
          }
        })
      }

    },
    *appendFetch({ payload }, { call, put }) {
      const response = yield call(queryProcessList, payload);
      yield put({
        type: 'appendList',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *submit({ payload }, { call, put }) {
      let callback;
      if (payload.id) {
        callback = Object.keys(payload).length === 1 ? removeFakeList : updateFakeList;
      } else {
        callback = addFakeList;
      }
      const response = yield call(callback, payload); // post
      yield put({
        type: 'queryList',
        payload: response,
      });
    },
  },

  reducers: {
    queryList(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    }
  },
};

export default Model;
