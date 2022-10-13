import React, { Fragment, useEffect } from "react";
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
import { Languages } from "src/utils/constants";
import { useTranslation } from "react-i18next";
import Text from "src/components/commons/Typography";
import Box from "src/components/commons/Box";
import Center from "src/components/commons/Center";
import Button from "src/components/commons/Button";
import { useRouter } from "next/router";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

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

const Header = () => {
  const router = useRouter();
  useEffect(() => {
    const initRabbitConnection = async () => {
      const result = await fetch(
        "http://103.173.255.221:8080/v1/notifications/endpoint/ffb141ea-6a78-4e23-a9b3-073cca3de065"
      );
      const { data } = await result.json();
      return data;
    };

    const MY_SUB_ID = "sub-0";

    try {
      var ws = new WebSocket("ws://103.173.255.221:15674/ws");
      const stompClient = Stomp.over(ws);
      stompClient.debug = function () {};
      stompClient.connect(
        "admin",
        "huynhngocthuat",
        async (frame) => {
          const data = await initRabbitConnection();
          stompClient.subscribe(
            `/queue/${data}`,
            (newContent) => {
              console.log("newContent: ", JSON.parse(newContent.body));
            },
            {
              id: MY_SUB_ID + "-" + (data || ""),
              durable: "false",
              exclusive: "false",
              ack: "client",
              "auto-delete": "false",
            }
          );
        },
        () => {
          console.log("error");
        },
        "/"
      );
    } catch (error: any) {
      console.log({ ...error });
    }
  }, []);

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
        <NotificationIcon />
        <Button
          onClick={() => router.push("/upload")}
          $type="white"
          borderRadius="25px"
        >
          <UploadIcon />
          <Box as={Text} padding="0 10px">
            Upload
          </Box>
        </Button>
      </div>
    </HeaderWrapper>
  );
};

export default Header;
