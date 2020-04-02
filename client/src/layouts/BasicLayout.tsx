/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */
import ProLayout, {
  MenuDataItem,
  BasicLayoutProps as ProLayoutProps,
  Settings,
  DefaultFooter,
  SettingDrawer,
  PageLoading
} from '@ant-design/pro-layout';
import { formatMessage } from 'umi-plugin-react/locale';
import React, { Component } from 'react';
import { Link, Redirect } from 'umi';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { GithubOutlined } from '@ant-design/icons';
import Cookie from 'js-cookie';
import { stringify } from 'querystring';
import { Result, Button } from 'antd';
import Authorized from '@/utils/Authorized';
import RightContent from '@/components/GlobalHeader/RightContent';
import { ConnectState } from '@/models/connect';
import { CurrentUser } from '@/models/user';
import { isAntDesignPro, getAuthorityFromRouter } from '@/utils/utils';
import logo from '../assets/logo_icon.png';

const noMatch = (
  <Result
    status={403}
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={
      <Button type="primary">
        <Link to="/user/login">Go Login</Link>
      </Button>
    }
  />
);
export interface BasicLayoutState {
  isReady: boolean;
}
export interface BasicLayoutProps extends ProLayoutProps {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
  route: ProLayoutProps['route'] & {
    authority: string[];
  };
  settings: Settings;
  dispatch: Dispatch;
  currentUser?: CurrentUser;
  loading?: boolean;
}
export type BasicLayoutContext = { [K in 'location']: BasicLayoutProps[K] } & {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
};
/**
 * use Authorized check all menu item
 */

const menuDataRender = (menuList: MenuDataItem[]): MenuDataItem[] =>
  menuList.map(item => {
    const localItem = { ...item, children: item.children ? menuDataRender(item.children) : [] };
    return Authorized.check(item.authority, localItem, null) as MenuDataItem;
  });

const defaultFooterDom = (
  <DefaultFooter
    copyright=""
    links={[
      {
        key: 'OA System',
        title: 'OA System',
        href: '/',
        blankTarget: true,
      },
      {
        key: 'github',
        title: <GithubOutlined />,
        href: 'https://github.com/chen-kosile',
        blankTarget: true,
      },
      // {
      //   key: 'OA System',
      //   title: 'OA System',
      //   href: '/',
      //   blankTarget: true,
      // },
    ]}
  />
);

const footerRender: BasicLayoutProps['footerRender'] = () => {
  if (!isAntDesignPro()) {
    return defaultFooterDom;
  }

  return (
    <>
      {defaultFooterDom}
      <div
        style={{
          padding: '0px 24px 24px',
          textAlign: 'center',
        }}
      >
        <a href="/" target="_blank" rel="noopener noreferrer">
          <img
            src="https://www.netlify.com/img/global/badges/netlify-color-bg.svg"
            width="82px"
            alt="netlify logo"
          />
        </a>
      </div>
    </>
  );
};

class BasicLayout extends Component<BasicLayoutProps, BasicLayoutState> {
  state: BasicLayoutState = {
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

  handleMenuCollapse = (payload: boolean): void => {
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: 'global/changeLayoutCollapsed',
        payload,
      });
    }
  }; 

  render() {
    const { isReady } = this.state;
    const { 
      dispatch,
      children, 
      loading, 
      currentUser, 
      settings,
      location = {
        pathname: '/',
      },
    } = this.props;
    const isLogin = Cookie.get('token') && currentUser && currentUser.username;
    const queryString = stringify({
      redirect: window.location.href,
    }); 
    if ((!isLogin && loading) || !isReady) {
      return <PageLoading />;
    }
    if (!isLogin && this.judge(window.location.pathname)) {
      return <Redirect to={`/user/login?${queryString}`} />;
    }
    const authorized = getAuthorityFromRouter(this.props.route.routes, location.pathname || '/') || {
      authority: undefined,
    };
    return (
      <>
        <ProLayout
          logo={logo}
          formatMessage={formatMessage}
          menuHeaderRender={(logoDom, titleDom) => (
            <Link to="/">
              {logoDom}
              {titleDom}
            </Link>
          )}
          onCollapse={this.handleMenuCollapse}
          menuItemRender={(menuItemProps, defaultDom) => {
            if (menuItemProps.isUrl || menuItemProps.children || !menuItemProps.path) {
              return defaultDom;
            }
  
            return <Link to={menuItemProps.path}>{defaultDom}</Link>;
          }}
          breadcrumbRender={(routers = []) => [
            {
              path: '/',
              breadcrumbName: '首页',
            },
            ...routers,
          ]}
          itemRender={(route, params, routes, paths) => {
            const first = routes.indexOf(route) === 0;
            return first ? (
              <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
            ) : (
              <span>{route.breadcrumbName}</span>
            );
          }}
          footerRender={footerRender}
          menuDataRender={menuDataRender}
          rightContentRender={() => <RightContent />}
          {...this.props}
          {...settings}
        >
          <Authorized authority={authorized!.authority} noMatch={noMatch}>
            {children}
          </Authorized>
        </ProLayout>
        <SettingDrawer
          settings={settings}
          onSettingChange={config =>
            dispatch({
              type: 'settings/changeSetting',
              payload: config,
            })
          }
        />
      </>
    );
  }
}

export default connect(({ global, settings, user, loading }: ConnectState) => ({
  collapsed: global.collapsed,
  settings,
  currentUser: user.currentUser,
  loading: loading.models.user,
}))(BasicLayout);
