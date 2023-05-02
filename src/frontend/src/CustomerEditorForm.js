import {Drawer, Input, Col, Select, Form, Row, Button, Spin} from 'antd';
import {LoadingOutlined} from '@ant-design/icons';
import {editCustomer} from './client.js';
import {useEffect, useState} from 'react';
import {successNotification, errorNotification} from './Notification.js';

const {Option} = Select;
const antIcon = <LoadingOutlined style={{fontSize: 24}} spin/>;


function CustomerEditorForm({showEditor, setShowEditor, fetchCustomers, customer}) {
    const onCLose = () => setShowEditor(false);
    const [submitting, setSubmitting] = useState(false);

    const onFinish = customerEdit => {
        setSubmitting(true)
        console.log(JSON.stringify(customer, null, 2))
        editCustomer(customerEdit)
            .then(() => {
                console.log("Customer Edited")
                onCLose();
                successNotification(
                    "Customer successfully edited",
                    `${customerEdit.firstName} was edited`
                )
                fetchCustomers();
            }).catch(err => {
            console.log(err);
            err.response.json().then(res => {
                console.log(res);
                errorNotification(
                    "There was an issue",
                    `${res.message} [${res.status}] [${res.error}]`,
                    "bottomLeft"
                )
            });
        }).finally(() => {
            setSubmitting(false);
        })
    };

    const onFinishFailed = errorInfo => {
        alert(JSON.stringify(errorInfo, null, 2));
    };

    return <Drawer
        title="Edit"
        destroyOnClose={true}
        width={720}
        onClose={onCLose}
        visible={showEditor}
        bodyStyle={{paddingBottom: 80}}
        footer={
            <div
                style={{
                    textAlign: 'right',
                }}
            >
                <Button onClick={onCLose} style={{marginRight: 8}}>
                    Cancel
                </Button>
            </div>
        }
    >
        <Form layout="vertical"
              onFinishFailed={onFinishFailed}
              onFinish={onFinish}
              initialValues={customer}
              hideRequiredMark>

            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="id"
                        label="Id"
                        rules={[{required: true}]}
                    >
                        <Input/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="lastName"
                        label="Last Name"
                        rules={[{required: true, message: 'Please edit customer last name'}]}
                        //setFieldValue={customer.lastName}

                    >
                        <Input/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="firstName"
                        label="First Name"
                        rules={[{required: true, message: 'Please edit customer first name'}]}
                    >
                        <Input placeholder="Please edit customer first name"/>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={20}>
                    <Form.Item
                        name="jmbg"
                        label="JMBG"
                        rules={[{required: true, message: "Please edit customer JMBG"}]}
                        //value="Something"
                        value="private"
                    >
                        <Input placeholder="Please edit customer JMBG"/>

                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={25}>
                    <Form.Item
                        name="address"
                        label="Address"
                        rules={[{required: true, message: 'Please edit customer address'}]}
                    >
                        <Input placeholder="Please edit customer address"/>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={8}>
                    <Form.Item
                        name="brLK"
                        label="ID Card No"
                        rules={[{required: true, message: 'Please edit ID card number'}]}
                    >
                        <Input placeholder="Please edit ID card number"/>
                    </Form.Item>
                </Col>
                <Col span={16}>
                    <Form.Item
                        name="pu"
                        label="ID Card Issued By"
                        rules={[{required: true, message: 'Please edit which police department issued the ID card'}]}
                    >
                        <Input placeholder="Please edit which police department issued the ID card"/>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[{required: false, message: 'Please edit customer email'}]}
                    >
                        <Input placeholder="Please edit customer email"/>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="phoneNumber"
                        label="Phone"
                        rules={[{required: false, message: 'Please edit customer phone'}]}
                    >
                        <Input placeholder="Please edit customer phone"/>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                {submitting && <Spin indicator={antIcon}/>}
            </Row>
        </Form>
    </Drawer>
}

export default CustomerEditorForm;