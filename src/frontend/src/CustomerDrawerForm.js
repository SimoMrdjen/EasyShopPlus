import {Drawer, Input, Col, Select, Form, Row, Button, Spin} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import {addNewCustomer} from './client.js';
import {useState} from 'react';
import {successNotification, errorNotification} from './Notification.js';

const {Option} = Select;
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;


function CustomerDrawerForm({showDrawer, setShowDrawer, fetchCustomers}) {
    const onCLose = () => setShowDrawer(false);
    const [submitting, setSubmitting] = useState(false);

    const onFinish = customer => {
        setSubmitting(true)
        console.log(JSON.stringify(customer, null, 2))
        addNewCustomer(customer)
        .then( () => {
                console.log("Customer added");
                 onCLose();
                 successNotification("Customer successfully added", `${customer.firstName} was added`);
                 fetchCustomers();
            }).catch(err => {
                               console.log(err)
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
                               setSubmitting(false); })
           };

    const onFinishFailed = errorInfo => {
        alert(JSON.stringify(errorInfo, null, 2));
    };

    return <Drawer
        title="Create new customer"
        width={720}
        onClose={onCLose}
        destroyOnClose={true}
        visible={showDrawer}
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
              hideRequiredMark>

            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="lastName"
                        label="Last Name"
                        rules={[{required: true, message: 'Please enter customer last name'}]}
                    >
                        <Input placeholder="Please enter customer last name"/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="firstName"
                        label="First Name"
                        rules={[{required: true, message: 'Please enter customer first name'}]}
                    >
                        <Input placeholder="Please enter customer first name"/>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={20}>
                    <Form.Item
                        name="jmbg"
                        label="JMBG"
                        rules={[{required: true, message: 'Please enter customer JMBG'}]}
                    >
                         <Input placeholder="Please enter customer JMBG"/>

                    </Form.Item>
                </Col>
               </Row>

            <Row gutter={16}>
                <Col span={25}>
                    <Form.Item
                            name="address"
                            label="Address"
                            rules={[{required: true, message: 'Please enter customer address'}]}
                        >
                      <Input placeholder="Please enter customer address"/>
                    </Form.Item>
                 </Col>
            </Row>

            <Row gutter={16}>
                <Col span={8}>
                    <Form.Item
                            name="brLK"
                            label="ID Card No"
                            rules={[{required: true, message: 'Please enter ID card number'}]}
                        >
                      <Input placeholder="Please enter ID card number"/>
                    </Form.Item>
                 </Col>
                <Col span={16}>
                    <Form.Item
                            name="pu"
                            label="ID Card Issued By"
                            rules={[{required: true, message: 'Please enter which police department issued the ID card'}]}
                        >
                      <Input placeholder="Please enter which police department issued the ID card"/>
                    </Form.Item>
                 </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                            name="email"
                            label="Email"
                            rules={[{required: false, message: 'Please enter customer email'}]}
                        >
                      <Input placeholder="Please enter customer email"/>
                    </Form.Item>
                 </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                            name="phoneNumber"
                            label="Phone"
                            rules={[{required: false, message: 'Please enter customer phone'}]}
                        >
                      <Input placeholder="Please enter customer phone"/>
                    </Form.Item>
                 </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Form.Item >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                {submitting && <Spin indicator={antIcon} />}
            </Row>
        </Form>
    </Drawer>
}

export default CustomerDrawerForm;