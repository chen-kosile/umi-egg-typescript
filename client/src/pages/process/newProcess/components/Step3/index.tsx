import { Button, Result, Descriptions } from 'antd';
import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import moment from 'moment';
import { Link } from 'umi';
import { StateType } from '../../model';
import { CurrentUser, UserModelState } from '@/models/user';
import { processTypes, leaveTypes } from '../../config';

import styles from './index.less';

interface Step3Props {
  data?: StateType['step'];
  dispatch?: Dispatch<any>;
  currentUser?: CurrentUser,
  teacherInfos?: CurrentUser[];
}

const Step3: React.FC<Step3Props> = props => {
  const { data, dispatch, currentUser = { name: '', username: ''}, teacherInfos = [] } = props;
  if (!data) {
    return null;
  }
  const { approve, processType, leaveType, reason, startTime, endTime } = data;
  const onFinish = () => {
    if (dispatch) {
      dispatch({
        type: 'formAndstepForm/saveCurrentStep',
        payload: 'info',
      });
    }
  };
  const information = (
    <div className={styles.information}>
      <Descriptions column={1}>
        <Descriptions.Item label="申请人">{currentUser.name}</Descriptions.Item>
        <Descriptions.Item label="学号">{currentUser.username}</Descriptions.Item>
        <Descriptions.Item label="流程类型">{processTypes[processType]}</Descriptions.Item>
        <Descriptions.Item label="请假类型">{leaveTypes[leaveType]}</Descriptions.Item>
        <Descriptions.Item label="起止日期">{moment(startTime).format('YYYY-MM-DD HH:mm')} - {moment(endTime).format('YYYY-MM-DD HH:mm')}</Descriptions.Item>
        <Descriptions.Item label="审批人">{teacherInfos.filter(item => item.userId === approve)[0].name}</Descriptions.Item>
        <Descriptions.Item label="请假原因">
          {reason}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
  const extra = (
    <>
      <Button type="primary" onClick={onFinish}>
        继续流程申请
      </Button>
      <Link to="/process/processList">
        <Button>查看申请</Button>
      </Link>
    </>
  );
  return (
    <Result
      status="success"
      title="操作成功"
      subTitle="等待审批人审判"
      extra={extra}
      className={styles.result}
    >
      {information}
    </Result>
  );
};

export default connect(({ formAndstepForm, user }: { formAndstepForm: StateType, user: UserModelState }) => ({
  data: formAndstepForm.step,
  currentUser: user.currentUser,
  teacherInfos: formAndstepForm.teacherInfos,
}))(Step3);
