import React from 'react';
import TableComponent from '../../Component/Table';
import { getData, postData as editDataStore } from '../../store/transaksi';
import { Button, Modal, Input, Radio } from 'antd';
import swal from 'sweetalert';

export default class TransaksiList extends React.Component {
    componentDidMount() {
        this.getTransaksiData();
    }

    getTransaksiData = async () => {
        getData().then(res => {
            this.setState({
                data: res.data.results
            })
        });
    }

    state = {
        data: [],
        editModalVisible: false,
        defaultValue: {
            uuid: '',
            name: '',
            amount: '',
            detail_transaksi: '',
        }
    }

    moveToAddForm = () => {
        this.props.history.push('/app/transaksi');
    }


    
    onChangeText = (key, val)=>{
        const defaultValue = this.state.defaultValue;
        defaultValue[key] = val;
        this.setState({
            defaultValue
        })
    }

    render() {
        const columns = [
            {
                title: 'Nama Pengeluaran',
                dataIndex: 'name',
                key: 'name'
            },
            {
                title: 'Besaran Pengeluaran',
                dataIndex: 'amount',
                key: 'amount'
            },
            {
                title: 'Keterangan',
                dataIndex: 'detail_transaksi',
                key: 'detail_transaksi'
            },
            {
                title: 'Action',
                key: 'action',
                render: (val, row) => {
                    return (
                        <div>
                            <Button
                                icon="edit"
                                type="primary"
                                style={{ marginRight: 10 }}
                                onClick={() => this.editData(row)} />
                            <Button
                                icon="delete"
                                type="danger"
                                onClick={() => this.deleteData(row)} />
                        </div>
                    )
                }
            }
        ];

        const contohData = [
            {
                name: 'Beli baju',
                code: 'B0001',
                type: 'debit'
            },
            {
                name: 'Jual Batu Bara',
                code: 'J0002',
                type: 'kredit'
            },
            {
                name: 'Tukar emas',
                code: 'T0001',
                type: 'debit'
            }
        ]
        return (
            <div>
                <TableComponent
                    title={"Daftar Transaksi"}
                    dataSource={this.state.data}
                    columns={columns}
                    onClickAdd={this.moveToAddForm}
                />
                <Modal
                    title="Edit data"
                    visible={this.state.editModalVisible}
                    onOk={this.saveEdit}
                    onCancel={() => this.setState({ editModalVisible: false })}
                >
                    <div className="form-controller">
                        <Input
                            value={this.state.defaultValue.name}
                            onChange={(event) => this.onChangeText('name', event.target.value)}
                            placeholder={"Nama pengeluaran"} />
                    </div>
                    <div className="form-controller">
                        <Input
                            value={this.state.defaultValue.code}
                            onChange={(event) => this.onChangeText('code', event.target.value)}
                            placeholder={"Kode Pengeluaran"} />
                    </div>
                    <div className="form-controller">
                        <div style={{
                            fontWeight: 'bold',
                            marginBottom: 10
                        }}>Tipe pengeluaran</div>
                        <Radio.Group 
                            onChange={(event) => this.onChangeText('type', event.target.value)} 
                            value={this.state.defaultValue.type}>
                            <Radio value={"debit"}>Debit</Radio>
                            <Radio value={"kredit"}>Kredit</Radio>
                        </Radio.Group>
                    </div>
                </Modal>
            </div>
        )
    }
}