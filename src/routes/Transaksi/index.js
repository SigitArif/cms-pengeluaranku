import React from 'react';
import {postData} from '../../store/transaksi';
import {getData} from '../../store/pengeluaran';
import swal from 'sweetalert';
import { Menu, Dropdown, Button, Icon, message, Input } from 'antd';

class Transaksi extends React.Component{
    state = {
        name : 'Nama Pengeluaran',
        amount : '',
        detail_transaksi : '',
        pengeluaran: []
    };

    onClickMenu = (event)=>{
        this.setState({
            name: event.target.key
        })
    }
    
    
    componentDidMount() {
        this.getPengeluaranData();
    }
    getPengeluaranData = async () => {
        getData().then(res => {
            this.setState({
                pengeluaran: res.data.results
            })
        });
    }

    onChangeType = (event) => {
        this.setState({
            type : event.key
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
                name : 'Nama Pengeluaran',
                amount : '',
                detail_transaksi : ''
            })
        }).catch(err=>{
            swal('Error', 'gagal menyimpan data', 'error');
        })
    }

    handleButtonClick = (e)=>{
        message.info('Click on left button.');
        console.log('click left button', e);
    }


    handleMenuClick= (e)=> {
    message.info('Click on menu item.');
    console.log('click', e);
  }

    render(){
        function handleButtonClick(e) {
            message.info('Click on left button.');
            console.log('click left button', e);
          }
          

        const onClick = ({ key }) => {
            this.setState({
                name: key
            })
          };
        const menu = (
        <Menu onClick={onClick}>
            {
            this.state.pengeluaran.map(post=>{
                return <Menu.Item key={post.name} ><Icon type="shopping-cart" />{post.name}</Menu.Item> 
            })
            }
        </Menu>
        );
        
        return (
            <div>
                <h3>Form Transaksi</h3>
                <div className="form-controller" id="components-dropdown-demo-dropdown-button">
                    <Dropdown.Button onClick={handleButtonClick} overlay={menu} placement="bottomLeft">
                    {this.state.name}
                    </Dropdown.Button>
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