import React from 'react';
import { Form, Alert, Button, Descriptions, Divider } from 'antd';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import moment from 'moment';
import { UserModelState, CurrentUser } from '@/models/user';
import { StateType } from '../../model';
import { processTypes, leaveTypes } from '../../config';
import styles from './index.less';

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};
interface Step2Props {
  data?: StateType['step'];
  dispatch?: Dispatch<any>;
  submitting?: boolean;
  currentUser?: CurrentUser;
  teacherInfos?: CurrentUser[];
}

const Step2: React.FC<Step2Props> = props => {
  const [form] = Form.useForm();
  const { data, dispatch, submitting, teacherInfos = [], currentUser = { name: '', username: '', userId: ''} } = props;
  if (!data) {
    return null;
  }
  const { validateFields, getFieldsValue } = form;
  const onPrev = () => {
    if (dispatch) {
      const values = getFieldsValue();
      dispatch({
        type: 'formAndstepForm/saveStepFormData',
        payload: {
          ...data,
          ...values,
        },
      });
      dispatch({
        type: 'formAndstepForm/saveCurrentStep',
        payload: 'info',
      });
    }
  };
  const onValidateForm = async () => {
    const values = await validateFields();
    if (dispatch) {
      dispatch({
        type: 'formAndstepForm/submitStepForm',
        payload: {
          ...data,
          ...values,
          userId: currentUser.userId
        },
      });
    }
  };

  const { approve, processType, leaveType, reason, startTime, endTime } = data;
  return (
    <Form
      {...formItemLayout}
      form={form}
      layout="horizontal"
      className={styles.stepForm}
      initialValues={{ password: '123456' }}
    >
      <Alert
        closable
        showIcon
        message="提交申请后，未审批之前可以撤销申请"
        style={{ marginBottom: 24 }}
      />
      <Descriptions column={1}>
        <Descriptions.Item label="申请人">{currentUser.name}</Descriptions.Item>
        <Descriptions.Item label="学号">{currentUser.username}</Descriptions.Item>
        <Descriptions.Item label="流程类型">{processTypes[processType]}</Descriptions.Item>
        <Descriptions.Item label="请假类型">{leaveTypes[processType][leaveType]}</Descriptions.Item>
        <Descriptions.Item label="起止日期">{moment(startTime).format('YYYY-MM-DD HH:mm')} - {moment(endTime).format('YYYY-MM-DD HH:mm')}</Descriptions.Item>
        <Descriptions.Item label="审批人"> {teacherInfos.filter(item => item.userId === approve)[0].name}</Descriptions.Item>
        <Descriptions.Item label="请假原因">
          {reason}
        </Descriptions.Item>
      </Descriptions>
      <Divider style={{ margin: '24px 0' }} />
      <Form.Item
        style={{ marginBottom: 8 }}
        wrapperCol={{
          xs: { span: 24, offset: 0 },
          sm: {
            span: formItemLayout.wrapperCol.span,
            offset: formItemLayout.labelCol.span,
          },
        }}
      >
        <Button type="primary" onClick={onValidateForm} loading={submitting}>
          提交
        </Button>
        <Button onClick={onPrev} style={{ marginLeft: 8 }}>
          上一步
        </Button>
      </Form.Item>
    </Form>
  );
};
export default connect(
  ({
    formAndstepForm,
    loading,
    user
  }: {
    formAndstepForm: StateType;
    loading: {
      effects: { [key: string]: boolean };
    };
    user: UserModelState;
  }) => ({
    submitting: loading.effects['formAndstepForm/submitStepForm'],
    data: formAndstepForm.step,
    currentUser: user.currentUser,
    teacherInfos: formAndstepForm.teacherInfos,
  }),
)(Step2);
