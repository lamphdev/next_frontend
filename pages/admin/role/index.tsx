import { LphPage } from "../../../common/page-utils"
import AdminLayout from "../../../layouts/AdminLayout/AdminLayout"

import { Button, Modal, Popconfirm, Table } from 'antd';
import { ColumnsType } from "antd/lib/table";
import { useRoleHook } from "../../../common/role-hook";
import { useState } from "react";
import RoleForm from "../../../components/RoleForm/RoleForm";
import { Role } from "../../../services/role-service";


function RolePage() {
    const columns: ColumnsType<Role> = [
        {
            title: 'Role',
            key: 'role',
            dataIndex: 'role'
        },
        {
            title: 'Description',
            key: 'description',
            dataIndex: 'description'
        },
        {
            title: 'Meta data',
            key: 'metadata',
            dataIndex: 'metadata'
        },
        {
            title: '',
            key: 'action',
            render: (val, role) => (
                <div>
                    <Button
                        type="dashed"
                        onClick={() => {
                            setRole(role);
                            setVisibleModel(true);
                        }}
                        color="orange">
                        Edit
                    </Button>
                    <Popconfirm title="Are you sure?" okText="Yes" cancelText="No"
                        onConfirm={() => {
                            roleHook.fnDelete(role.role)
                        }}>
                        <Button danger>Delete</Button>
                    </Popconfirm>
                </div>
            )
        }
    ];
    const [visibleModel, setVisibleModel] = useState(false);
    const [role, setRole] = useState(null);
    const roleHook = useRoleHook({});

    const onCreate = async (data: Role) => {
        if (role) {
            await roleHook.fnUpdate(data);
        } else {
            await roleHook.fnCreate(data);
        }
        closeDialog();
    }

    const closeDialog = () => {
        setRole(null);
        setVisibleModel(false);
    }

    return (
        <div style={{ width: '100%', height: '100%', padding: '1rem', backgroundColor: '#fff' }}>
            <h1>Role Page</h1>
            <Button type="primary" onClick={() => setVisibleModel(true)}>Create</Button>
            <Modal
                title="Create role"
                visible={visibleModel}
                footer={null}
                onCancel={closeDialog}
                destroyOnClose>
                <RoleForm role={role} onSubmit={onCreate}></RoleForm>
            </Modal>
            <Table
                rowKey={row => row.role}
                loading={roleHook.loading}
                columns={columns}
                dataSource={roleHook.roles}
                pagination={false}
            ></Table>
        </div>
    )
}

export default LphPage(RolePage, AdminLayout);