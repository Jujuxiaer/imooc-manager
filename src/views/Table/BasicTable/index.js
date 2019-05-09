import React from 'react'
import { Card, Table } from 'antd'
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
                interest: '6',
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
                this.setState({
                    dataSource2: res.result
                })
            }
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
                dataIndex: 'sex'
            },
            {
                title: '状态',
                dataIndex: 'status'
            },
            {
                title: '爱好',
                dataIndex: 'interest'
            },
            {
                title: '状态',
                dataIndex: 'interest'
            },
            {
                title: '是否已婚',
                dataIndex: 'isMarry'
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
                <Card title="动态数据渲染表格" className="card">
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={false}
                    />
                </Card>
            </div>
        )
    }
}