import React, { Fragment, useCallback, useEffect, useMemo } from "react";
import VoiceIcon from "src/components/icons/VoiceIcon";
import GlobalIcon from "src/components/icons/GlobalIcon";
import UploadIcon from "src/components/icons/UploadIcon";
import NotificationIcon from "src/components/icons/NotificationIcon";
import NotificationIconNotRead from "src/components/icons/NotificationIconNotRead";
import {
  HeaderWrapper,
  LanguageItemActive,
  LanguageItemWrapper,
} from "./styles";
import Searchbar from "../Searchbar";
import { StyledDropdown } from "src/components/commons/Dropdown/styles";
import { StyledMenu } from "src/components/commons/Menu/styles";
import { Languages, QUERY_KEYS, USER_ROLES } from "src/utils/constants";
import { useTranslation } from "react-i18next";
import Text from "src/components/commons/Typography";
import Box from "src/components/commons/Box";
import Button from "src/components/commons/Button";
import { useRouter } from "next/router";
import ImageComponent from "src/components/commons/Image";
import { Path } from "src/utils/Path";
import Link from "next/link";
import { authService } from "src/services/AuthServices";
import { clearTokens } from "src/utils/axios/helper";
import { useQueryClient } from "react-query";
import { useRealTimeServices, useUser } from "src/hooks/apis";
import RealTimeServices from "src/services/RealTimeServices";
import useGetNotification from "src/hooks/apis/User/useGetNotifications";
import useMarkAllReadNotification from "src/hooks/apis/User/useMarkAllReadNotifications";
import NotificationsList from "../NotificationsList";
import BecomeInstructorModal from "../BecomeInstructorModal";
import { useModal } from "src/hooks";

const Header = () => {
  const router = useRouter();
  const { user, isError } = useUser();
  const { markAllReadNotification } = useMarkAllReadNotification(
    user?.userId ?? ""
  );
  const { data: notifications } = useGetNotification(user?.userId ?? "");
  const [init, destroy] = useRealTimeServices();
  const becomeInstructorModal = useModal();

  useEffect(() => {
    if (user && user.userId) {
      init(user.userId);
    }
  }, [user]);

  const handleOpenNotificationList = (value: any) => {
    if (!value) {
      markAllReadNotification(user?.userId ?? "");
    }
  };

  const countNotificationUnRead = useMemo(() => {
    return notifications?.reduce((acc, notification) => {
      return (acc += Number(!notification.read));
    }, 0);
  }, [notifications]);

  return (
    <HeaderWrapper height="50px">
      <div>
        <Searchbar />
        <VoiceIcon />
      </div>
      <div>
        <StyledDropdown
          overlay={<LanguageMenu />}
          trigger={["click"]}
          placement={"bottomRight"}
          arrow={{ pointAtCenter: true }}
        >
          <GlobalIcon />
        </StyledDropdown>
        {user ? (
          <>
            <StyledDropdown
              overlay={<NotificationsList />}
              trigger={["click"]}
              placement={"bottomRight"}
              arrow={{ pointAtCenter: true }}
              onOpenChange={handleOpenNotificationList}
            >
              {countNotificationUnRead === 0 ? (
                <NotificationIcon />
              ) : (
                <NotificationIconNotRead />
              )}
            </StyledDropdown>
            {user.role === USER_ROLES.AUTHOR && (
              <Button
                onClick={() => router.push("/courses/upload")}
                $type="white"
                borderRadius="25px"
              >
                <UploadIcon />
                <Box as={Text} padding="0 10px">
                  Upload
                </Box>
              </Button>
            )}
            {user.role === USER_ROLES.USER && (
              <Button
                onClick={becomeInstructorModal.toggleModal}
                $type="white"
                borderRadius="25px"
              >
                <Box as={Text} padding="0 10px">
                  Become an instructor?
                </Box>
              </Button>
            )}
            <StyledDropdown
              overlay={<UserDropdown />}
              trigger={["click"]}
              placement={"bottomRight"}
              arrow={{ pointAtCenter: true }}
            >
              <Box
                width="50px"
                height="50px"
                borderRadius="rounded"
                style={{ overflow: "hidden", cursor: "pointer" }}
              >
                {" "}
                <ImageComponent
                  fallBack="/assets/ava.png"
                  src={user?.avatarUrl ?? ""}
                  alt="avatar"
                  objectFit="cover"
                />
              </Box>
            </StyledDropdown>
          </>
        ) : (
          <Button onClick={() => router.push(Path.login)}>Sign In</Button>
        )}
      </div>
      <BecomeInstructorModal modal={becomeInstructorModal} />
    </HeaderWrapper>
  );
};

interface LanguageItemProps {
  Icon: React.MemoExoticComponent<
    (props: React.SVGProps<SVGSVGElement>) => JSX.Element
  >;
  text: string;
  itemKey: string;
}

const LanguageItem = ({ Icon, text, itemKey }: LanguageItemProps) => {
  const { i18n } = useTranslation();

  if (i18n.language === itemKey) {
    return (
      <LanguageItemActive>
        <Icon />
        <span>{text}</span>
      </LanguageItemActive>
    );
  }

  return (
    <LanguageItemWrapper>
      <Icon />
      <span>{text}</span>
    </LanguageItemWrapper>
  );
};

const LanguageMenu = () => {
  const { i18n } = useTranslation();

  const handleClick = (value: any) => {
    i18n.changeLanguage(value.key);
    console.log("language: ", i18n.language);
  };

  return (
    <StyledMenu
      onClick={handleClick}
      defaultValue={i18n.language}
      items={Languages.map((language) => {
        return {
          key: language.key,
          label: (
            <LanguageItem
              Icon={language.icon}
              text={language.text}
              itemKey={language.key}
            />
          ),
        };
      })}
    ></StyledMenu>
  );
};

const UserDropdown = () => {
  const router = useRouter();
  const client = useQueryClient();
  const [init, destroy] = useRealTimeServices();
  const { user } = useUser();

  const handleLogOut = useCallback(async () => {
    await authService.logout();
    clearTokens();
    client.setQueriesData(QUERY_KEYS.GET_ME, null);
    client.refetchQueries(QUERY_KEYS.GET_ME);
    client.removeQueries({ queryKey: [] });
    destroy();
    router.push(Path.home);
  }, [client]);

  const userDropdownOptions = useMemo(
    () => [
      {
        id: 1,
        label: (
          <Link href={`${Path.profile}/me`}>
            <Text>Profile</Text>
          </Link>
        ),
      },
      {
        ...(user?.role === USER_ROLES.AUTHOR
          ? {
              id: 2,
              label: (
                <Link href={`${Path.statistic}`}>
                  <Text>Statistic</Text>
                </Link>
              ),
            }
          : {
              id: 0,
              label: null,
            }),
      },
      {
        id: 3,
        label: (
          <Box onClick={handleLogOut}>
            <Text>Log Out</Text>
          </Box>
        ),
      },
    ],
    [handleLogOut, user]
  );

  return (
    <Box width="140px">
      <StyledMenu
        items={userDropdownOptions
          .filter((item) => Boolean(item.id))
          .map((option) => {
            return {
              key: option.id,
              label: option.label,
            };
          })}
      ></StyledMenu>
    </Box>
  );
};

export default Header;
