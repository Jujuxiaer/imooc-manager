import React from 'react';
import { Card, Form, Button, Input, Icon, Message, Radio, InputNumber, Select, Switch, DatePicker, TimePicker, Upload, Checkbox } from "antd";
import moment from 'moment';
import "./index.less";

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const SelectOption = Select.Option;
const InputTextArea = Input.TextArea;

class FormRegister extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    handleChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            this.getBase64(info.file.originFileObj, imageUrl => this.setState({
                userImg: imageUrl,
                loading: false,
            }));
        }
    }

    handleSubmit = () => {
        let userInfo = this.props.form.getFieldsValue();
        console.log(JSON.stringify(userInfo))
        Message.success(`${userInfo.userName} 恭喜你，您通过本次表单组件学习，当前密码为：${userInfo.password}`)
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const labelCol = { xs: 24, sm: 4 }, wrapperCol = { xs: 24, sm: 12 };
        const offsetLayout = {
            wrapperCol: {
                xs: 24,
                sm: {
                    span: 12,
                    offset: 4
                }
            }
        }
        return (
            <div className="form-register-warp">
                <Card title="注册表单" className="card">
                    <Form
                        labelCol={labelCol}
                        wrapperCol={wrapperCol}
                    >
                        <FormItem label="用户名" className="form-item">
                            {
                                getFieldDecorator('userName', {
                                    rules: [{
                                        required: true,
                                        message: '请输入用户名!'
                                    }]
                                })(
                                    <Input type="text" placeholder="请输入用户名" />
                                )
                            }
                        </FormItem>

                        <FormItem label="密码:">
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
                                    <Input type="password" placeholder="请输入密码" />
                                )
                            }
                        </FormItem>

                        <FormItem label="性别:">
                            {
                                getFieldDecorator('sex', {
                                    initialValue: '1'
                                })(
                                    <RadioGroup>
                                        <Radio value="1">男</Radio>
                                        <Radio value="0">女</Radio>
                                    </RadioGroup>
                                )
                            }
                        </FormItem>

                        <FormItem label="年龄:">
                            {
                                getFieldDecorator('age', {
                                    initialValue: '18'
                                })(
                                    <InputNumber
                                        min={18}
                                        max={120}
                                    />
                                )
                            }
                        </FormItem>
                        <FormItem label="当前状态:">
                            {
                                getFieldDecorator('currentStatus', {
                                    initialValue: '0'
                                })(
                                    <Select>
                                        <SelectOption value="0">咸鱼一条</SelectOption>
                                        <SelectOption value="1">风华浪子</SelectOption>
                                        <SelectOption value="2">北大才子一枚</SelectOption>
                                        <SelectOption value="3">百度FE</SelectOption>
                                        <SelectOption value="4">创业者</SelectOption>
                                    </Select>
                                )
                            }
                        </FormItem>

                        <FormItem label="爱好:">
                            {
                                getFieldDecorator('hobby', {
                                    initialValue: ['0', '1']
                                })(
                                    <Select
                                        mode="tags"
                                    >
                                        <SelectOption value="0">游泳</SelectOption>
                                        <SelectOption value="1">打篮球</SelectOption>
                                        <SelectOption value="2">踢足球</SelectOption>
                                        <SelectOption value="3">骑行</SelectOption>
                                        <SelectOption value="4">爬山</SelectOption>
                                        <SelectOption value="5">台球</SelectOption>
                                        <SelectOption value="6">游戏</SelectOption>
                                        <SelectOption value="7">唱K</SelectOption>
                                    </Select>
                                )
                            }
                        </FormItem>

                        <FormItem label="是否已婚:">
                            {
                                getFieldDecorator('married', {
                                    valuePropName: 'checked',
                                    initialValue: true
                                })(
                                    <Switch />
                                )
                            }
                        </FormItem>

                        <FormItem label="生日:">
                            {
                                getFieldDecorator('birthday', {
                                    initialValue: moment(new Date())
                                })(
                                    <DatePicker
                                        showTime
                                        format="YYYY-MM-DD HH:mm"
                                        placeholder="请选择生日"
                                    />
                                )
                            }
                        </FormItem>

                        <FormItem label="联系地址:">
                            {
                                getFieldDecorator('address', {
                                    initialValue: '北京市海淀区奥林匹克公园'
                                })(
                                    <InputTextArea rows={4} />
                                )
                            }
                        </FormItem>

                        <FormItem label="早起时间:">
                            {
                                getFieldDecorator('startTime', {
                                    initialValue: moment('2018-09-12 08:00:00')
                                })(
                                    <TimePicker
                                        placeholder="请选择"
                                    />
                                )
                            }
                        </FormItem>

                        <FormItem label="头像:">
                            {
                                getFieldDecorator('avatar', {
                                    rules: [{
                                        required: true,
                                        message: '请上传头像'
                                    }]
                                })(
                                    <Upload
                                        action="//jsonplaceholder.typicode.com/posts/"
                                        listType="picture-card"
                                        className="avatar-uploader"
                                    >
                                        <Icon type='plus' />
                                    </Upload>
                                )
                            }
                        </FormItem>

                        <FormItem {...offsetLayout}>
                            {
                                getFieldDecorator('userImg')(
                                    <Checkbox>我已阅读过<a href="#">慕课协议</a></Checkbox>
                                )
                            }
                        </FormItem>

                        <FormItem {...offsetLayout}>
                            <Button type="primary" onClick={this.handleSubmit}>注册</Button>
                        </FormItem>

                    </Form>
                </Card>
            </div>
        )
    }
}

export default Form.create({ name: 'register' })(FormRegister);