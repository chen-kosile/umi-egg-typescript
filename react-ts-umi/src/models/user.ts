import { Reducer } from 'redux';
import { Effect } from '@/models/connect';
import { fetchCurrent } from '@/services/user';
import { Policy } from '@alitajs/autils';
import { IAction } from '@alitajs/autils/es/policy';
import { fetchList } from '@/services/action';

export interface IUserModelState {
  policy: Policy;
  actions: IAction[];
  currentUser: APP.ICurrentUser;
}

export interface IUserModel {
  namespace: 'user';
  state: IUserModelState;
  effects: {
    // 获取当前用户信息
    fetchCurrent: Effect;
    fetchActions: Effect;
  };
  reducers: {
    savePolicy: Reducer<any>;
    saveActions: Reducer<any>;
    saveCurrentUser: Reducer<any>;
    changeNotifyCount: Reducer<any>;
  };
}

const UserModel: IUserModel = {
  namespace: 'user',
  state: {
    policy: null,
    actions: [],
    currentUser: {},
  },
  effects: {
    *fetchCurrent(_, { call, put, select }) {
      console.log(fetchCurrent)
      const response = yield call(fetchCurrent);
      console.log(response)
      if (response && response.code === 200) {
        const info = response.data || {};
        const { policies = [] } = info;

        const { actions = [] } = yield select(state => state.user);

        const policy = new Policy(actions);

        policies.forEach(item => {
          policy.addPolicy(item);
        });

        yield put({
          type: 'saveCurrentUser',
          payload: {
            ...info,
          },
        });

        yield put({
          type: 'savePolicy',
          payload: policy,
        });
      }
    },
    *fetchActions(_, { call, put }) {
      const response = yield call(fetchList);
      if (response && response.code === 200) {
        const list = response.data;

        const actions = list.map(item => ({
          module: item.module.name,
          action: item.name,
        }));

        yield put({
          type: 'saveActions',
          payload: actions,
        });
      }
    },
  },
  reducers: {
    savePolicy(state, { payload }) {
      return {
        ...state,
        policy: payload,
      };
    },
    saveActions(state, { payload }) {
      return {
        ...state,
        actions: payload,
      };
    },
    saveCurrentUser(state, { payload }) {
      return {
        ...state,
        currentUser: payload,
      };
    },
    changeNotifyCount(state, { payload }) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: payload.totalCount,
          unreadCount: payload.unreadCount,
        },
      };
    },
  },
};

export default UserModel;
