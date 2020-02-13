import React from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import Pengeluaran from '../Pengeluaran';
import User from '../User';
import Transaksi from '../Transaksi';
import PengeluaranList from '../PengeluaranList';
import TransaksiList from '../TransaksiList';
import Statistik from '../Statistik';
  
const { SubMenu } = Menu;
const { Header, Content, Sider, Footer } = Layout;

class App extends React.Component {
    navigateTo = (route) => {
        this.props.history.push(route);
    }

    render(){
        return (
            <Layout style={{minHeight: '100vh'}}>
                <Header className="header">
                    <h2 style={{color:'white'}}>Pengeluaranku</h2>
                </Header>
                <Layout>
                    <Sider width={200} style={{ background: '#fff' }}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{ height: '100%', borderRight: 0 }}
                        >
                            <SubMenu
                                key="sub1"
                                title={
                                    <span>
                                        <Icon type="fund" />
                                        Transaksi
                                    </span>
                                }
                            >
                                <Menu.Item onClick={()=>this.navigateTo('/app/pengeluaran_list')} key="1">Pengeluaran</Menu.Item>
                                <Menu.Item onClick={()=>this.navigateTo('/app/transaksi_list')} key="2">Transaksi</Menu.Item>
                                <Menu.Item onClick={()=>this.navigateTo('/app/statistik')} key="3">Statistik</Menu.Item>
                            </SubMenu>
                            <SubMenu
                                key="sub2"
                                title={
                                    <span>
                                        <Icon type="user" />
                                        User Management
                                    </span>
                                }
                            >
                                <Menu.Item onClick={()=>this.navigateTo('/app/user')} key="5">User</Menu.Item>
                            </SubMenu>
                            <Menu.Item onClick={()=>this.navigateTo('/login')} key="6">Logout</Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>App</Breadcrumb.Item>
                        </Breadcrumb>
                        <Content
                            style={{
                                background: '#fff',
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                            }}
                        >
                            <Switch>
                                <Route exact path="/app" component={Pengeluaran}/>
                                <Route exact path="/app/transaksi" component={Transaksi}/>
                                <Route exact path="/app/user" component={User}/>
                                <Route exact path="/app/pengeluaran" component={Pengeluaran}/>
                                <Route exact path="/app/pengeluaran_list" component={PengeluaranList}/>
                                <Route exact path="/app/transaksi_list" component={TransaksiList}/>
                                <Route exact path="/app/statistik" component={Statistik}/>
                            </Switch>
                        </Content>
                        <Footer style={{textAlign : 'center'}}>Copyright EMI Bootcamp @2019</Footer>
                    </Layout>
                </Layout>
            </Layout>            
        )
    }
}

export default App;