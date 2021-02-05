import React from 'react';
import { Card, Form, Icon, Input,Checkbox, Button } from 'antd';
import {login} from '../../store/login';
import swal from 'sweetalert';
class Login extends React.Component {

    state = {
        id : '',
        password: '',
        status_login :'EMAIL'

    }

    onChangeText = (key, value) =>{
        this.setState({
            [key] : value
        })
    }

    save = ()=>{
        const data = this.state;
        console.log(data);
        return login(data).then(res=>{
            swal('Berhasil', 'Login berhasil', 'success');
            this.props.history.push('/app/dpengeluaran_list');
            
            localStorage.setItem("id_token", res.data.results.token);
            
        })
        .catch(err=>{
            swal('Error', 'Cek Username Atau Password Anda', 'error');
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          
             if (!err) {    
             this.props.history.push('/app/pengeluaran_list')
           }
         });
        const data = this.state;
        console.log(data);
        return login(data).then(res=>{
            swal('Berhasil', 'Login berhasil', 'success');
            this.props.history.push('/app/pengeluaran_list');
        })
        .catch(err=>{
            swal('Error', 'Cek Usernam Atau Password Anda', 'error');
        })
        
      };


    render(){
        const { getFieldDecorator } = this.props.form;
        return (
            <div style={{
                width: '100vw',
                height : '100vh',
                backgroundColor : '#F0F2F5',
                display :'flex',
                justifyContent :'center',
                alignItems:'center'
            }}>
                <Card title="Login Pengeluaranku" bordered={false} style={{ width: 300 }}>
                <Form className="login-form">
                    <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Username"
                        onChange={(event)=> this.onChangeText('id', event.target.value)}
                        />,
                    )}
                    </Form.Item>
                    <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="Password"
                        onChange={(event)=>this.onChangeText('password', event.target.value)}
                        />,
                    )}
                    </Form.Item>
                    <Form.Item>
                    
                    <Button type="primary" htmlType="submit" 
                        className="login-form-button"
                        onClick={this.save}>
                        Log in
                    </Button>
                    {/* Or <a href=""> register now!</a> */}
                    </Form.Item>
                </Form>
                </Card>
            </div>
        )
        
    }
}

export default Form.create({ name: 'normal_login' })(Login);