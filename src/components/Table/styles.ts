import { Table } from "antd";
import styled from "styled-components";

export const StyledTable = styled(Table)`
  .ant-table {
    border: 1px solid ${({ theme }) => theme.colors.lightGray};
    border-radius: 15px;
    box-shadow: ${({ theme }) => theme.shadows.box};
  }
  .ant-table-container table > thead > tr:first-of-type th:first-of-type {
    border-top-left-radius: 15px;
  }
  .ant-table-container table > thead > tr:first-of-type th:last-child {
    border-top-right-radius: 15px;
  }
  .ant-table-row:last-of-type .ant-table-cell {
    &:first-of-type {
      border-bottom-left-radius: 15px;
    }
    &:last-of-type {
      border-bottom-right-radius: 15px;
    }
  }

  .ant-table-tbody > tr.ant-table-placeholder > .ant-table-cell {
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
  }

  .ant-table-thead
    > tr
    > th:not(:last-child):not(.ant-table-selection-column):not(.ant-table-row-expand-icon-cell):not([colspan])::before {
    content: none;
  }
  .ant-table-tbody > tr > td {
    vertical-align: middle;
  }
  .ant-pagination.ant-table-pagination {
    .ant-pagination-item-link,
    .ant-pagination-item {
      border-radius: ${({ theme }) => theme.radii.large};
      vertical-align: middle;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;
