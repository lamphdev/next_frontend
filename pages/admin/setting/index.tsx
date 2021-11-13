import { Button, Col, Row, Table, Modal } from "antd";
import { ColumnsType } from "antd/lib/table";
import React, { useState } from "react";
import { useClientEffect } from "../../../common/helper";
import { LphPage } from "../../../common/page-utils";
import { useSettingPagination } from "../../../common/setting-hook";
import { useSettingOptionPagination } from "../../../common/setting-option-hook";
import SettingForm from "../../../components/SettingForm/SettingForm";
import AdminLayout from "../../../layouts/AdminLayout/AdminLayout";
import { Setting, SettingOption } from "../../../services/setting-service";
import { ArrowRightOutlined } from '@ant-design/icons';
import OptionForm from "../../../components/OptionForm/OptionForm";


function AdminSetting() {

    const settingColumn: ColumnsType<Setting> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Meta data',
            dataIndex: 'metadata',
            key: 'metadata'
        },
        {
            title: 'Action',
            render: (val, sett) => <Button
                onClick={() => setCurrentSetting(sett)}
                type="primary" shape="circle"
                icon={<ArrowRightOutlined />} />
        }
    ];

    const optionColumn: ColumnsType<SettingOption> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Value',
            dataIndex: 'value',
            key: 'value'
        },
        {
            title: 'Meta data',
            dataIndex: 'metadata',
            key: 'metadata'
        }
    ];

    const [currentSetting, setCurrentSetting] = useState<Setting>(null);
    const settingHook = useSettingPagination();
    const settingOptionHook = useSettingOptionPagination();

    const [showSettingForm, setShowSettingForm] = useState(false);
    const [showOptionForm, setShowOptionForm] = useState(false);

    const onBtnCreateClick = () => {
        setShowSettingForm(true);
    }

    const onCreateSetting = (setting: Setting) => {
        settingHook.create(setting);
        setShowSettingForm(false);
    }

    const onCreateOption = (option: SettingOption) => {
        settingOptionHook.create(currentSetting.id, option);
        setShowOptionForm(false);
    }


    useClientEffect(() => {
        setCurrentSetting(null);
        settingHook.query(settingHook.filter);
    }, [settingHook.filter])

    useClientEffect(() => {
        if (currentSetting) {
            settingOptionHook.query(currentSetting?.id);
        }
    }, [currentSetting])

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
                    <Button type="primary" onClick={() => onBtnCreateClick()}>Create</Button>
                    <Table
                        rowKey={(data) => data.id}
                        columns={settingColumn}
                        dataSource={settingHook.page?.content}
                        loading={settingHook.loading}
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
                <div style={{ backgroundColor: '#fff', height: '100%' }}>
                    <Modal
                        visible={showOptionForm}
                        footer={null}
                        destroyOnClose
                        title='Create new setting'>
                        <OptionForm
                            onSubmit={onCreateOption}
                        ></OptionForm>
                    </Modal>
                    <Button type="primary"
                        disabled={!currentSetting}
                        onClick={() => setShowOptionForm(true)}>Create</Button>
                    <Table
                        rowKey={(row) => row.id}
                        columns={optionColumn}
                        loading={settingOptionHook.loading}
                        dataSource={settingOptionHook.page?.content}
                        pagination={{
                            total: settingOptionHook.page?.totalElements,
                            current: settingOptionHook.page?.pageNumber + 1,
                            pageSize: settingOptionHook.page?.pageSize,
                            onChange: (number, size) => settingOptionHook.setFilter({
                                ...settingHook.filter,
                                pageSize: size,
                                pageNumber: number - 1
                            })
                        }}
                    ></Table>
                </div>
            </Col>
        </Row>
    )
}

export default LphPage(AdminSetting, AdminLayout);