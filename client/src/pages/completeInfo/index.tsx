// import { InfoCircleOutlined } from '@ant-design/icons';
import { Button, Card, Input, Form, Select, DatePicker } from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';
import React, { FC } from 'react';
import { Dispatch } from 'redux';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';

// import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;
// const { RangePicker } = DatePicker;
const { TextArea } = Input;

interface BasicFormProps {
  submitting: boolean;
  dispatch: Dispatch<any>;
}

const BasicForm: FC<BasicFormProps> = props => {
  const { submitting } = props;
  const [form] = Form.useForm();
  // const [showPublicUsers, setShowPublicUsers] = React.useState(false);
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 7 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 },
      md: { span: 10 },
    },
  };

  const submitFormLayout = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 10, offset: 7 },
    },
  };

  const onFinish = (values: { [key: string]: any }) => {
    const { dispatch } = props;
    dispatch({
      type: 'formAndbasicForm/submitRegularForm',
      payload: values,
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onValuesChange = (changedValues: { [key: string]: any }) => {
    console.log(changedValues)
    // const { publicType } = changedValues;
    // if (publicType) setShowPublicUsers(publicType === '2');
  };

  return (
    <PageHeaderWrapper content={<FormattedMessage id="formandbasic-form.basic.description" />}>
      <Card bordered={false}>
        <Form
          hideRequiredMark
          style={{ marginTop: 8 }}
          form={form}
          name="basic"
          initialValues={{ public: '1' }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          onValuesChange={onValuesChange}
        >
          <FormItem
            {...formItemLayout}
            label="用户类型"
            name="roleType"
            rules={[
              {
                required: true,
                message: "用户类型必选",
              },
            ]}
          >
            <Select>
              <Option value="faculty">
                教职工
              </Option>
              <Option value="student">
                学生
              </Option>
            </Select>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="所属学院"
            name="group"
            // rules={[
            //   {
            //     required: true,
            //     message: "请填写所属学院",
            //   },
            // ]}
          >
            <Input placeholder="请输入所属学院"/>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="专业"
            name="profession"
            // rules={[
            //   {
            //     required: true,
            //     message: "请填写专业",
            //   },
            // ]}
          >
            <Input placeholder="请输入专业"/>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="班级"
            name="parentGroup"
            // rules={[
            //   {
            //     required: true,
            //     message: "请填写班级",
            //   },
            // ]}
          >
            <Input placeholder="请输入班级"/>
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="年龄"
            name="age"
            // rules={[
            //   {
            //     required: true,
            //     message: "年龄",
            //   },
            // ]}
          >
            <Input placeholder="请输入年龄"/>
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="出生日期"
            name="birthday"
            // rules={[
            //   {
            //     required: true,
            //     message: "请输入出生日期",
            //   },
            // ]}
          >
             <DatePicker />
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="性别"
            name="sex"
            // rules={[
            //   {
            //     required: true,
            //     message: "性别",
            //   },
            // ]}
          >
            <Input placeholder="请输入性别"/>
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="住址"
            name="address"
            // rules={[
            //   {
            //     required: true,
            //     message: "住址",
            //   },
            // ]}
          >
            <TextArea cols={4} placeholder="请输入住址" />
          </FormItem>

          <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
            <Button type="primary" htmlType="submit" loading={submitting}>
              <FormattedMessage id="formandbasic-form.form.submit" />
            </Button>
            <Button style={{ marginLeft: 8 }}>
              <FormattedMessage id="formandbasic-form.form.save" />
            </Button>
          </FormItem>
        </Form>
      </Card>
    </PageHeaderWrapper>
  );
};

export default connect(({ loading }: { loading: { effects: { [key: string]: boolean } } }) => ({
  submitting: loading.effects['formAndbasicForm/submitRegularForm'],
}))(BasicForm);
