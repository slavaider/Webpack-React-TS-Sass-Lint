import React from "react";

import { Drawer, DrawerProps } from "antd";

export type MyDrawerProps = React.PropsWithChildren<DrawerProps>;

const MyDrawer: React.FC<MyDrawerProps> = ({
  children,
  ...props
}: MyDrawerProps) => {
  return <Drawer {...props}>{children}</Drawer>;
};

export default MyDrawer;
