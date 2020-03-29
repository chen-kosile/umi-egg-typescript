import React from 'react';
import { connect } from 'dva';
import { PageLoading } from '@ant-design/pro-layout';
import { Redirect } from 'umi';
import { stringify } from 'querystring';
import { ConnectState, ConnectProps } from '@/models/connect';
import { CurrentUser } from '@/models/user';
import Cookie from 'js-cookie';

interface SecurityLayoutProps extends ConnectProps {
  loading?: boolean;
  currentUser?: CurrentUser;
}

interface SecurityLayoutState {
  isReady: boolean;
}

class SecurityLayout extends React.Component<SecurityLayoutProps, SecurityLayoutState> {
  state: SecurityLayoutState = {
    isReady: false,
  };

  componentDidMount() {
    this.setState({
      isReady: true,
    });
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: 'user/fetchCurrent',
      });
    }
  }

  judge = (url: string): boolean => {
    const urls = [
      '/user/login',
      '/user/register',
      '/user/register-result'
    ]
  
    if (urls.includes(url)) {
      return false;
    }
    return true;
  }

  render() {
    const { isReady } = this.state;
    const { children, loading, currentUser } = this.props;
   
    const isLogin = Cookie.get('token') && currentUser && currentUser.username;
    const queryString = stringify({
      redirect: window.location.href,
    }); 
    if ((!isLogin && loading) || !isReady) {
      return <PageLoading />;
    }
    console.log(!isLogin);
    console.log(window.location.pathname);
    if (!isLogin && this.judge(window.location.pathname)) {
      return <Redirect to={`/user/login?${queryString}`} />;
    }
    return children;
  }
}

export default connect(({ user, loading }: ConnectState) => ({
  currentUser: user.currentUser,
  loading: loading.models.user,
}))(SecurityLayout);
