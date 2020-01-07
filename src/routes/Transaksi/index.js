import React from 'react';
import { Input, Button} from 'antd';
import {postData} from '../../store/transaksi';
import swal from 'sweetalert';

class Transaksi extends React.Component{
    state = {
        name : '',
        amount : '',
        detail_transaksi : ''
    };

    onChangeType = (event) => {
        this.setState({
            type : event.target.value
        })
    }

    viewData = () => {
        this.props.history.push('/app/transaksi_list');
    }

    onChangeText = (key, value) => {
        this.setState({
            [key] : value
        });
    }

    save = () => {
        const data = this.state;
        return postData(data).then(res=>{
            swal('Berhasil', 'Data berhasil ditambahkan', 'success');
            this.setState({
                name : 'debit',
                amount : '',
                detail_transaksi : ''
            })
        }).catch(err=>{
            swal('Error', 'gagal menyimpan data', 'error');
        })
    }
    render(){
        return (
            <div>
                <h3>Form Transaksi</h3>
                <div className="form-controller">
                    <Input 
                        value={this.state.name} 
                        onChange={(event)=>this.onChangeText('name', event.target.value)}
                        placeholder={"Nama pengeluaran"}/>
                </div>
                <div className="form-controller">
                    <Input 
                        value={this.state.amount} 
                        onChange={(event)=>this.onChangeText('amount', event.target.value)}
                        placeholder={"Besar Pengeluaran"}/>
                </div>
                <div className="form-controller">
                    <Input 
                        value={this.state.detail_transaksi} 
                        onChange={(event)=>this.onChangeText('detail_transaksi', event.target.value)}
                        placeholder={"Keterangan"}/>
                </div>
                <div className="form-controller">
                    <Button type="primary" onClick={this.save}>Submit</Button>
                    <Button style={{marginLeft: 10}} onClick={this.viewData}>View Data</Button>
                </div>
            </div>
        )
    }
}

export default Transaksi;