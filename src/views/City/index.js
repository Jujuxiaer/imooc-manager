import React from 'react';
import { Card, Form, Button, Message, Radio, Select, Row, Col, Table, Modal } from "antd";
import { cityConfig, carModeConfig, opModeConfig, authConfig } from '../../config/fieldRenderConfig';
import Utils from '../../utils/utils';
import axios from '../../axios/axios';
import "./index.less";

const { Option } = Select;

export default class City extends React.Component {
    constructor(props) {
        super(props)
        this.params = {
            page: 1,
            pageSize: 10
        }
        this.state = {
            pagination: {}
        }
    }

    componentWillMount() {
        this.getOpenCityList();
    }

    //开通城市提交请求
    handleSubmit = () => {
        // e.preventDefault();
        const fomrFieldsValue = this.OpenCityForm.props.form.getFieldsValue();
        console.log(fomrFieldsValue);
        axios.ajax({
            url: '/city/open',
            params: fomrFieldsValue
        }).then(res => {
            if (res.code === "0") {
                Message.success(`开通成功`)
                this.setState({
                    isShowOpenCity: false
                })
                this.getOpenCityList();
            }

        })
    }

    //获取开通城市列表数据
    getOpenCityList = () => {
        axios.ajax({
            url: '/open_city_list',
            params: this.params
        }).then(res => {
            if (res.code === "0") {
                res.result.item_list.map((item, index) => {
                    item.key = index
                })
                this.setState({
                    dataSource: res.result.item_list,
                    pagination: Utils.pagination(res.result, (page, pageSize) => {
                        this.params = {
                            page,
                            pageSize
                        }
                        this.getOpenCityList()
                    })
                })
            }

        })
    }

    //重置搜索表单
    resetSearchForm = () => {
        this.searchForm.props.form.resetFields()
    }

    render() {
        const columns = [{
            title: '城市ID',
            dataIndex: 'id',
            align: 'center'
        }, {
            title: '城市名称',
            dataIndex: 'city_name',
            align: 'center'
        }, {
            title: '用车模式',
            dataIndex: 'car_mode',
            align: 'center',
            render: (car_mode) => {
                return carModeConfig[car_mode];
            }
        }, {
            title: '运营模式',
            dataIndex: 'op_mode',
            align: 'center',
            render: (op_mode) => {
                return opModeConfig[op_mode];
            }
        }, {
            title: '授权加盟商',
            dataIndex: 'franchisee_name',
            align: 'center'
        }, {
            title: '城市管理员',
            dataIndex: 'city_admins',
            align: 'center',
            render: (city_admins) => {
                return city_admins.map((item) => {
                    return item.user_name;
                }).join(',');
            }
        }, {
            title: '城市开通时间',
            dataIndex: 'open_time',
            align: 'center'
        }, {
            title: '操作时间',
            dataIndex: 'update_time',
            align: 'center'
        }, {
            title: '操作人',
            dataIndex: 'sys_user_name',
            align: 'center'
        }]

        return (
            <div className="city-warp">
                <Card className="card">
                    <Row>
                        <Col xl={12} lg={24}>
                            <SearchForm wrappedComponentRef={(searchForm) => {
                                this.searchForm = searchForm;
                            }} />
                        </Col>
                        <Col xl={5} lg={24}>
                            <Form layout="inline">
                                <Form.Item>
                                    <Button type="primary" onClick={this.getOpenCityList}>查询</Button>
                                </Form.Item>
                                <Form.Item>
                                    <Button onClick={this.resetSearchForm}>重置</Button>
                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>
                </Card>
                <Card>
                    <Button type="primary" onClick={() => {
                        this.setState({
                            isShowOpenCity: true
                        })
                    }}>
                        开通城市
          </Button>
                </Card>
                <div className="contend-warp">
                    <Table
                        columns={columns}
                        dataSource={this.state.dataSource}
                        bordered
                        rowKey="id"
                        pagination={this.state.pagination}
                    >
                    </Table>
                </div>
                <Modal
                    visible={this.state.isShowOpenCity}
                    title="开通城市"
                    cancelText="取消"
                    okText="开通"
                    onOk={this.handleSubmit}
                    onCancel={() => {
                        this.setState({
                            isShowOpenCity: false
                        })
                    }}
                >
                    <OpenCityForm wrappedComponentRef={(OpenCityForm) => {
                        this.OpenCityForm = OpenCityForm;
                    }}></OpenCityForm>
                </Modal>
            </div>
        )
    }
}

