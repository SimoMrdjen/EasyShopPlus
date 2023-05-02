import logo from './logo.svg';
import React, {useState, useEffect} from 'react';
import {getAllCustomers, deleteCustomer, editCustomer, getCustomersLike} from "./client";
import {successNotification, errorNotification} from "./Notification";
import {Table, Spin, Empty, Button, Tag, Badge, Popconfirm, Radio} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import CustomerDrawerForm from "./CustomerDrawerForm";
import CustomerEditorForm from "./CustomerEditorForm";
import './App.css';
import LayoutApp from "./components/LayoutApp";
import ContractForm from "./ContractForm";
import ContractForPrint from "./components/ContractForPrint";

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

    const [customer, setCustomer] = useState();
    const [customers, setCustomers] = useState([]);
    const [fetching, setFetching] = useState(true);
    const [showDrawer, setShowDrawer] = useState(false);
    const [showEditor, setShowEditor] = useState(false);
    const [showContractForm, setShowContractForm] = useState(false);
    const [showPrint, setShowPrint] = useState(false);
    const [resContract, setResContract] = useState();
    const [customerDto, setCustomerDto] = useState();
    const columnsCustomers = //fetchCustomers =>
        [
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
                            onConfirm={() => {
                                removeCustomer(customer.id, fetchCustomers)
                            }}
                            okText='Yes'
                            cancelText='No'>
                            <Radio.Button value="small">Delete</Radio.Button>
                        </Popconfirm>

                        <Popconfirm
                            placement='topRight'
                            title={`Are you sure to edit customer ${customer.firstName}`}
                            onConfirm={() => {
                                setShowEditor(!showEditor);
                                setCustomer(customer);
                            }}
                            //add method to fetch customer
                            okText='Yes'
                            cancelText='No'>
                            <Radio.Button value="small">Edit</Radio.Button>
                        </Popconfirm>
                        <Popconfirm
                            placement='topRight'
                            title={`Do You want to create new contract for ${customer.firstName} ${customer.lastName}`}
                            onConfirm={() => {
                                setShowContractForm(!showContractForm);
                                setCustomer(customer);
                            }}
                            //add method to fetch customer
                            okText='Yes'
                            cancelText='No'>
                            <Radio.Button value="small">New Contract</Radio.Button>
                        </Popconfirm>

                        <Radio.Button value="small">Pay</Radio.Button>

                    </Radio.Group>
                //width: 120
            }
        ];

    const fetchCustomers = () =>
        getAllCustomers().then(res => res.json())
            .then(data => {
                console.log(data);
                setCustomers(data);
                setFetching(false);
            }).catch(err => {
            err.response.json().then(res => {
                errorNotification("There was an issue", `${res.message} [${res.status}] [${res.error}]`)
            });
        }).finally(() => setFetching(false));

    const fetchCustomersLike = (value) =>
        getCustomersLike(value).then(res => res.json())
            .then(data => {
                console.log(data);
                setCustomers(data);
                setFetching(false);
            }).catch(err => {
            err.response.json().then(res => {
                errorNotification("There was an issue", `${res.message} [${res.status}] [${res.error}]`)
            });
        }).finally(() => setFetching(false));


    useEffect(() => {
        console.log("component is mounted");
        fetchCustomers();

    }, []);

    const renderCustomers = () => {
        if (fetching) {
            return <Spin/>
        }
        if (customers.length <= 0) {
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
            <ContractForm
                showContractForm={showContractForm}
                setShowContractForm={setShowContractForm}
                fetchCustomers={fetchCustomers}
                customer={customer}
                setShowPrint={setShowPrint}
                fetchContractFromResponse={setResContract}
                resContract={resContract}
                setCustomer={setCustomer}
                setCustomerDto={setCustomerDto}
            />
            <ContractForPrint
                showPrint={showPrint}
                // setShowContractForPrint={setShowContractForPrint}
                resContract={resContract}
                setShowPrint={setShowPrint}

            />


            <Table
                dataSource={customers}
                columns={columnsCustomers}//fetchCustomers)}
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
    return <LayoutApp fetchCustomersLike={fetchCustomersLike}
                      renderCustomers={renderCustomers()}/>
}

export default App;
