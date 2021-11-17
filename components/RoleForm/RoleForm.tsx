import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { Button, Form, Input } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useClientEffect } from '../../common/helper';
import { Role } from '../../services/role-service';

interface PropsType {
    role?: Role,
    onSubmit?: any;
}

const roleSchema = yup.object({
    role: yup.string().required('This field is required').max(100, 'Max length is 100'),
    description: yup.string().required('This field is required').max(1024, 'Max length is 1204'),
    metadata: yup.string().required('This field is required').max(1024, 'Max length is 1204')
});

export default function RoleForm({ role, onSubmit }: PropsType) {

    const { control, formState: { errors }, handleSubmit, setValue } = useForm({ resolver: yupResolver(roleSchema), defaultValues: role })

    const onFinish = (data) => {
        if (onSubmit) {
            onSubmit(data);
        }
    }

    return (
        <Form layout="vertical" onFinish={handleSubmit(onFinish)} autoComplete="off">
            <Form.Item label="Role">
                <Controller
                    control={control}
                    name="role"
                    render={({ field }) => <Input {...field} onInput={(e: any) => e.target.value = ('' + e.target.value).toUpperCase()} />}
                />
                <ErrorMessage errors={errors} name="role" />
            </Form.Item>

            <Form.Item label="Description">
                <Controller
                    control={control}
                    name="description"
                    render={({ field }) => <Input {...field} />}
                />
                <ErrorMessage errors={errors} name="description" />
            </Form.Item>

            <Form.Item label="Meta data">
                <Controller
                    control={control}
                    name="metadata"
                    render={({ field }) => <Input {...field} />}
                />
                <ErrorMessage errors={errors} name="metadata" />
            </Form.Item>

            <Button type="primary" htmlType="submit">Save</Button>
        </Form>
    )
}