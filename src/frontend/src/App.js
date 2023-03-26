import logo from './logo.svg';
import {useState, useEffect} from 'react';
import {getAllCustomers, deleteCustomer, editCustomer,getCustomersLike} from "./client";
import {successNotification, errorNotification} from "./Notification";

import {
    Layout,
    Menu,
    Breadcrumb,
    Table,
    Spin,
    Empty,
    Button,Tag, Badge, Popconfirm, Radio, Image,AutoComplete, Input,Space
} from 'antd';

import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
    LoadingOutlined,
    PlusOutlined
} from '@ant-design/icons';
import CustomerDrawerForm from "./CustomerDrawerForm";
import CustomerEditorForm from "./CustomerEditorForm";
import './App.css';

const { Search } = Input;
const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;


const removeCustomer = (customerId, callback) => {
    deleteCustomer(customerId).then(() => {
        successNotification("Customer deleted", `Customer with ${customerId} was deleted`);
        callback();
    }).catch(err => {
        err.response.json().then(res => {
            console.log(res);
            errorNotification(
                "There was an issue",
                `${res.message} [${res.status}] [${res.error}]`
            )
        });
    })
};
const onSearch = (value) => {
    console.log(value);
    getCustomersLike(value);
  };


function App() {

    const[customers, setCustomers] = useState([]);
    const [fetching, setFetching] = useState(true);
    const [collapsed, setCollapsed] = useState(true);
    const [showDrawer, setShowDrawer] = useState(false);
    const [showEditor, setShowEditor] = useState(false);
    const[customer, setCustomer] = useState();

    const columns = fetchCustomers => [
    {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
        width: 50
    },
    {
        title: 'Last Name',
        dataIndex: 'lastName',
        key: 'lastName',
        width: 150
    },
    {
        title: 'Name',
        dataIndex: 'firstName',
        key: 'firstName',
        width: 150
    },
    {
        title: 'JMBG',
        dataIndex: 'jmbg',
        key: 'jmbg',
        width: 140
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
        width: 150
    },
    {
        title: 'ID No',
        dataIndex: 'brLK',
        key: 'brLK',
        width: 90
    },
    {
        title: 'Issued by PD',
        dataIndex: 'pu',
        key: 'pu',
        width: 120
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        width: 200
    },
    {
        title: 'Phone ',
        dataIndex: 'phoneNumber',
        key: 'phoneNumber',
        width: 120
    },
    {
        title: 'Actions ',
        dataIndex: 'actions',
        render: (text, customer) =>
            <Radio.Group>
                <Popconfirm
                    placement='topRight'
                    title={`Are you sure to delete customer ${customer.firstName}`}
                    onConfirm={() => { removeCustomer(customer.id, fetchCustomers)}}
                    okText='Yes'
                    cancelText='No'>
                    <Radio.Button value="small">Delete</Radio.Button>
                </Popconfirm>

                <Popconfirm
                    placement='topRight'
                    title={`Are you sure to edit customer ${customer.firstName}`}
                    onConfirm={() => {setShowEditor(!showEditor);
                    setCustomer(customer);} }
                    //add method to fetch customer
                    okText='Yes'
                    cancelText='No'>
                    <Radio.Button value="small">Edit</Radio.Button>
                </Popconfirm>

                    <Radio.Button value="small">New Contract</Radio.Button>
                    <Radio.Button value="small">Pay</Radio.Button>

            </Radio.Group>
         //width: 120
    }

];

    const fetchCustomers = () =>
        getAllCustomers().
            then(res => res.json())
                    .then(data => {
                        console.log(data);
                        setCustomers(data);
                        setFetching(false);
                    }).catch(err => {
                               err.response.json().then(res => {
                               errorNotification( "There was an issue", `${res.message} [${res.status}] [${res.error}]`)
                             });
                         }).finally(() => setFetching(false));

    const fetchCustomersLike = (value) =>
        getCustomersLike(value).
            then(res => res.json())
                    .then(data => {
                        console.log(data);
                        setCustomers(data);
                        setFetching(false);
                    }).catch(err => {
                               err.response.json().then(res => {
                               errorNotification( "There was an issue", `${res.message} [${res.status}] [${res.error}]`)
                             });
                         }).finally(() => setFetching(false));

    useEffect( () => {
        console.log("component is mounted");
        fetchCustomers();
           }, []);

    const renderCustomers = () => {
         if (fetching) {
                    return <Spin />
                }
        if(customers.length <= 0){
        return <>
                 <CustomerDrawerForm
                      showDrawer={showDrawer}
                      setShowDrawer={setShowDrawer}
                      fetchCustomers={fetchCustomers}
                 />

                <Button
                     onClick={() => setShowDrawer(!showDrawer)}
                     type="primary" shape="round" icon={<PlusOutlined/>} size="small">
                     Add New Customer
                </Button>
                <Empty/>
                 </>
                }
        return <>
                        <CustomerDrawerForm
                            showDrawer={showDrawer}
                            setShowDrawer={setShowDrawer}
                            fetchCustomers={fetchCustomers}
                        />
                      <CustomerEditorForm
                               showEditor={showEditor}
                               setShowEditor={setShowEditor}
                               fetchCustomers={fetchCustomers}
                               customer={customer}
                    />
                <Table
                               dataSource={customers}
                               columns={columns(fetchCustomers)}
                               bordered
                               title={() =>
                               <>
                                     <Tag>Number of customers</Tag>
                                     <Badge count={customers.length} className="site-badge-count-4"/>
                                      <br/> <br/>
                                    <Button
                                        onClick={() => setShowDrawer(!showDrawer)}
                                        type="primary" shape="round" icon={<PlusOutlined/>} size="small">
                                        Add New Customer
                                    </Button>
                               </>
                               }
                               pagination={{pageSize: 10}}
                               scroll={{y: 600}}
                               rowKey={customer => customer.id}
                           />
                           </>
    }

       return <Layout style={{minHeight: '100vh'}}>
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
                                  placeholder="input search text"
                                  allowClear
                                  enterButton="Search"
                                  size="large"
                                 onSearch={fetchCustomersLike}
                                />
                          </Space>
                       </Breadcrumb.Item>
                   </Breadcrumb>
                   <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
                        {renderCustomers()}
                   </div>
               </Content>
               <Footer style={{textAlign: 'center'}}>
                   <Image
                    width={200}
                    src="https://user-images.githubusercontent.com/72573914/185918303-3010c9ac-7b12-4015-a016-f1231d777336.png"
                    />
               </Footer>
           </Layout>
       </Layout>
}

export default App;
