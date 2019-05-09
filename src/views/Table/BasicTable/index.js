import React from 'react'
import { Card, Table, Modal } from 'antd'
import "./index.less"
import axios from '../../../axios/axios'

export default class BasicTable extends React.Component {

    constructor(props) {
        super(props)
        this.params = {
            page: 1,
            pageSize: 10
        }
        this.state = {
            dataSource2: []
        }
    }

    componentDidMount() {
        const data = [
            {
                id: '1',
                userName: 'jack',
                sex: '1',
                status: '1',
                interest: '2',
                isMarry: '0',
                birthday: '2000-01-01',
                address: '北京市海淀区奥林匹克公园',
                time: '09:00:00'
            }, {
                id: '2',
                userName: 'peter',
                sex: '0',
                status: '3',
                interest: '5',
                isMarry: '1',
                birthday: '2000-01-01',
                address: '北京市海淀区奥林匹克公园',
                time: '09:00:00'
            }, {
                id: '3',
                userName: 'wendy',
                sex: '1',
                status: '2',
                interest: '4',
                isMarry: '1',
                birthday: '2000-01-01',
                address: '北京市海淀区奥林匹克公园',
                time: '09:00:00'
            }, {
                id: '4',
                userName: 'rose',
                sex: '0',
                status: '2',
                interest: '5',
                isMarry: '0',
                birthday: '2000-01-01',
                address: '北京市海淀区奥林匹克公园',
                time: '09:00:00'
            }, {
                id: '5',
                userName: 'jeckson',
                sex: '0',
                status: '4',
                interest: '1',
                isMarry: '1',
                birthday: '2000-01-01',
                address: '北京市海淀区奥林匹克公园',
                time: '09:00:00'
            }
        ]
        data.map((item, index) => {
            item.key = index
        })

        this.setState({
            dataSource: data
        })

        this.request()
    }

    request = () => {
        axios.ajax({
            url: '/table/list',
            data: {
                params: this.params,
                isShowLoading: false
            }
        }).then((res) => {
            if (res.code === 0) {
                res.result.map((item, index) => {
                    item.key = index
                })
                this.setState({
                    dataSource2: res.result
                })
            }
        })
    }

    onRowClick = (record, index) => {
        let selectKey = [index]
        Modal.info({
            title: '信息',
            content: `用户名：${record.userName}，用户爱好：${record.interest}`
        })
        this.setState({
            selectedRowKeys: selectKey,
            selectedItem: record
        })
    }


    render() {
        const columns = [
            {
                title: 'id',
                dataIndex: 'id'
            },
            {
                title: '用户名',
                dataIndex: 'userName'
            },
            {
                title: '性别',
                dataIndex: 'sex',
                render(sex) {
                    return sex === 1 ? '男' : '女'
                }
            },
            {
                title: '状态',
                dataIndex: 'status',
                render(status) {
                    let config = {
                        '1': '咸鱼一条',
                        '2': '风华浪子',
                        '3': '北大才子',
                        '4': '百度FE',
                        '5': '创业者',
                    }
                    return config[status]
                }
            },
            {
                title: '爱好',
                dataIndex: 'interest',
                render(abc) {
                    let config = {
                        '1': '游泳',
                        '2': '长跑',
                        '3': '篮球',
                        '4': '足球',
                        '5': '爬山',
                    }
                    return config[abc]
                }
            },
            {
                title: '是否已婚',
                dataIndex: 'isMarry',
                render(isMarry) {
                    return isMarry === 0 ? '已婚' : '未婚'
                }
            },
            {
                title: '生日',
                dataIndex: 'birthday'
            },
            {
                title: '联系地址',
                dataIndex: 'address'
            },
            {
                title: '早起时间',
                dataIndex: 'time'
            },
        ]

        let rowSelection = {
            type: "radio",
            selectedRowKeys: this.state.selectedRowKeys
        }

        return (
            <div className="table-basic-warp">
                <Card title="基础表格" className="card">
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource}
                        pagination={false}
                    />
                </Card>
                <Card title="动态数据渲染表格-Mock" className="card">
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={false}
                    />
                </Card>
                <Card title="Mock-单选" className="card">
                    <Table
                        bordered
                        onRow={(record, index) => {
                            return {
                                onClick: () => {
                                    this.onRowClick(record, index)
                                }   // 点击行
                            }
                        }}
                        rowSelection={rowSelection}
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={false}
                    />
                </Card>
            </div>
        )
    }
}