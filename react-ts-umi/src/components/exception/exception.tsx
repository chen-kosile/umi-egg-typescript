import React from 'react';
import { Button } from 'antd';
import classNames from 'classnames';
import config from './config';
import { Link } from 'umi';
import styles from './exception.less';

interface IProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  type?: '403' | '404' | '500';
  title?: React.ReactNode;
  size?: 'middle' | 'small' | 'large';
  desc?: React.ReactNode;
  img?: string;
  actions?: React.ReactNode;
  linkElement?: string | typeof Link;
  backText?: React.ReactNode;
  redirect?: string;
}

class Exception extends React.Component<IProps> {
  static defaultProps = {
    prefixCls: 'lotus-exception',
    backText: 'back to home',
    linkElement: 'a',
    type: '404',
    redirect: '/'
  }
  render() {
    const { prefixCls, className, style, type, img, title, desc, actions, 
      redirect, linkElement, backText} = this.props;
    const pageType = (type && type in config) ? type : '404';
    return (
      <div></div>
    )
  }
}

export default Exception;
