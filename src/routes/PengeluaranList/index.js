import React from 'react';
import TableComponent from '../../Component/Table';
import { getData, deleteData, editData as editDataStore } from '../../store/pengeluaran';
import { Button, Modal, Input, Radio } from 'antd';
import swal from 'sweetalert';

export default class PengeluaranList extends React.Component {
    componentDidMount() {
        this.getPengeluaranData();
    }

    getPengeluaranData = async () => {
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
            type: '',
            code: '',
            name: '',
            uuid: '',
        }
    }

    moveToAddForm = () => {
        this.props.history.push('/app/pengeluaran');
    }

    editData = (row) => {
        this.setState({
            editModalVisible: true,
            defaultValue: JSON.parse(JSON.stringify(row))
        })
    }

    saveEdit = () => {
        
        swal({
            title: "Are you sure?",
            text: "Apakah kamu yakin untuk mengedit data",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (willEdit) => {
                if (willEdit) {
                    try {
                        this.setState({
                            editModalVisible : false
                        });
                        const id = this.state.defaultValue.uuid;
                        const data = this.state.defaultValue;
                        await editDataStore(id,data).catch(err => {
                            throw err;
                        })
                        await this.getPengeluaranData();
                        swal('Berhasil', 'Data berhasil diedit', 'success');
                    } catch (err) {
                        swal('Error', 'data gagal diedit', 'error');
                    }
                }
            });
    }

    deleteData = (row) => {
        swal({
            title: "Are you sure?",
            text: "Apakah kamu yakin untuk menghapus data",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (willDelete) => {
                if (willDelete) {
                    try {
                        await deleteData(row.uuid).catch(err => {
                            throw err;
                        })
                        await this.getPengeluaranData();
                        swal('Berhasil', 'Data berhasil dihapus', 'success');
                    } catch (err) {
                        swal('Error', 'data gagal dihapus', 'error');
                    }
                }
            });
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
                title: 'Kode Pengeluaran',
                dataIndex: 'code',
                key: 'code'
            },
            {
                title: 'Tipe',
                dataIndex: 'type',
                key: 'type'
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
                    title={"Daftar Pengeluaran"}
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