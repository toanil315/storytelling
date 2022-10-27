import { TableProps as AntdTableProps } from "antd";
import { StyledTable } from "./styles";
import RightIcon from "src/components/icons/RightIcon";
import DownIcon from "src/components/icons/DropDownIcon";

export interface TableProps<T> extends AntdTableProps<T> {}

const CustomExpandIcon = (props: any) => {
  if (props.expanded) {
    return (
      <span
        style={{ cursor: "pointer" }}
        onClick={(e) => {
          props.onExpand(props.record, e);
        }}
      >
        <DownIcon />
      </span>
    );
  }

  return (
    <span
      style={{ cursor: "pointer" }}
      onClick={(e) => {
        props.onExpand(props.record, e);
      }}
    >
      <RightIcon />
    </span>
  );
};

const Table = ({ ...restProps }: TableProps<any>) => {
  return (
    <StyledTable
      expandIcon={(propsExpand) => <CustomExpandIcon {...propsExpand} />}
      {...restProps}
    />
  );
};

export default Table;
