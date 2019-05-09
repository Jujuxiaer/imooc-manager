import React from 'react';
import { Card, Form, Button, Input, Checkbox, Icon, Message } from "antd";
import "./index.less";

const FormItem = Form.Item;

class FormLogin extends React.Component {

    handleSubmit = () => {
        // let userInfo = this.props.form.getFieldValue();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                Message.success(`第一种获取用户信息方式：用户${values.userName}登陆成功`)
                // Message.success(`第二种获取用户信息方式：用户${userInfo.userName}登陆成功`)
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="form-login-warp">
                <Card title="登录行内表单">
                    <Form layout="inline">
                        <FormItem>
                            <Input placeholder="请输入用户名" />
                        </FormItem>
                        <FormItem>
                            <Input placeholder="请输入密码" />
                        </FormItem>
                        <FormItem>
                            <Button type="primary">登陆</Button>
                        </FormItem>
                    </Form>
                </Card>
                <Card title="登录水平表单">
                    <Form style={{ width: 300 }}>
                        <FormItem>
                            {
                                getFieldDecorator('userName', {
                                    rules: [{
                                        required: true,
                                        message: '请输入用户名!'
                                    }, {
                                        pattern: new RegExp('^\\w+$', 'g'),
                                        message: "用户名必须为字母或数字"
                                    }]
                                })(
                                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} type="text" placeholder="请输入用户名" />
                                )
                            }
                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator('password', {
                                    rules: [{
                                        required: true,
                                        message: '请输入密码!'
                                    }, {
                                        max: 16,
                                        message: '密码长度不能超过16位!'
                                    }, {
                                        min: 6,
                                        message: '密码长度不能小于6位!'
                                    }]
                                })(
                                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入密码" />
                                )
                            }
                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator('remember', {
                                    valuePropName: 'checked',
                                    initialValue: true
                                })(
                                    <Checkbox>记住密码</Checkbox>
                                )
                            }
                            <a href="/admin/form/login" style={{ float: 'right' }}>忘记密码</a>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" onClick={this.handleSubmit}>登录</Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        )
    }
}

export default Form.create({ name: 'form_login' })(FormLogin);