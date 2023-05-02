import {Button, Drawer} from 'antd';
import {useState} from 'react';

function ContractForPrint({showPrint, resContract, setShowPrint}) {
    const [open, setOpen] = useState(false);
    //const [show, setShow] = useState(true)
    const showDrawer = () => {
        setOpen(true);

    };
    const onClose = () => {
        setShowPrint(false);
        //closePrint(false);
    };
    return (
        <>
            <Drawer
                title="KUPOPRODAJNI UGOVOR br."// + {showPrint &&  ${resContract.id}} }
                placement="right"
                onClose={onClose}
                open={open}
                width={720}
                destroyOnClose={true}
                visible={showPrint}
            >

                <p>Ugovorne strane: </p>
                {/*<p>STR DUO ZRENJANIN MARIJA MRĐEN PR, ul. Gimnazijska 17, Zrenjanin, PIB: 100907791, mbr. 54406177</p>*/}
                {/*<p>koju zastupa Marija Mrđen, u daljem tekstu: PRODAVAC i</p>*/}
                {showPrint &&
                    <p>{resContract.customerDto.lastName} &nbsp; {resContract.customerDto.firstName} iz {resContract.customerDto.address}</p>}
                {showPrint && <p> br.l.karte:{resContract.customerDto.brLK} izdata od {resContract.customerDto.pu}
                    JMBG: {resContract.customerDto.jmbg} </p>}

                <p>u daljem tekstu: KUPAC</p>
                <p><b>Čl.1</b></p>

            </Drawer>
        </>
    );
};
export default ContractForPrint;