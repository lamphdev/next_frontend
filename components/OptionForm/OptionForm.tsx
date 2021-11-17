import { Button, Form, Input } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { ErrorMessage } from '@hookform/error-message';
import * as yup from 'yup';


const optionSchema = yup.object({
    name:       yup.string().required('this field is required').max(200, 'max length is 200'),
    value:      yup.string().required('this field is required').max(200, 'max length is 200'),
    metadata:   yup.string().max(1024, 'max length is 1024')
})

export default function OptionForm({ onSubmit }) {

    const { 
        control, 
        handleSubmit, 
        formState: { errors } 
    } = useForm({ resolver: yupResolver(optionSchema) });

    const onFormSubmit = (value) => {
        if (onSubmit) {
            onSubmit(value);
        }
    }

    return (
        <Form layout="vertical" onFinish={handleSubmit(onFormSubmit)}>
            <Form.Item label="Name">
                <Controller
                    name="name"
                    control={control}
                    render={({ field }) => <Input {...field} />}
                />
                <ErrorMessage errors={errors} name="name" />
            </Form.Item>
            <Form.Item label="Value">
                <Controller
                    name="value"
                    control={control}
                    render={({ field }) => <Input {...field} />}
                />
                <ErrorMessage errors={errors} name="value" />
            </Form.Item>
            <Form.Item label="Metadata">
                <Controller
                    name="metadata"
                    control={control}
                    render={({ field }) => <Input {...field} />}
                />
                <ErrorMessage errors={errors} name="metadata" />
            </Form.Item>

            <Button type="primary" htmlType="submit">Save</Button>
        </Form>
    )
}