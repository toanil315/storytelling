import Image from "next/image";
import React, { useMemo } from "react";
import { MenuWrapper, SidebarItemActive, SidebarItemWrapper } from "./style";
import { getRoutes } from "../../../../layouts/DefaultLayout/constants";
import { RouteItem } from "src/utils/constants";
import Link from "next/link";
import { useRouter } from "next/router";
import Box from "src/components/commons/Box";
import Text from "src/components/commons/Typography";
import { Path } from "src/utils/Path";

const StyledSidebarItem = ({ title, path, Icon }: RouteItem) => {
  const router = useRouter();

  if (router.pathname === path) {
    return (
      <SidebarItemActive>
        <Icon />
        <Text fontSize="16px" fontWeight="400" lineHeight="24px">
          {title}
        </Text>
      </SidebarItemActive>
    );
  }

  return (
    <Link href={path}>
      <SidebarItemWrapper>
        <Icon />
        <Text fontSize="16px" fontWeight="400" lineHeight="24px">
          {title}
        </Text>
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
    <Box width="15%" height="100vh" bg="white" padding="33px 20px 40px">
      <Link href={Path.home}>
        <div className="relative w-40 h-6 mb-8">
          <Image
            src={"/assets/Logo.png"}
            layout={"fill"}
            objectFit={"cover"}
            alt="logo"
          />
        </div>
      </Link>
      <MenuWrapper>
        <Text fontSize="16px" fontWeight="500" lineHeight="24px" color="text">
          Menu
        </Text>
        <ul className="list">{renderRouteList()}</ul>
      </MenuWrapper>
    </Box>
  );
};

export default StyledSidebar;
