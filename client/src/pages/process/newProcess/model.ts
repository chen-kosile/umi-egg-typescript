import { AnyAction, Reducer } from 'redux';

import { EffectsCommandMap } from 'dva';
import { fakeSubmitForm, fakeGetTeacher } from './service';

export interface StateType {
  current?: string;
  step?: {
    processType: number;
    leaveType: number;
    approver: string;
    reason: string;
    startTime: Date;
    endTime: Date;
  };
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: StateType) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    submitStepForm: Effect;
    queryTeacherInfos: Effect;
  };
  reducers: {
    saveStepFormData: Reducer<StateType>;
    saveCurrentStep: Reducer<StateType>;
    save: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'formAndstepForm',

  state: {
    current: 'info',
    step: {
      processType: 1,
      leaveType: 1,
      approver: '',
      reason: '',
      startTime: new Date(),
      endTime: new Date(),
    },
  },

  effects: {
    *queryTeacherInfos(_, { call, put}) {
      const response = yield call(fakeGetTeacher);

      if (response.status === 200) {
        yield put({
          type: 'save',
          payload: {
            teacherInfos: response.data
          }
        })
      }
    },
    *submitStepForm({ payload }, { call, put }) {
      yield call(fakeSubmitForm, payload);
      yield put({
        type: 'saveStepFormData',
        payload,
      });
      yield put({
        type: 'saveCurrentStep',
        payload: 'result',
      });
    },
  },

  reducers: {
    save(state, { payload }) {
      return{
        ...state,
        ...payload
      }
    },
    saveCurrentStep(state, { payload }) {
      return {
        ...state,
        current: payload,
      };
    },

    saveStepFormData(state, { payload }) {
      return {
        ...state,
        step: {
          ...(state as StateType).step,
          ...payload,
        },
      };
    },
  },
};

export default Model;
