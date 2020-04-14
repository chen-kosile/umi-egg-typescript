import React from 'react';
import { Redirect } from 'umi';
import { connect } from 'dva';
import Cookie from 'js-cookie'
import Authorized from '@/utils/Authorized';
import { getAuthority } from '@/utils/authority';
import { getRouteAuthority } from '@/utils/utils';
import { ConnectProps, ConnectState, UserModelState } from '@/models/connect';

interface AuthComponentProps extends ConnectProps {
  user: UserModelState;
}

const AuthComponent: React.FC<AuthComponentProps> = ({
  children,
  route = {
    routes: [],
  },
  location = {
    pathname: '',
  },
  user,
}) => {
  const { currentUser } = user;
  const { routes = [] } = route;
  function getNoMatch() {
    const isLogin = Cookie.get('token') && currentUser && currentUser.username;
    const auth = getAuthority();
    if (auth) {
      return <Redirect to="/completeInfo" />;
    }
    if (isLogin) {
      return <Redirect to="/exception/403" />;
    }

    return <Redirect to="/user/login" />;
  }

  const result = getNoMatch();

  return (
    <Authorized
      authority={getRouteAuthority(location.pathname, routes) || ''}
      noMatch={result}
    >
      {children}
    </Authorized>
  );
};

export default connect(({ user }: ConnectState) => ({
  user,
}))(AuthComponent);
