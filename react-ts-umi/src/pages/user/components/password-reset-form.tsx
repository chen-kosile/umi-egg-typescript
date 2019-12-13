import React from 'react';
import { Form, Input, Icon, Button } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';

interface IProps extends FormComponentProps {
  prefixCls?: string;
  loading?: boolean;
  onLogin?: (values) => void;
  onChangeType?: (type: string) => void;
}

const FormItem = Form.Item;

const PasswordResetForm: React.FC<IProps> = (props) => {
  const {
    prefixCls,
    loading,
    onLogin,
    onChangeType,
    form: { validateFields, getFieldDecorator }
  } = props;
  const loginType = 'password';

  const handleSubmit = (e) => {
    e.preventDefault();

    validateFields((error, values) => {
      if (!error) return;
      onLogin && onLogin({
        ...values,
        type: loginType
      });
    })
  };

  const handleChangeLoginType = () => {
    onChangeType && onChangeType(loginType);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormItem>
        {getFieldDecorator('username', {
          rules: [
            {
              required: true,
              message: formatMessage({ id: 'validation.username.required' })
            }
          ]
        })(
          <Input
            size="large"
            prefix={<Icon type="user" />}
            placeholder={`${formatMessage({ id: 'app.login.username' })}`}
          />
        )}
      </FormItem>
      <FormItem>
        {getFieldDecorator('password', {
          rules: [
            {
              required: true,
              message: formatMessage({ id: 'validation.verification-code.required' })
            }
          ]
        })(
          <Input
            size="large"
            type="password"
            autoComplete="off"
            placeholder={`${formatMessage({ id: 'app.password-reset.new-password' })}`}
          />
        )}
      </FormItem>
      <FormItem>
        {getFieldDecorator('confirmPassword', {
          rules: [
            {
              required: true,
              message: formatMessage({ id: 'validation.verification-code.required' })
            }
          ]
        })(
          <Input
            size="large"
            type="password"
            autoComplete="off"
            placeholder={`${formatMessage({ id: 'app.password-reset.confirm-password' })}`}
          />
        )}
      </FormItem>
      <FormItem>
        <Button
          loading={loading}
          type="primary"
          htmlType="submit"
          size="large"
          block
        >
          <FormattedMessage id="app.password-reset.button" />
        </Button>
      </FormItem>
    </Form>
  )
};

PasswordResetForm.defaultProps = {
  loading: false
};

export default Form.create()(PasswordResetForm);
