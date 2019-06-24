import isString from 'lodash/isString';
import isArray from 'lodash/isArray';

export interface IModuleAction {
  [module: string]: string [];
}

export interface IAction {
  module: string;
  name: string;
}

export interface IStatement {
    // 授权效力 allow: 允许 deny： 禁止
    effect: 'allow' | 'deny';
    action: '*' | string[];
}

export interface IPolicyData {
  version: string | number;
  statement: IStatement;
}

class Policy {
  public moduleMap: IModuleAction = {};
  public allowActions: string[];
  public denyActions: string[];

  constructor(private actions: IAction[]) {
    this.moduleMap = this.getModuleMap(actions);
    this.allowActions = [];
    this.denyActions = [];
  }
  getModuleMap = (actions: IAction[]): IModuleAction => {
    const moduleMap:IModuleAction = {};

    if (actions && actions.length) {
      actions.forEach(item => {
        const moduleName = item.module;
        const policyAction = `${item.module}/${item.name}`;
        if (!moduleMap[moduleName]) {
          moduleMap[moduleName] = [policyAction];
        } else {
          moduleMap[moduleName].push(policyAction);
        }
      })
    }
    return moduleMap;
  }

  verifyAction = (actions: string | string[]):boolean => {
    if (isString(actions)) {
      return this.oneActionVerify(actions);
    }
    if (isArray(actions)) {
      for(let i = 0; i < actions.length; i++) {
        const result = this.oneActionVerify(actions[i]);
        if (!result) {
          return false;
        }
      } 
    }
    return true;
  }

  oneActionVerify = (action: string) => {
    if (action === '*') {
      return true;
    } else {
      // 命中不允许使用的权限
      if (this.denyActions.includes(action)) {
        return false;
      }
      if (this.allowActions.includes(action)) {
        return true;
      }
    }
    return false;
  }
}

export default Policy;