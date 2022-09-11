import React, { Fragment } from "react";
import VoiceIcon from "src/components/icons/VoiceIcon";
import GlobalIcon from "src/components/icons/GlobalIcon";
import UploadIcon from "src/components/icons/UploadIcon";
import NotificationIcon from "src/components/icons/NotificationIcon";
import NotificationIcon2 from "src/components/icons/NotificationIcon2";
import Button from "src/components/commons/Button";
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

interface LanguageItemProps {
  Icon: React.MemoExoticComponent<
    (props: React.SVGProps<SVGSVGElement>) => JSX.Element
  >;
  text: string;
  itemKey: string;
}

const LanguageItem = ({ Icon, text, itemKey }: LanguageItemProps) => {
  const {i18n} = useTranslation();

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
  const {i18n} = useTranslation();

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
  return (
    <HeaderWrapper>
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
        <Button $type="white">
          <UploadIcon />
          Upload
        </Button>
      </div>
    </HeaderWrapper>
  );
};

export default Header;
