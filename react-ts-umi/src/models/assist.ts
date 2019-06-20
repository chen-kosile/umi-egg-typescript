// import {} from 'utils/request';
import { Effect } from '@/models/connect';
import { Reducer } from 'redux';

// 工具model
export interface IAssistModelState {
  test: [],
  name: string
}

export interface IAssistModel {
  name: 'assist',
  state: IAssistModelState,
  subscriptions: {},
  effects: {
    test: Effect
  },
  reducers: {
    save: Reducer<any>,
    test: Reducer<any>
  }
}

const AssistModel: IAssistModel = {
  name: 'assist',
  state: {
    test: [],
    name: 'test'
  },
  subscriptions: {

  },
  effects: {
    *test({ payload }, { call, put, select }) {
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

export default AssistModel;
