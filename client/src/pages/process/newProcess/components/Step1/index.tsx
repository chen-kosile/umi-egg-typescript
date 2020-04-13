import React, { useEffect } from 'react';
import { Form, Button, Divider, Input, Select, DatePicker } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import moment from 'moment';
import { CurrentUser } from '@/models/user';
import { StateType } from '../../model';
import styles from './index.less';

const { Option } = Select;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};
interface Step1Props {
  data?: StateType['step'];
  dispatch?: Dispatch<any>;
  teacherInfos?: CurrentUser[];
  headTeacher?: CurrentUser;
}

const Step1: React.FC<Step1Props> = props => {
  const { dispatch, data, teacherInfos = [], headTeacher = { userId: ''} } = props;
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      approver: headTeacher ?  headTeacher.userId : ''
    })
  }, [headTeacher, teacherInfos])

  if (!data) {
    return null;
  }
  const { validateFields } = form;
  const onValidateForm = async () => {
    const values = await validateFields();
    if (dispatch) {
      dispatch({
        type: 'formAndstepForm/saveStepFormData',
        payload: {
          ...values,
          startTime: moment(values.rangeDate[0]).valueOf(),
          endTime: moment(values.rangeDate[1]).valueOf(),
        },
      });
      dispatch({
        type: 'formAndstepForm/saveCurrentStep',
        payload: 'confirm',
      });
    }
  };

  // const authority = localStorage.getItem('oa-authority') || 'visitor';
  // console.log(authority);
  return (
    <>
      <Form
        {...formItemLayout}
        form={form}
        layout="horizontal"
        className={styles.stepForm}
        hideRequiredMark
        initialValues={data}
      >
        <Form.Item
          label="流程类型"
          name="processType"
          rules={[{ required: true, message: '请选择流程类型' }]}
        >
          <Select placeholder="">
            <Option value={1}>请假</Option>
            <Option value={2}>评优评先</Option>
          </Select>
        </Form.Item>
        <Form.Item 
          label="请假类型" 
          name="leaveType"
          rules={[{ required: true, message: '请选择请假类型' }]}
        >
            <Select>
              <Option value={1}>病假</Option>
              <Option value={2}>事假</Option>
              <Option value={3}>公假</Option>
            </Select>
        </Form.Item>
        <Form.Item 
          label="起止日期" 
          name="rangeDate"
          rules={[{ required: true, message: '请选择起止日期' }]}
        >
          <RangePicker
            style={{width: '100%'}}
            showTime={{ format: 'HH:mm' }}
            format="YYYY-MM-DD HH:mm"
            placeholder={[
              formatMessage({ id: 'formandbasic-form.placeholder.start' }),
              formatMessage({ id: 'formandbasic-form.placeholder.end' }),
            ]}
          />
        </Form.Item>
        <Form.Item
          label="审批人"
          name="approver"
          rules={[{ required: true, message: '请选择审批人姓名' }]}
        >
             <Select>
              {
                teacherInfos.map(item => (
                  <Option key={item.userId} value={item.userId || ''}>{item.name}</Option>
                ))
              }
            </Select>
        </Form.Item>
        <Form.Item
          label="申请原因"
          name="reason"
          rules={[
            { required: true, message: '请输入原因' },
          ]}
        >
          <TextArea placeholder="请输入请假原因" />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: {
              span: formItemLayout.wrapperCol.span,
              offset: formItemLayout.labelCol.span,
            },
          }}
        >
          <Button type="primary" onClick={onValidateForm}>
            下一步
          </Button>
        </Form.Item>
      </Form>
      <Divider style={{ margin: '40px 0 24px' }} />
      <div className={styles.desc}>
        <h3>说明</h3>
        <h4>。</h4>
        <p>
          。
        </p>
        <h4>。</h4>
        <p>
          。
        </p>
      </div>
    </>
  );
};

export default connect(({ formAndstepForm }: { formAndstepForm: StateType }) => ({
  data: formAndstepForm.step,
  teacherInfos: formAndstepForm.teacherInfos,
  headTeacher: formAndstepForm.headTeacher
}))(Step1);
