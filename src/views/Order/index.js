import React from 'react';
import { Card, Form, Button, Message, Table,Row, Col, Modal,DatePicker,Select } from "antd";
import moment from 'moment';
import Utils from '../../utils/utils';
import axios from '../../axios/axios';
import "./index.less";

const { Option } = Select;

export default class Order extends React.Component {
    constructor(props) {
        super(props)
        this.params = {
            page: 1,
            pageSize: 10
        }
        this.state = {
            dataSource:[]
        }
    }

    componentDidMount(){
        this.requestList()
    }

    requestList=()=>{
        axios.ajax({
            url:'/order/list',
            params:this.params
        }).then((res)=>{
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
                        this.requestList()
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
        const columns=[
            {
                title:'订单编号',
                dataIndex:'order_sn'
            },
            {
                title:'车辆编号',
                dataIndex:'bike_sn'
            },
            {
                title:'用户名',
                dataIndex:'user_name'
            },
            {
                title:'手机号',
                dataIndex:'mobile'
            },
            {
                title:'里程',
                dataIndex:'distance'
            },
            {
                title:'行驶时长',
                dataIndex:'total_time'
            },
            {
                title:'状态',
                dataIndex:'status'
            },
            {
                title:'开始时间',
                dataIndex:'start_time'
            },
            {
                title:'结束时间',
                dataIndex:'end_time'
            },
            {
                title:'订单金额',
                dataIndex:'order_sn'
            },
            {
                title:'实付金额',
                dataIndex:'user_pay'
            }
        ]
        return (
            <div className="order-warp">
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
                    <Button>订单详情</Button>
                    <Button>结束订单</Button>
                </Card>
                <div className="content-warp">
                    <Table
                     columns={columns}
                     dataSource={this.state.dataSource}
                     bordered
                     pagination={this.state.pagination}
                    />
                </div>
            </div>
        )
    }
}


//头部的搜索表单组件
class HeaderForm extends React.Component {
    render() {
        const { getFieldDecorator } = this.props.form;
        const dateFormat ="YYYY-MM-DD HH:mm:ss"
        return (
            <Form layout="inline">
                <Form.Item label="城市">
                    {
                        getFieldDecorator('city', {
                            initialValue: '0'
                        })(
                            <Select 
                            style={{ width: 80 }}
                            placeholder="全部"
                            >
                                <Option value="0">全部</Option>
                                <Option value="1">北京</Option>
                                <Option value="2">上海</Option>
                                <Option value="3">天津</Option>
                                <Option value="4">杭州</Option>
                            </Select>
                        )
                    }
                </Form.Item>
                <Form.Item label="订单时间">
                    {
                        getFieldDecorator('start_time')(
                            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" placeholder="请选择开始时间" />
                        )
                    }
                </Form.Item>
                <Form.Item>
                    {
                        getFieldDecorator('end_time')(
                            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" placeholder="请选择结束时间" />
                        )
                    }
                </Form.Item>
                <Form.Item label="订单状态">
                    {
                        getFieldDecorator('op_ode', {
                            initialValue: '0'
                        })(
                            <Select 
                                style={{ width: 80 }}
                                placeholder="全部"
                            >
                                <Option value="0">全部</Option>
                                <Option value="1">进行中</Option>
                                <Option value="2">进行中(临时锁车)</Option>
                                <Option value="3">结束行程</Option>
                            </Select>
                        )
                    }
                </Form.Item>
            </Form>
        )
    }
}

const SearchForm = Form.create({ name: 'searchForm' })(HeaderForm);