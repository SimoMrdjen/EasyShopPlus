import {Drawer, Input, Col, Select, Form, Row, Button, Spin, DatePicker, Space} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import {createContract} from './client.js';
import {useEffect, useState} from 'react';
import {successNotification, errorNotification} from './Notification.js';

const {Option} = Select;
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;


function ContractForm({showContractForm, setShowContractForm,customerDto,fetchCustomers}) {
    const onCLose = () => setShowContractForm(false);
    const [submitting, setSubmitting] = useState(false);
    // const [customerDto, setCustomerDto] = useState(customerDto);
    const purchaseContract ={
        customerDto: {
            id: customerDto.id

        },
        contractAmount: 1000,
        participation: 500.0,
        contractDate: "2023-04-28"
    };



    const onFinish = () => {
        setSubmitting(true);
        console.log(JSON.stringify(purchaseContract, null, 2))
        createContract(purchaseContract)
            .then(() => {
                console.log("Contract created")
                onCLose();
                successNotification(
                    "Contract successfully created",
                    ` New contract for ${customerDto.firstName} ${customerDto.firstName} was created`
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
        title= "New Contract"
        destroyOnClose={true}
        width={720}
        onClose={onCLose}
        visible={showContractForm}
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
              //initialValues={customerDto}
              hideRequiredMark>

            <Row gutter={10}>
                {/*<Col span={3}>*/}
                {/*    <Form.Item*/}
                {/*        name="id"*/}
                {/*        label="Id"*/}
                {/*        rules={[{required: true}]}*/}
                {/*    >*/}
                {/*        <Input  />*/}
                {/*    </Form.Item>*/}
                {/*</Col>*/}
                {/*<Col span={10}>*/}
                {/*    <Form.Item*/}
                {/*        name="lastName"*/}
                {/*        label="Last Name"*/}
                {/*        rules={[{required: true, message: 'Please edit customer last name'}]}*/}
                {/*        //setFieldValue={customer.lastName}*/}

                {/*    >*/}
                {/*        <Input   />*/}
                {/*    </Form.Item>*/}
                {/*</Col>*/}
                {/*<Col span={10}>*/}
                {/*    <Form.Item*/}
                {/*        name="firstName"*/}
                {/*        label="First Name"*/}
                {/*        rules={[{required: true, message: 'Please edit customer first name'}]}*/}
                {/*    >*/}
                {/*        <Input placeholder="Please edit customer first name"/>*/}
                {/*    </Form.Item>*/}
                {/*</Col>*/}
            </Row>

            <Row gutter={10}>

                {/*<Col span={22}>*/}
                {/*    <Form.Item*/}
                {/*        name="address"*/}
                {/*        label="Address"*/}
                {/*        rules={[{required: true, message: 'Please edit customer address'}]}*/}
                {/*    >*/}
                {/*        <Input placeholder="Please edit customer address"/>*/}
                {/*    </Form.Item>*/}
                {/*</Col>*/}
            </Row>


            <Row gutter={10}>
                {/*<Col span={5}>*/}
                {/*    <Form.Item*/}
                {/*        name="jmbg"*/}
                {/*        label="JMBG"*/}
                {/*        rules={[{required: true  ,message:"Please edit customer JMBG"}]}*/}
                {/*        value="private"*/}
                {/*    >*/}
                {/*        <Input placeholder="Please edit customer JMBG"/>*/}

                {/*    </Form.Item>*/}
                {/*</Col>*/}
                {/*<Col span={6}>*/}
                {/*    <Form.Item*/}
                {/*        name="brLK"*/}
                {/*        label="ID Card No"*/}
                {/*        rules={[{required: true, message: 'Please edit ID card number'}]}*/}
                {/*    >*/}
                {/*        <Input placeholder="Please edit ID card number"/>*/}
                {/*    </Form.Item>*/}
                {/*</Col>*/}
                {/*<Col span={10}>*/}
                {/*    <Form.Item*/}
                {/*        name="pu"*/}
                {/*        label="ID Card Issued By"*/}
                {/*        rules={[{required: true, message: 'Please edit which police department issued the ID card'}]}*/}
                {/*    >*/}
                {/*        <Input placeholder="Please edit which police department issued the ID card"/>*/}
                {/*    </Form.Item>*/}
                {/*</Col>*/}
            </Row>

            <Row gutter={10}>
                {/*<Col span={12}>*/}
                {/*    <Form.Item*/}
                {/*        name="email"*/}
                {/*        label="Email"*/}
                {/*        rules={[{required: false, message: 'Please edit customer email'}]}*/}
                {/*    >*/}
                {/*        <Input placeholder="Please edit customer email"/>*/}
                {/*    </Form.Item>*/}
                {/*</Col>*/}
                {/*<Col span={10}>*/}
                {/*    <Form.Item*/}
                {/*        name="phoneNumber"*/}
                {/*        label="Phone"*/}
                {/*        rules={[{required: false, message: 'Please edit customer phone'}]}*/}
                {/*    >*/}
                {/*        <Input placeholder="Please edit customer phone"/>*/}
                {/*    </Form.Item>*/}
                {/*</Col>*/}
            </Row>

            <Row gutter={10}>
                <Col span={12}>
                    <Form.Item
                        name="contractAmountF"
                        label="Contract Amount"
                        rules={[{required: false, message: 'Please enter Contract Amount!'}]}
                    >
                        <Input placeholder="Contract Amount" type='number'/>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={10}>

                <Col span={12}>
                    <Form.Item
                        name="participation"
                        label="Participation"
                        rules={[{required: false, message: 'Please enter Participation Amount!'}]}
                    >
                      <Input placeholder="Participation" type='number'/>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={10}>

                <Col span={12}>
                    <Form.Item
                        label="Contract Date"
                        name="contractDate"
                    >
                        <DatePicker />
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

export default ContractForm;