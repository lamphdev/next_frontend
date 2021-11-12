import { Table, TableColumnType } from 'antd';

interface PropsType {
    data: any[];
    loading: boolean;
    columns: TableColumnType<any>;
}
