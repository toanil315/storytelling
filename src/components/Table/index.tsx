import { TableProps as AntdTableProps } from "antd";
import { StyledTable } from "./styles";

export interface TableProps<T> extends AntdTableProps<T> {}

const Table = ({ ...restProps }: TableProps<any>) => {
  return <StyledTable {...restProps} />;
};

export default Table;
