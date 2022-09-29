import styled from "styled-components";
import { Tabs } from "antd";

const StyledTabs = styled(Tabs)`
  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: ${({ theme }) => theme.colors.primary};
  }
  .ant-tabs-tab .ant-tabs-tab-btn {
    color: ${({ theme }) => theme.colors.text};
  }
  .ant-tabs-ink-bar {
    height: 3px !important;
    background: ${({ theme }) => theme.colors.primary};
  }
  .ant-tabs-top {
    .ant-tabs-nav {
      &::before {
        border-bottom: none !important;
      }
    }
  }
`;

export default StyledTabs;
