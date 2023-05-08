import {Breadcrumb, Image, Input, Layout, Menu, Space} from "antd";
import {DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined} from "@ant-design/icons";
import React, {useState} from "react";

const { Search } = Input;
const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;
const LayoutApp = ({fetchCustomersLike,renderCustomers}) => {
    const [collapsed, setCollapsed] = useState(true);
    return (
        <>
            <Layout style={{minHeight: '100vh'}}>
                <Sider collapsible collapsed={collapsed}
                       onCollapse={setCollapsed}>
                    <div className="logo"  />
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1" icon={<PieChartOutlined/>}>
                            Option 1
                        </Menu.Item>
                        <Menu.Item key="2" icon={<DesktopOutlined/>}>
                            Option 2
                        </Menu.Item>
                        <SubMenu key="sub1" icon={<UserOutlined/>} title="User">
                            <Menu.Item key="3">Tom</Menu.Item>
                            <Menu.Item key="4">
                                bill
                            </Menu.Item>
                            <Menu.Item key="5">Alex</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" icon={<TeamOutlined/>} title="Team">
                            <Menu.Item key="6">Team 1</Menu.Item>
                            <Menu.Item key="8">Team 2</Menu.Item>
                        </SubMenu>
                        <Menu.Item key="9" icon={<FileOutlined/>}>
                            Files
                        </Menu.Item>
                    </Menu>
                </Sider>

                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{padding: 0}}/>
                    <Content style={{margin: '0 16px'}}>
                        <Breadcrumb style={{margin: '16px 0'}}>
                            <Breadcrumb.Item>
                                <Space direction="vertical">
                                    <Search
                                        placeholder="find customer by last name"
                                        allowClear
                                        enterButton="Search"
                                        size="large"
                                        onSearch={fetchCustomersLike}
                                    />
                                </Space>
                            </Breadcrumb.Item>
                        </Breadcrumb>
                        <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
                            {renderCustomers}
                        </div>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>
                        <Image
                            width={200}
                            src="https://user-images.githubusercontent.com/72573914/185918303-3010c9ac-7b12-4015-a016-f1231d777336.png"
                        />
                    </Footer>
                </Layout>
            </Layout></>
    )
}
export default LayoutApp;