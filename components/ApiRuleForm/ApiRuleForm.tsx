import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { Form, Input, Select, Divider, Button } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useRoleHook } from '../../common/role-hook';
import { ApiRule } from '../../services/api-rule-service';

const schema = yup.object({
    urlPattern: yup.string().required('This field is required').max(200, 'Max length is 200'),
    method: yup.string().required('This field is required').max(20, 'Max length is 20'),
    description: yup.string().max(1024, 'Max length is 1024'),
    roles: yup.array().of(
        yup.string().max(100, 'Max length is 100')
    )
})

interface PropsType {
    onSubmit?: any;
    apiRule?: ApiRule;
}

export default function ApiRuleForm({ onSubmit, apiRule }: PropsType) {

    const { control, formState: { errors }, handleSubmit } = useForm({ resolver: yupResolver(schema), defaultValues: apiRule })
    const roleHook = useRoleHook();

    const onFinish = (data) => {
        if (onSubmit) {
            onSubmit(data);
        }
    }

    return (
        <Form layout="vertical" onFinish={handleSubmit(onFinish)} autoComplete="off">

            <Form.Item label="Url pattern">
                <Controller
                    control={control}
                    name="urlPattern"
                    render={({ field }) => <Input {...field} />}
                />
                <ErrorMessage errors={errors} name="urlPattern" />
            </Form.Item>

            <Form.Item label="Method">
                <Controller
                    control={control}
                    name="method"
                    render={({ field }) => (
                        <Select {...field}>
                            <Select.Option key="*" value="*">All</Select.Option>
                            <Select.Option key="GET" value="GET">Get</Select.Option>
                            <Select.Option key="POST" value="POST">Post</Select.Option>
                            <Select.Option key="PUT" value="PUT">Put</Select.Option>
                            <Select.Option key="DELETE" value="DELETE">Delete</Select.Option>
                        </Select>
                    )}
                />
                <ErrorMessage errors={errors} name="method" />
            </Form.Item>

            <Form.Item label="Description">
                <Controller
                    control={control}
                    name="description"
                    render={({ field }) => <Input.TextArea {...field} rows={4} />}
                />
                <ErrorMessage errors={errors} name="description" />
            </Form.Item>

            <Form.Item label="Roles">
                <Controller
                    control={control}
                    name="roles"
                    render={({ field }) => (
                        <Select {...field} mode="multiple">
                            {roleHook.roles.map(
                                el => <Select.Option
                                    key={el.role}
                                    value={el.role}>
                                    {el.role}
                                </Select.Option>
                            )}
                        </Select>
                    )}
                />
                <ErrorMessage errors={errors} name="roles" />
            </Form.Item>

            <Divider />

            <Button type="primary" htmlType="submit">Save</Button>

        </Form>
    )
}