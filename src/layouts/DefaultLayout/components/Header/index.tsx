import React, { Fragment, useCallback, useEffect, useMemo } from "react";
import VoiceIcon from "src/components/icons/VoiceIcon";
import GlobalIcon from "src/components/icons/GlobalIcon";
import UploadIcon from "src/components/icons/UploadIcon";
import NotificationIcon from "src/components/icons/NotificationIcon";
import NotificationIcon2 from "src/components/icons/NotificationIcon2";
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
import Center from "src/components/commons/Center";
import Button from "src/components/commons/Button";
import { useRouter } from "next/router";
import ImageComponent from "src/components/commons/Image";
import { Path } from "src/utils/Path";
import Link from "next/link";
import { authService } from "src/services/AuthServices";
import { localStorageClient } from "src/utils/localStorageClient";
import { clearTokens } from "src/utils/axios/helper";
import { useQueryClient } from "react-query";
import { useUser } from "src/hooks/apis";

const Header = () => {
  const router = useRouter();
  const { user, isError } = useUser();

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
            >
              <NotificationIcon />
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
                  src="/assets/avatar-fallback.png"
                  alt="avatar fallback"
                />
              </Box>
            </StyledDropdown>
          </>
        ) : (
          <Button onClick={() => router.push(Path.login)}>Sign In</Button>
        )}
      </div>
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

const NotificationsList = () => {
  const notificationsList = useMemo(() => {
    return [
      {
        id: 1,
        type: "comment",
        sender: {
          id: "123",
          name: "Ahmed Bukhatir",
        },
        content: "Comment on your video",
        time: "6m ago",
      },
      {
        id: 2,
        type: "comment",
        sender: {
          id: "123",
          name: "Ahmed Bukhatir",
        },
        content: "Comment on your video",
        time: "6m ago",
      },
      {
        id: 3,
        type: "comment",
        sender: {
          id: "123",
          name: "Ahmed Bukhatir",
        },
        content: "Comment on your video",
        time: "6m ago",
      },
    ];
  }, []);

  return (
    <Box width="400px">
      <StyledMenu
        title="Notifications"
        items={notificationsList.map((notification) => {
          return {
            key: notification.id,
            label: (
              <Box display="flex" padding="15px 5px">
                <Box
                  width="15px"
                  height="15px"
                  bg="danger"
                  borderRadius="rounded"
                  margin="0 20px 0 0"
                />
                <Box>
                  <Box display="flex" alignItems="center">
                    <Text
                      fontSize="base"
                      fontWeight="bold"
                      lineHeight="large"
                      color="text"
                    >
                      {notification.sender?.name}
                    </Text>
                    <Box
                      width="5px"
                      height="5px"
                      bg="textLight"
                      borderRadius="rounded"
                      margin="0 6px"
                    />
                    <Text
                      fontSize="xs"
                      fontWeight="regular"
                      lineHeight="normal"
                      color="textLight"
                    >
                      {notification.time}
                    </Text>
                  </Box>
                  <Text
                    fontSize="sm"
                    fontWeight="regular"
                    lineHeight="normal"
                    color="text"
                  >
                    {notification.content}
                  </Text>
                </Box>
              </Box>
            ),
          };
        })}
      ></StyledMenu>
    </Box>
  );
};

const UserDropdown = () => {
  const client = useQueryClient();
  const handleLogOut = useCallback(async () => {
    await authService.logout();
    clearTokens();
    client.setQueriesData(QUERY_KEYS.GET_ME, null);
    client.refetchQueries(QUERY_KEYS.GET_ME);
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
        id: 2,
        label: (
          <Box onClick={handleLogOut}>
            <Text>Log Out</Text>
          </Box>
        ),
      },
    ],
    [handleLogOut]
  );

  return (
    <Box width="140px">
      <StyledMenu
        items={userDropdownOptions.map((option) => {
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
