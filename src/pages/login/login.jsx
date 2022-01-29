import React, { Component } from 'react'
import './login.less'
import logo from './images/logo.png'
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
const Item = Form.Item

export default class Login extends Component {

    validatePassword = (_, value) => {
        try {
            if (!value) {
                return Promise.reject(new Error('请输入密码'));
            } else if (value.length < 4) {
                return Promise.reject(new Error('"密码至少4位'));
            } else if (value.length > 12) {
                return Promise.reject(new Error('密码最多12位'));
            } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
                return Promise.reject(new Error('密码只能由数字字母下划线组成'));
            }
            return Promise.resolve()
        } catch (err) {
            return Promise.reject(new Error(err));
        }
    }

    render() {
        const onFinish = (values) => {
            console.log('Received values of form: ', values);
        };



        return <div className='login'>
            <header className='login-header'>
                <img src={logo} alt="logo" />
                <h1>视频智能分析系统</h1>
            </header>
            <section className='login-content'>
                <h2>用户登陆</h2>
                <Form
                    name="normal_login"
                    className="login-form"
                    onFinish={onFinish}
                >
                    <Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                whitespace: true,
                                message: '请输入用户名!',
                            },
                            {
                                min: 4,
                                message: '用户名至少4位'
                            },
                            {
                                max: 12,
                                message: '用户名最多12位'
                            },
                            {
                                pattern: /^[a-zA-Z0-9_]+$/,
                                message: '用户名只能由数字字母下划线组成'
                            }
                        ]}
                        initialValue='admin'
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                    </Item>
                    <Item
                        name="password"
                        rules={[
                            {
                                validator: this.validatePassword,
                            },
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="密码"
                        />
                    </Item>
                    <Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登陆
                        </Button>
                    </Item>
                </Form>
            </section>
        </div>
    }
}