import { Effect } from '@/models/connect';
import { Reducer } from 'redux';

export interface IUserModelState {

}

export interface IUserModel {
  name: string;
  state: IUserModelState,
  subscriptions: {},
  effects: {
    fetchActions: Effect,
    fetchCurrent: Effect
  },
  reducers: {
    save: Reducer<any>,
    test: Reducer<any>
  }
}

const UserModal: IUserModel = {
  name: 'user',
  state: {

  },
  subscriptions: {

  },
  effects: {
    *fetchActions({ payload }, { call, put, select }) {
      let test = yield 'test';
    },
    *fetchCurrent({ payload }, { call, put, select }) {
      let test = yield 'test';
    }
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload
      }
    },
    test(state, action) {
      return {
        ...state,
        ...action.payload
      }
    }
  }
}

export default UserModal