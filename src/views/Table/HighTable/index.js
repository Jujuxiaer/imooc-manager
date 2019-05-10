import React from 'react'
import { Card, Table, Modal, Message, Button, Badge } from 'antd'
import "./index.less"
import axios from '../../../axios/axios'
import { sexConfig, statusConfig, interestConfig, isMarryConfig } from '../../../config/fieldRenderConfig';

export default class HighTable extends React.Component {

    constructor(props) {
        super(props)
        this.params = {
            page: 1,
            pageSize: 10
        }
        this.state = {
            dataSource1: [],
            dataSource2: []
        }
    }

    componentDidMount() {
        this.getFixedHeadertList();
        this.getFixedColumntList();
    }

    getFixedHeadertList() {
        axios.ajax({
            url: '/table/high/getFixedHeadertList',
            params: this.params
        }).then((res) => {
            if (res.code === "0") {
                res.result.list.map((item, index) => {
                    item.key = index
                })
                this.setState({
                    dataSource1: res.result.list
                })
            }
        })
    }

    getFixedColumntList() {
        axios.ajax({
            url: '/table/high/getFixedColumntList',
            params: this.params
        }).then(res => {
            if (res.code === "0") {
                res.result.list.map((item, index) => {
                    item.key = index
                })
                this.setState({
                    dataSource2: res.result.list
                })
            }
        })
    }

    handleChange = (pagination, filters, sorter) => {
        this.setState({
            order: sorter.order
        })
    }


    handleDelete = (row) => {
        Modal.confirm({
            title: '确认删除',
            content: `确认删除用户${row.userName}吗?`,
            onOk: () => {
                Message.success('删除成功！');
                this.getFixedHeadertList();
            }
        })
    }


