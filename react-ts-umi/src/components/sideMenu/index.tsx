import React, { useState } from 'react';
import SideMenu, { ISideMenuProps } from './sideMenu';
import { getFlatMenuKeys } from './utils';

const SideMenuWrapper: React.FC<ISideMenuProps> = (props) => {
  const { menuData } = props;
  const flatMenuKeys = getFlatMenuKeys(menuData);
  const [collapsed, setCollapsed] = useState<boolean>(true);

  const handleSetCollapsed = (value) => {
    setCollapsed(value);
  };

  return  (
    <div
      onMouseEnter={() => {
        handleSetCollapsed(false);
      }}
      onMouseLeave={() => {
        handleSetCollapsed(true);
      }}
    >
      <SideMenu
        {...props}
        flatMenuKeys={flatMenuKeys}
        collapsed={collapsed}
      />
    </div>
  );
};

export { ISideMenuProps };
export { IMenu } from './baseMenu';
export default React.memo(SideMenuWrapper);
