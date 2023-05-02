import {Drawer, Input, Col, Select, Form, Row, Button, Spin, DatePicker, Space} from 'antd';
import {LoadingOutlined} from '@ant-design/icons';
import {createContract, extractContract} from './client.js';
import {useEffect, useState} from 'react';
import {successNotification, errorNotification} from './Notification.js';

const {Option} = Select;
const antIcon = <LoadingOutlined style={{fontSize: 24}} spin/>;


function ContractForm({
                          showContractForm, setShowContractForm, customer, setCustomer, fetchCustomers,
                          resContract, fetchContractFromResponse, setShowPrint, setCustomerDto
                      }) {

    const [submitting, setSubmitting] = useState(false);
    const onCLose = () => setShowContractForm(false);


    const [purchaseContract, setPurchaseContract] = useState({
        customerDto: customer,
        participation: 0,
        contractAmount: 0
    });

// Function to update the customerDto property of the purchaseContract object
    const updateCustomerDto = (customer) => {
        // Create a new object for purchaseContract with the updated customerDto property
        const updatedPurchaseContract = {
            ...purchaseContract,
            customerDto: customer
        };
        // Update the state of purchaseContract with the new object
        setPurchaseContract(updatedPurchaseContract);
    }

    useEffect(() => {
        setCustomer(customer);
        updateCustomerDto(customer);
    }, [customer]);

    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : Number(target.value);
        const name = target.name;

        setPurchaseContract(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(purchaseContract);
    };

    const onFinish = () => {

        setSubmitting(true);
        console.log(JSON.stringify(customer, null, 2))
        console.log(JSON.stringify(purchaseContract, null, 2))
        createContract(purchaseContract)
            .then(res => res.json())
            .then((data) => {
                fetchContractFromResponse(data)
                console.log("Contract created")
                //console.log("Response" + purchaseContract)
                onCLose();
                successNotification(
                    "Contract successfully created",
                    ` New contract for ${customer.firstName} ${customer.lastName} was created`
                );
                setShowPrint(true);
                fetchCustomers();
            })
            .catch(err => {
                console.log(err);
                err.response.json().then(res => {
                    console.log(res);
                    errorNotification(
                        "There was an issue",
                        `${res.message} [${res.status}] [${res.error}]`,
                        "bottomLeft"
                    )
                });
            })
            .finally(() => {
                setSubmitting(false);
            })
    };

    const onFinishFailed = errorInfo => {
        alert(JSON.stringify(errorInfo, null, 2));
    };

    return <Drawer
        title="New Contract"
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
                {showContractForm && <p>      {customer.lastName} </p>}
                {/*<br/>  <p> JMBG:   {customer.jmbg} </p>*/}
                {/*<br/>   <p>Address:   {customer.address}  </p><br/>*/}

            </Row>

            <Row gutter={10}>
                <Col span={12}>
                    <Form.Item
                        name="contractAmount"
                        label="Contract Amount"
                        rules={[{required: false, message: 'Please enter Contract Amount!'}]}
                    >
                        <Input placeholder="Contract Amount" type='number'
                               value={purchaseContract.contractAmount}
                               name="contractAmount"
                               onChange={handleInputChange}
                        />
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
                        <Input placeholder="Participation" type='number'
                               name="participation"
                               value={purchaseContract.participation}
                               onChange={handleInputChange}
                        />
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

export default ContractForm;