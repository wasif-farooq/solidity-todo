import React, {useContext, useState} from 'react';
import { Button, Form, Input } from 'antd';
import Enable from "../../contexts/enable";
import services from "../../services";


export const CreateNewTodo = () => {
    const enable = useContext(Enable)
    const [title, setTitle] = useState('');

    const onFinish = (values) => {
        console.log('Received values from form: ', values);
        services.get('todo').add(values.title)
    };

    const checkTitle = (_, value) => {
        if (value !== '') {
            return Promise.resolve();
        }
        return Promise.reject(new Error('Title should not be empty!'));
    };

    const onTitleChange = (e) => {
        const value = e.target.value || '';
        if (typeof value !== 'string') {
            return;
        }
        setTitle(value);
    };

    return (
        <Form
            name="customized_form_controls"
            layout="inline"
            onFinish={onFinish}
            initialValues={{
               title: ''
            }}
        >
            <Form.Item name="title" label="Title" rules={[{ validator: checkTitle }]}>
                <Input
                    type="text"
                    value={title}
                    onChange={onTitleChange}
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

