import React from 'react';
import Exception from '@/components/exception';
// import CheckPermissions, { Authority } from './checkPermission';
import { AnyComponent } from './promiseRender';

const Exception403: React.FC = () => <Exception type="403"/>;

// 是否是Component
export const isComponent = (component: any): boolean => {
  if (!component) return false;
  const proto = Object.getPrototypeOf(component);
  if (proto === React.Component || proto === Function.prototype) {
    return true;
  }

  return isComponent(proto);
}