import Image from "next/image";
import React, { useMemo } from "react";
import {
  MenuWrapper,
  SidebarItemActive,
  SidebarItemWrapper,
  SidebarWrapper,
} from "./style";
import { getRoutes } from "../../../../layouts/DefaultLayout/constants";
import { RouteItem } from "src/utils/constants";
import Link from "next/link";
import { useRouter } from "next/router";

const StyledSidebarItem = ({ title, path, Icon }: RouteItem) => {
  const router = useRouter();

  if (router.asPath === path) {
    return (
      <SidebarItemActive>
        <Icon />
        <span>{title}</span>
      </SidebarItemActive>
    );
  }

  return (
    <Link href={path}>
      <SidebarItemWrapper>
        <Icon />
        <span>{title}</span>
      </SidebarItemWrapper>
    </Link>
  );
};

const StyledSidebar = () => {
  const routeList = useMemo(getRoutes, []);

  const renderRouteList = () => {
    return routeList.map((route, index) => {
      return <StyledSidebarItem {...route} key={index} />;
    });
  };

  return (
    <SidebarWrapper>
      <div className="relative w-40 h-6 mb-5">
        <Image src={"/assets/Logo.png"} layout={"fill"} objectFit={"cover"} />
      </div>
      <MenuWrapper>
        <p className="title">Menu</p>
        <ul className="list">{renderRouteList()}</ul>
      </MenuWrapper>
    </SidebarWrapper>
  );
};

export default StyledSidebar;
