import React, { PureComponent, Suspense } from 'react';

import { Menu, Icon } from 'antd';
import Link from 'umi/link';
// import { urlToList } from '../_utils/pathTools';
import styles from './index.less';
const { SubMenu } = Menu;

export default class BaseMenu extends PureComponent {

  /**
   * get SubMenu or Item
   */
  // getSubMenuOrItem = item => {
  //   // doc: add hideChildrenInMenu
  //   if (item.children && !item.hideChildrenInMenu && item.children.some(child => child.name)) {
  //     const { name } = item;
  //     let params = item.descript ? JSON.parse(item.descript) : {};
  //     return (
  //       <SubMenu
  //         title={
  //           params.icon ? (
  //             <span>
  //               {getIcon(params.icon)}
  //               <span>{name}</span>
  //             </span>
  //           ) : (
  //               name
  //             )
  //         }
  //         key={item.path}
  //       >
  //         {this.getNavMenuItems(item.children)}
  //       </SubMenu>
  //     );
  //   }
  //   return <Menu.Item key={item.path}>{this.getMenuItemPath(item)}</Menu.Item>;
  // };

  /**
   * 判断是否是http链接.返回 Link 或 a
   * Judge whether it is http link.return a or Link
   * @memberof SiderMenu
   */
  // getMenuItemPath = item => {
  //   const { name } = item;
  //   const itemPath = this.conversionPath(item.path);
  //   let params = item.descript ? JSON.parse(item.descript) : {};
  //   const icon = params.icon?getIcon(params.icon):"";
  //   const { target } = item;
  //   // Is it a http link
  //   if (/^https?:\/\//.test(itemPath)) {
  //     return (
  //       <a href={itemPath} target={target}>
  //         {icon}
  //         <span>{name}</span>
  //       </a>
  //     );
  //   }
  //   const { location, isMobile, onCollapse } = this.props;
  //   return (
  //     <Link
  //       to={itemPath}
  //       target={target}
  //       replace={itemPath === location.pathname}
  //       onClick={
  //         isMobile
  //           ? () => {
  //             onCollapse(true);
  //           }
  //           : undefined
  //       }
  //     >
  //       {icon}
  //       <span>{name}</span>
  //     </Link>
  //   );
  // };

  // conversionPath = path => {
  //   if (path && path.indexOf('http') === 0) {
  //     return path;
  //   }
  //   return `/${path || ''}`.replace(/\/+/g, '/');
  // };

  render() {
    //   const {
    //     openKeys,
    //     theme,
    //     mode,
    //     location: { pathname },
    //     className,
    //     collapsed,
    //   } = this.props;

    return (


      <Menu
        key="Menu"
      //   mode={mode}
      //   theme={theme}
      //   onOpenChange={handleOpenChange}
      //   selectedKeys={selectedKeys}
      //   style={style}
      //   className={cls}
      //   {...props}
      >
        {/* {this.getNavMenuItems(menuData)} */}
          here is header
      </Menu>

    );
  }
}
