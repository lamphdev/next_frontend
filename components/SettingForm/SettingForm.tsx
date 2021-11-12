import { Button, Form, Input } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { ErrorMessage } from '@hookform/error-message';
import * as yup from 'yup';

interface PropsType {
    onSubmit?: (value) => void;
}

const settingSchema = yup.object({
    name: yup.string().required('this field is required').max(100, 'max length is 100'),
    metadata: yup.string().max(1020, 'max length is 1020')
});

export default function SettingForm({ onSubmit }: PropsType) {

    const { control, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(settingSchema) });

    const submitForm = (value) => {
        if (onSubmit) {
            onSubmit(value);
        }
    }

    return (
        <Form onFinish={handleSubmit(submitForm)}>
            <Form.Item>
                <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (<Input {...field} />)}
                />
                <ErrorMessage errors={errors} name="name" />
            </Form.Item>

            <Form.Item>
                <Controller
                    name="metadata"
                    control={control}
                    render={({ field }) => (<Input {...field} />)}
                />
                <ErrorMessage errors={errors} name="metadata" />
            </Form.Item>

            <Button onClick={handleSubmit(submitForm)}>Submit</Button>
        </Form>
    )
}