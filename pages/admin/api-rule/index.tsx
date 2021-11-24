import { useApiRuleHook } from "../../../common/api-rule-hook";
import { LphPage } from "../../../common/page-utils"
import AdminLayout from "../../../layouts/AdminLayout/AdminLayout"

import { Button, List, Modal, Tag, Table, Popconfirm } from 'antd';
import { useState } from "react";
import ApiRuleForm from "../../../components/ApiRuleForm/ApiRuleForm";
import { ColumnsType } from "antd/lib/table";
import { ApiRule } from "../../../services/api-rule-service";

const makeColumns = (setRule, setVisible, onDelete): ColumnsType<ApiRule> => {
    const columns: ColumnsType<ApiRule> = [
        {
            title: 'Method',
            key: 'method',
            dataIndex: 'method'
        },
        {
            title: 'Url pattern',
            key: 'urlPattern',
            dataIndex: 'urlPattern'
        },
        {
            title: 'Description',
            key: 'description',
            dataIndex: 'description'
        },
        {
            title: 'Roles',
            key: 'roles',
            render: (value, rule) => (
                <div>
                    {rule.roles.map(role => <Tag key={role}>{role}</Tag>)}
                </div>
            )
        },
        {
            title: '',
            key: 'delete',
            render: (value, rule) => (
                <div>
                    <Button type="dashed" onClick={() => {
                        setRule(rule);
                        setVisible(true);
                    }}>Edit</Button>
                    <Popconfirm title="Are you sure?" onConfirm={() => onDelete(rule.id)}>
                        <Button danger type="dashed">Delete</Button>
                    </Popconfirm>
                </div>
            )
        }
    ];
    return columns;
}

function ApiRulePage() {

    const [rule, setRule] = useState<ApiRule>(null);
    const [visible, setVisible] = useState<boolean>(false);
    const apiRuleHook = useApiRuleHook();

    const cancelModal = () => {
        setRule(null);
        setVisible(false);
    }

    const saveApiRule = (data) => {
        if (rule) {
            apiRuleHook.fnUpdate(data);
        } else {
            apiRuleHook.fnCreate(data);
        }
        cancelModal();
    }


    const deleteApiRule = (role: string) => {
        apiRuleHook.fnDelete(role);
        cancelModal();
    }

    const columns = makeColumns(setRule, setVisible, deleteApiRule);

    return (
        <div style={{ width: '100%', height: '100%', padding: '1rem', backgroundColor: '#fff' }}>
            <h1>Api rule page</h1>

            <Button type="primary" onClick={() => setVisible(true)}>Create</Button>

            <Modal
                destroyOnClose
                visible={visible} title="Create api rule"
                onCancel={cancelModal} footer={null}>
                <ApiRuleForm apiRule={rule} onSubmit={saveApiRule}></ApiRuleForm>
            </Modal>

            <Table
                columns={columns}
                pagination={false}
                rowKey={(row) => row.id}
                loading={apiRuleHook.loading}
                dataSource={apiRuleHook.apiRules}>
            </Table>
        </div>
    )
}

export default LphPage(ApiRulePage, AdminLayout);