//头部的搜索表单组件
class HeaderForm extends React.Component {
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form layout="inline">
                <Form.Item label="城市">
                    {
                        getFieldDecorator('city', {
                            initialValue: '0'
                        })(
                            <Select style={{ width: 80 }}>
                                <Option value="0">全部</Option>
                                {
                                    Object.keys(cityConfig).map((key) => {
                                        return <Option key={key} value={key}>{cityConfig[key]}</Option>
                                    })
                                }
                            </Select>
                        )
                    }
                </Form.Item>
                <Form.Item label="用车模式">
                    {
                        getFieldDecorator('carMode', {
                            initialValue: '0'
                        })(
                            <Select style={{ width: 140 }}>
                                <Option value="0">全部</Option>
                                {
                                    Object.keys(carModeConfig).map((key) => {
                                        return <Option key={key} value={key}>{carModeConfig[key]}</Option>
                                    })
                                }
                            </Select>
                        )
                    }
                </Form.Item>
                <Form.Item label="营运模式">
                    {
                        getFieldDecorator('opMode', {
                            initialValue: '0'
                        })(
                            <Select style={{ width: 80 }}>
                                <Option value="0">全部</Option>
                                {
                                    Object.keys(opModeConfig).map((key) => {
                                        return <Option key={key} value={key}>{opModeConfig[key]}</Option>
                                    })
                                }
                            </Select>
                        )
                    }
                </Form.Item>
                <Form.Item label="加盟商授权状态">
                    {
                        getFieldDecorator('auth', {
                            initialValue: '0'
                        })(
                            <Select style={{ width: 80 }}>
                                <Option value="0">全部</Option>
                                {
                                    Object.keys(authConfig).map((key) => {
                                        return <Option key={key} value={key}>{authConfig[key]}</Option>
                                    })
                                }
                            </Select>
                        )
                    }
                </Form.Item>
            </Form>
        )
    }
}

const SearchForm = Form.create({ name: 'searchForm' })(HeaderForm);


//弹出框表单组件
class OpenForm extends React.Component {
    render() {
        const { getFieldDecorator } = this.props.form;
        const labelCol = { span: 5 },
            wrapperCol = { span: 19 };
        return (
            <Form layout="horizontal"
                labelCol={labelCol}
                wrapperCol={wrapperCol}
            >
                <Form.Item label="选择城市">
                    {
                        getFieldDecorator('city_id', {
                            initialValue: '0'
                        })(
                            <Select style={{ width: 80 }}>
                                <Option value="0">全部</Option>
                                {
                                    Object.keys(cityConfig).map((key) => {
                                        return <Option key={key} value={key}>{cityConfig[key]}</Option>
                                    })
                                }
                            </Select>
                        )
                    }
                </Form.Item>
                <Form.Item label="营运模式">
                    {
                        getFieldDecorator('op_mode', {
                            initialValue: '1'
                        })(
                            <Radio.Group>
                                {
                                    Object.keys(opModeConfig).map((key) => {
                                        return <Radio key={key} value={key}>{opModeConfig[key]}</Radio>
                                    })
                                }
                            </Radio.Group>
                        )
                    }
                </Form.Item>
                <Form.Item label="用车模式">
                    {
                        getFieldDecorator('use_mode', {
                            initialValue: '1'
                        })(
                            <Radio.Group>
                                {
                                    Object.keys(carModeConfig).map((key) => {
                                        return <Radio key={key} value={key}>{carModeConfig[key]}</Radio>
                                    })
                                }
                            </Radio.Group>
                        )
                    }
                </Form.Item>
            </Form>
        )
    }
}

const OpenCityForm = Form.create({ name: 'openForm' })(OpenForm);