    render() {
        const columns1 = [
            {
                title: 'ID',
                dataIndex: 'id',
                align: 'center',
                width: 120
            }, {
                title: '用户名',
                dataIndex: 'userName',
                align: 'center',
                width: 150
            }, {
                title: '性别',
                dataIndex: 'sex',
                align: 'center',
                render: (sex) => {
                    return sexConfig[sex];
                },
                width: 150
            }, {
                title: '年龄',
                dataIndex: 'age',
                align: 'center',
                width: 120
            }, {
                title: '状态',
                dataIndex: 'status',
                align: 'center',
                render: (status) => {
                    return statusConfig[status];
                },
                width: 150
            }, {
                title: '爱好',
                dataIndex: 'interest',
                align: 'center',
                render: (interest) => {
                    return interestConfig[interest];
                },
                width: 150
            }, {
                title: '是否已婚',
                dataIndex: 'isMarry',
                align: 'center',
                render: (isMarry) => {
                    return isMarryConfig[isMarry];
                },
                width: 150
            }, {
                title: '生日',
                dataIndex: 'birthday',
                align: 'center',
                width: 180
            }, {
                title: '联系地址',
                dataIndex: 'address',
                align: 'center',
                width: 220
            }, {
                title: '早起时间',
                dataIndex: 'time',
                align: 'center',
                width: 180
            }]

        const columns2 = [
            {
                title: 'ID',
                dataIndex: 'id',
                align: 'center',
                fixed: 'left',
                width: 120
            }, {
                title: '用户名',
                dataIndex: 'userName',
                align: 'center',
                fixed: 'left',
                width: 150
            }, {
                title: '性别',
                dataIndex: 'sex',
                align: 'center',
                render: (sex) => {
                    return sexConfig[sex];
                },
                width: 150
            }, {
                title: '状态',
                dataIndex: 'status',
                align: 'center',
                render: (status) => {
                    return statusConfig[status];
                },
                width: 150
            }, {
                title: '爱好',
                dataIndex: 'interest',
                align: 'center',
                render: (interest) => {
                    return interestConfig[interest];
                },
                width: 150
            }, {
                title: '是否已婚',
                dataIndex: 'isMarry',
                align: 'center',
                render: (isMarry) => {
                    return isMarryConfig[isMarry];
                },
                width: 150
            }, {
                title: '生日',
                dataIndex: 'birthday',
                align: 'center',
                width: 180
            }, {
                title: '生日',
                dataIndex: 'birthday',
                align: 'center',
                width: 180
            }, {
                title: '生日',
                dataIndex: 'birthday',
                align: 'center',
                width: 180
            }, {
                title: '生日',
                dataIndex: 'birthday',
                align: 'center',
                width: 180
            }, {
                title: '联系地址',
                dataIndex: 'address',
                align: 'center',
                width: 220
            }, {
                title: '早起时间',
                dataIndex: 'time',
                align: 'center',
                fixed: 'right',
                width: 180
            }]

        const columns3 = [
            {
                title: 'ID',
                dataIndex: 'id',
                align: 'center',
            }, {
                title: '用户名',
                dataIndex: 'userName',
                align: 'center',
            }, {
                title: '性别',
                dataIndex: 'sex',
                align: 'center',
                render: (sex) => {
                    return sexConfig[sex];
                },
            }, {
                title: '年龄',
                dataIndex: 'age',
                align: 'center',
                sorter: (a, b) => a.age - b.age,
                sortOrder: this.state.order
            }, {
                title: '状态',
                dataIndex: 'status',
                align: 'center',
                render: (status) => {
                    return statusConfig[status];
                },
            }, {
                title: '爱好',
                dataIndex: 'interest',
                align: 'center',
                render: (interest) => {
                    return interestConfig[interest];
                },
            }, {
                title: '是否已婚',
                dataIndex: 'isMarry',
                align: 'center',
                render: (isMarry) => {
                    return isMarryConfig[isMarry];
                },
            }, {
                title: '生日',
                dataIndex: 'birthday',
                align: 'center',
            }, {
                title: '联系地址',
                dataIndex: 'address',
                align: 'center',
            }, {
                title: '早起时间',
                dataIndex: 'time',
                align: 'center',
            }]

        const columns4 = [{
            title: 'ID',
            dataIndex: 'id',
            align: 'center',
            width: 120
        }, {
            title: '用户名',
            dataIndex: 'userName',
            align: 'center',
            width: 150
        }, {
            title: '性别',
            dataIndex: 'sex',
            align: 'center',
            render: (sex) => {
                return sexConfig[sex];
            },
            width: 150
        }, {
            title: '年龄',
            dataIndex: 'age',
            align: 'center',
            width: 120
        }, {
            title: '状态',
            dataIndex: 'status',
            align: 'center',
            render: (status) => {
                return statusConfig[status];
            },
            width: 150
        }, {
            title: '爱好',
            dataIndex: 'interest',
            render: (interest) => {
                let config = {
                    '1': <Badge status="success" text="Success" />,
                    '2': <Badge status="error" text="Error" />,
                    '3': <Badge status="default" text="Default" />,
                    '4': <Badge status="processing" text="Processing" />,
                    '5': <Badge status="warning" text="Warning" />
                }
                return config[interest];
            },
            width: 150
        }, {
            title: '是否已婚',
            dataIndex: 'isMarry',
            align: 'center',
            render: (isMarry) => {
                return isMarryConfig[isMarry];
            },
            width: 150
        }, {
            title: '生日',
            dataIndex: 'birthday',
            align: 'center',
            width: 180
        }, {
            title: '联系地址',
            dataIndex: 'address',
            align: 'center',
            width: 220
        }, {
            title: '早起时间',
            dataIndex: 'time',
            align: 'center',
            width: 180
        }, {
            title: '操作',
            align: 'center',
            width: 180,
            render: (text, row) => {
                return <Button type="danger" size="small" onClick={(row) => { this.handleDelete(row) }} icon="delete">删除</Button>
            }
        }]


        return (
            <div className="table-basic-warp">
                <Card title="头部固定" className="card">
                    <Table
                        bordered
                        columns={columns1}
                        dataSource={this.state.dataSource1}
                        pagination={false}
                        scroll={{ y: 240 }}
                    />
                </Card>
                <Card title="左侧固定" className="card">
                    <Table
                        bordered
                        columns={columns2}
                        dataSource={this.state.dataSource2}
                        pagination={false}
                        scroll={{ x: 2000 }}
                    />
                </Card>
                <Card title="表格排序" className="card">
                    <Table
                        bordered
                        onRow={this.onRow}
                        columns={columns3}
                        dataSource={this.state.dataSource1}
                        pagination={false}
                        onChange={this.handleChange}
                    />
                </Card>
                <Card title="操作按钮" className="card">
                    <Table
                        columns={columns4}
                        dataSource={this.state.dataSource1}
                        bordered
                        rowKey="id"
                        pagination={false}
                    ></Table>
                </Card>
            </div>
        )
    }
}