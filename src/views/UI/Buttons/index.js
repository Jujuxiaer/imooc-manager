import React from 'react';
import "./index.less";
import { Card, Button, Radio } from 'antd';

export default class Buttons extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            size: 'default'
        }
    }

    handCloseLoading = () => {
        this.setState({
            loading: false
        });
    }

    handleChange = (e) => {
        this.setState({
            size: e.target.value
        });
    }

    render() {
        return (
            <div className="button-warp">
                <Card title="基础按钮" className="card">
                    <Button type="primary">Imooc</Button>
                    <Button>Imooc</Button>
                    <Button type="dashed">Imooc</Button>
                    <Button type="danger">Imooc</Button>
                    <Button disabled>Imooc</Button>
                </Card>

                <Card title="图形按钮" className="card">
                    <Button icon="plus">创建</Button>
                    <Button icon="edit">编辑</Button>
                    <Button icon="delete">删除</Button>
                    <Button shape="circle" icon="search"></Button>
                    <Button type="primary" icon="search">搜索</Button>
                    <Button type="primary" icon="download">下载</Button>
                </Card>

                <Card title="Loading按钮" className="card">
                    <Button type="primary" loading={this.state.loading}>确定</Button>
                    <Button type="primary" shape="circle" loading={this.state.loading}></Button>
                    <Button loading={this.state.loading}>点击加载</Button>
                    <Button shape="circle" loading={this.state.loading}></Button>
                    <Button type="primary" onClick={this.handCloseLoading}>关闭</Button>
                </Card>

                <Card title="按钮组" className="card">
                    <Button.Group className="button-group">
                        <Button type="primary" icon="left">返回</Button>
                        <Button type="primary" icon="right">前进</Button>
                    </Button.Group>
                </Card>

                <Card title="基础按钮" className="card">
                    <Radio.Group value={this.state.size} onChange={this.handleChange}>
                        <Radio value="small">小</Radio>
                        <Radio value="default">中</Radio>
                        <Radio value="large">大</Radio>
                    </Radio.Group>
                    <Button type="primary" size={this.state.size}>Imooc</Button>
                    <Button size={this.state.size}>Imooc</Button>
                    <Button type="dashed" size={this.state.size}>Imooc</Button>
                    <Button type="danger" size={this.state.size}>Imooc</Button>
                </Card>
            </div>
        )
    }
}