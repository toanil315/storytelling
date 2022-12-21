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
import { useGetListFollowByUser, useUser } from "src/hooks/apis";
import ImageComponent from "src/components/commons/Image";

const StyledSidebar = () => {
  const { user } = useUser();
  const { data: followList } = useGetListFollowByUser(user?.userId ?? "");
  const routeList = useMemo(getRoutes, []);
  const router = useRouter();

  const renderRouteList = () => {
    return routeList.map((route, index) => {
      return <StyledSidebarItem {...route} key={index} />;
    });
  };

  const renderFollowedUser = () => {
    return followList?.map((followItem) => {
      const instructor = followItem.instructorResponse;
      return (
        <Box
          onClick={() => router.push(`${Path.profile}/${instructor.id}`)}
          className="flex items-center cursor-pointer"
          key={instructor.id}
        >
          <Box
            width="40px"
            height="40px"
            borderRadius="rounded"
            overflow="hidden"
            margin="0 10px 0 0"
          >
            <ImageComponent
              fallBack={"/assets/ava.png"}
              src={instructor.avatarUrl ?? ""}
              alt="followed instructor"
              objectFit="cover"
            />
          </Box>
          <Text fontWeight="medium">{instructor.fullName}</Text>
        </Box>
      );
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
      <Box className="flex flex-col gap-y-4">
        <MenuWrapper>
          <Text fontSize="16px" fontWeight="500" lineHeight="24px" color="text">
            Menu
          </Text>
          <ul className="list">{renderRouteList()}</ul>
        </MenuWrapper>
        {Number(followList?.length) > 0 && (
          <MenuWrapper>
            <Text
              fontSize="16px"
              fontWeight="500"
              lineHeight="24px"
              color="text"
            >
              Follow:
            </Text>
            <ul className="flex flex-col gap-y-4">{renderFollowedUser()}</ul>
          </MenuWrapper>
        )}
      </Box>
    </Box>
  );
};

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

export default StyledSidebar;
