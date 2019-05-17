import { IMenu } from '@/components/side-menu';



export interface IRoute extends IMenu {
  routes?: IMenu[];

}

export interface IMenuModelState {
  menuData: IMenu[];
  routerData: IRoute[];
  breadcrumbNameMap: object;
}
