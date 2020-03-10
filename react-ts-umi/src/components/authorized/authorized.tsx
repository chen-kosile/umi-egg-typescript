import React from 'react';
import { connect } from 'dva';
import { ConnectState } from '@/models/connect';
import { Policy } from '@alitajs/autils';
import CheckPermissions, { TAuthority } from './checkPermissions';

export interface AuthorizedProps {
  authority?: TAuthority;
  noMatch?: React.ReactNode;
  policy?: Policy;
}

const Authorized: React.FC<AuthorizedProps> = ({ policy, children, authority, noMatch }) => {
  const childrenRender = typeof children === 'undefined' ? null : children;
  return CheckPermissions(authority, childrenRender, noMatch, policy) as React.ReactElement;
};

export default connect(({ user }: ConnectState) => ({
  policy: user.policy,
}))(Authorized);
