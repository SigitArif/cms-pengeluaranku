import React from 'react';
import TableComponent from '../../Component/Table';
import { getMonthlyData } from '../../store/statistik';
import { Button, Modal, Input, Radio, DatePicker } from 'antd';
import swal from 'sweetalert';
import moment from 'moment';

const { MonthPicker } = DatePicker;

export default class Statistik extends React.Component{

    componentDidMount() {
        this.getStatData();
    }

    getStatData = async () => {
        getMonthlyData().then(res => {
            this.setState({
                data: res.data.results
            })
        });
    }

    
    onChangeType = (event) => {
        this.setState({
            type : event.target.value
        })
    }

    onChangeText = (key, value) => {
        this.setState({
            [key] : value
        });
    }

    handleDateClick = (date, dateString)=>{
        console.log(date, dateString);
        
        this.onChangeText('month', dateString);
            
            
    }

    save = () => {
        const month = this.state.month;
        const type = this.state.type;
        return getMonthlyData(month, type).then(res=>{
            this.setState({
                data: res.data.results
            })
        }).catch(err=>{
            swal('Error', 'gagal menemukan data', 'error');
        })
    }

    state = {
        data: 0,
        month:'',
        type:'',
        date:'',
        editModalVisible: false,
        defaultValue: {
            amount: ''
        }
    }

    render(){
        return (
            <div>
                <h3>Statistik Bulanan</h3>
                
                <div className="form-controller">
                <MonthPicker
                      placeholder={"Pilih Bulan & Tahun"}
                      onChange={this.handleDateClick} />
                </div>
                {/* <div className="form-controller">
                    <Input
                        value={this.state.code} 
                        onChange={(event)=>this.onChangeText('code', event.target.value)} 
                        placeholder={"Kode Pengeluaran"}/>
                </div> */}
                <div className="form-controller">
                <div style={{
                    fontWeight:'bold', 
                    marginBottom : 10
                }}>Tipe pengeluaran</div>
                <Radio.Group onChange={this.onChangeType} value={this.state.type}>
                    <Radio value={"D"}>Debit</Radio>
                    <Radio value={"K"}>Kredit</Radio>
                </Radio.Group>
                </div>
                <div className="form-controller">
                    <Button type="primary" onClick={this.save}>Cari</Button>
                    
                </div>
                <div className="form-controller">
            <h4>Besar Pengeluaran:{this.state.data}</h4>
                </div>
            </div>
        )
    }

}