import { TableProps as AntdTableProps } from "antd";
import { StyledTable } from "./styles";
import RightIcon from "src/components/icons/RightIcon";
import DownIcon from "src/components/icons/DropDownIcon";
import { UseTableHelper } from "src/hooks/useTable";

export interface TableProps<T> extends AntdTableProps<T> {
  table: UseTableHelper;
  total?: number;
}

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

const Table = ({ table, ...restProps }: TableProps<any>) => {
  return (
    <StyledTable
      expandIcon={(propsExpand) => <CustomExpandIcon {...propsExpand} />}
      {...restProps}
      pagination={{
        hideOnSinglePage: true,
        onChange: table.onPageChange,
        pageSize: table.pageSize,
        ...(restProps.total ? { total: restProps.total } : {}),
      }}
    />
  );
};

export default Table;
