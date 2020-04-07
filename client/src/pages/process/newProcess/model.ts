import { Reducer } from 'redux';
import { Effect } from 'dva';
import { fakeSubmitForm, fakeGetTeacher } from './service';
import { ConnectState } from '@/models/connect.d';
import { CurrentUser } from '@/models/user';

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
  teacherInfos?: CurrentUser[];
  headTeacher?: CurrentUser;
}

// export type Effect = (
//   action: AnyAction,
//   effects: EffectsCommandMap & { select: <T>(func: (state: StateType) => T) => T },
// ) => void;

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
    teacherInfos: [],
    headTeacher: {}
  },

  effects: {
    *queryTeacherInfos(_, { call, put, select}) {
      const user = yield select((state: ConnectState) => state.user.currentUser);

      const response = yield call(fakeGetTeacher, {
        userId: user.userId
      });

      if (response.status === 200) {
        yield put({
          type: 'save',
          payload: {
            ...response.data
          }
        })
      }
    },
    *submitStepForm({ payload }, { call, put }) {
      const response = yield call(fakeSubmitForm, payload);
      if (response.status === 200) {
        yield put({
          type: 'saveStepFormData',
          payload,
        });
        yield put({
          type: 'saveCurrentStep',
          payload: 'result',
        });
      }
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
