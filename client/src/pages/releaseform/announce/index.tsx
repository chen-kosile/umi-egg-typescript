// import { InfoCircleOutlined } from '@ant-design/icons';
import { Button, Card, Input, Form, Radio, Select } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React, { FC } from 'react';
import { Dispatch } from 'redux';
import { UserModelState, CurrentUser } from '@/models/user';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
// import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;

interface BasicFormProps {
  submitting: boolean;
  dispatch: Dispatch<any>;
  currentUser?: CurrentUser;
}

const BasicForm: FC<BasicFormProps> = props => {
  const { submitting, currentUser = { userId: ''} } = props;
  const [form] = Form.useForm();
  const [showPublicUsers, setShowPublicUsers] = React.useState(false);
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
      payload: {
        ...values,
        userId: currentUser.userId
      },
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onValuesChange = (changedValues: { [key: string]: any }) => {
    const { needPeoples } = changedValues;
    if (needPeoples) setShowPublicUsers(needPeoples === '2');
  };

  return (
    <PageHeaderWrapper content=''>
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
            label={<FormattedMessage id="formandbasic-form.title.label" />}
            name="title"
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'formandbasic-form.title.required' }),
              },
            ]}
          >
            <Input placeholder={formatMessage({ id: 'formandbasic-form.title.placeholder' })} />
          </FormItem>

          <FormItem
            {...formItemLayout}
            label='内容'
            name="content"
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'formandbasic-form.standard.required' }),
              },
            ]}
          >
            <TextArea
              style={{ minHeight: 32 }}
              placeholder={formatMessage({ id: 'formandbasic-form.standard.placeholder' })}
              rows={4}
            />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label='需要通知的人'
            name="noticeAll"
          >
            <div>
              <Radio.Group>
                <Radio value="1">
                  所有人
                </Radio>
                <Radio value="2">
                  部分人
                </Radio>
              </Radio.Group>
              <FormItem style={{ marginBottom: 0 }} name="announceUsers">
                <Select
                  mode="multiple"
                  placeholder={formatMessage({ id: 'formandbasic-form.publicUsers.placeholder' })}
                  style={{
                    margin: '8px 0',
                    display: showPublicUsers ? 'block' : 'none',
                  }}
                >
                  <Option value="1">
                    学生1
                  </Option>
                </Select>
              </FormItem>
            </div>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label='通知类型'
            name="useEmail"
          >
            <div>
              <Radio.Group>
                <Radio value="1">
                  发邮件
                </Radio>
                <Radio value="2">
                  不发邮件
                </Radio>
              </Radio.Group>
            </div>
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

export default connect(({ loading, user }: { loading: { effects: { [key: string]: boolean } }, user: UserModelState; }) => ({
  submitting: loading.effects['formAndbasicForm/submitRegularForm'],
  currentUser: user.currentUser,
}))(BasicForm);
