import { WeiboCircleOutlined, WechatOutlined, QqOutlined } from '@ant-design/icons';
import { Alert, Checkbox } from 'antd';
import React, { useState, useEffect } from 'react';
import { Dispatch, AnyAction } from 'redux';
import { Link } from 'umi';
import { connect } from 'dva';
import { StateType } from './model';
import styles from './style.less';
import { LoginParamsType } from './service';
import LoginFrom from './components/Login';
import { aesEncrypt, aesDecrypt } from '@/utils/crypto';

const { Tab, UserName, Password, Submit } = LoginFrom;
interface LoginProps {
  dispatch: Dispatch<AnyAction>;
  userAndlogin: StateType;
  submitting?: boolean;
}

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login: React.FC<LoginProps> = props => {
  const { userAndlogin = {}, submitting } = props;
  const { status } = userAndlogin;
  const [autoLogin, setAutoLogin] = useState<boolean>(true);
  const [type, setType] = useState<string>('account');
  const [name, setUserName] = useState<string>('');
  const [pass, setPassWrod] = useState<string>('');

  useEffect(() => {
    // const { dispatch } = props;
    const username = localStorage.getItem('username') || '';
    const password = localStorage.getItem('password') || '';
    if (autoLogin && username && password) {
      setUserName(username)
      setPassWrod(aesDecrypt(password))
      // dispatch({
      //   type: 'userAndlogin/login',
      //   payload: {
      //     username,
      //     password,
      //     type
      //   }
      // })
    }
  }, [])

  const handleSubmit = (values: LoginParamsType) => {
    const { dispatch } = props;
    const { username, password } = values;
    dispatch({
      type: 'userAndlogin/login',
      payload: {
        ...values,
        password: aesEncrypt(password),
        type,
      },
    });
    localStorage.setItem('username', username);
    localStorage.setItem('password', aesEncrypt(password));
  };
  return (
    <div className={styles.main}>
      <LoginFrom activeKey={type} onTabChange={setType} onSubmit={handleSubmit}>
        <Tab key="account" tab="账户密码登录">
          {status && status !== 200 && !submitting && (
            <LoginMessage content="账户或密码错误" />
          )}

          <UserName
            name="username"
            placeholder="用户名: 校园卡号或者管理员账号"
            defaultValue={name}
            rules={[
              {
                required: true,
                message: '校园卡号或者管理员账号!',
              },
            ]}
          />
          <Password
            name="password"
            placeholder="密码"
            defaultValue={pass}
            rules={[
              {
                required: true,
                message: '请输入密码！',
              },
            ]}
          />
        </Tab>
        <div>
          <Checkbox checked={autoLogin} onChange={e => setAutoLogin(e.target.checked)}>
            自动登录
          </Checkbox>
          <a
            style={{
              float: 'right',
            }}
          >
            忘记密码
          </a>
        </div>
        <Submit loading={submitting}>登录</Submit>
        <div className={styles.other}>
          其他登录方式
          <WeiboCircleOutlined className={styles.icon} />
          <WechatOutlined className={styles.icon} />
          <QqOutlined className={styles.icon} />
          <Link className={styles.register} to="/user/register">
            注册账户
          </Link>
        </div>
      </LoginFrom>
    </div>
  );
};

export default connect(
  ({
    userAndlogin,
    loading,
  }: {
    userAndlogin: StateType;
    loading: {
      effects: {
        [key: string]: boolean;
      };
    };
  }) => ({
    userAndlogin,
    submitting: loading.effects['userAndlogin/login'], // loading.effects 监听userAndlogin/login 方法请求结束前true结束后为false
  }),
)(Login);
