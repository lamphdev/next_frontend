import { Button, Col, Row, Table, Modal } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useState } from "react";
import { useClientEffect } from "../../../common/helper";
import { LphPage } from "../../../common/page-utils";
import { useSettingPagination } from "../../../common/setting-hook";
import { useSettingOptionPagination } from "../../../common/setting-option-hook";
import SettingForm from "../../../components/SettingForm/SettingForm";
import AdminLayout from "../../../layouts/AdminLayout/AdminLayout";
import { Setting, SettingOption } from "../../../services/setting-service";

const settingColumn: ColumnsType<Setting> = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: 'Meta data',
        dataIndex: 'metadata',
        key: 'metadata'
    }
]


function AdminSetting() {

    const settingHook = useSettingPagination();
    const settingOptionHook = useSettingOptionPagination();

    const [showSettingForm, setShowSettingForm] = useState(false);

    const onBtnCreateClick = () => {
        setShowSettingForm(true);
    }

    const onCreateSetting = (setting: Setting) => {
        settingHook.create(setting);
        setShowSettingForm(false);
    }


    useClientEffect(() => {
        settingHook.query(settingHook.filter);
    }, [settingHook.filter])

    return (
        <Row gutter={16} style={{ width: '100%', height: '100%' }}>
            <Col span={12}>
                <Modal
                    visible={showSettingForm}
                    footer={null}
                    destroyOnClose
                    title={'Create new setting'}>
                    <SettingForm onSubmit={onCreateSetting}></SettingForm>
                </Modal>
                <div style={{ backgroundColor: '#fff', height: '100%' }}>
                    <Button onClick={() => onBtnCreateClick()}>Create</Button>
                    <Table
                        rowKey={(data) => data.id}
                        columns={settingColumn}
                        dataSource={settingHook.page?.content}
                        loading={settingHook.loading}
                        expandable={{
                            onExpand: (expaned, setting) => { if (expaned) { settingOptionHook.query(setting.id) } },
                            expandedRowRender: (s) => <Table dataSource={settingOptionHook.page?.content}></Table>
                        }}
                        pagination={{
                            total: settingHook.page?.totalElements,
                            current: settingHook.page?.pageNumber + 1,
                            pageSize: settingHook.page?.pageSize,
                            onChange: (number, size) => settingHook.setFilter({
                                ...settingHook.filter,
                                pageSize: size,
                                pageNumber: number - 1
                            })
                        }}
                    ></Table>
                </div>
            </Col>
            <Col span={12}>
                <div style={{ backgroundColor: '#fff', height: '100%' }}></div>
            </Col>
        </Row>
    )
}

export default LphPage(AdminSetting, AdminLayout);