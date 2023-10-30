import React, {useState} from "react";
import { Container, Form, SubContainerSign  } from "./styles";
import Input from "../../Components/Input/index";
import Botao from "../../Components/Botao/index"
import { validarNomeUsuario, validarSenha } from "../../utils/validadores";
import UserService from '../../Services/UserService'
import { NavLink, useNavigate } from 'react-router-dom'


const userService = new UserService()

const Login = () => {
    const [loading, setLoading] = useState()
    const [form, setForm] = useState([{}])
    const navigate = useNavigate()

    const handleSubmit = async () => {
        try {
            console.log('form', form)   
            setLoading(true)
            const response = await userService.login(form)
            console.log('response do login', response);
            if (response === true) {
                navigate('/home')
            }
            alert('Login')
            setLoading(false)
        } catch (err) {
            console.log(err)
            alert('Erro no login.')
        }
    }

    const validadorInput = () => {
        return validarNomeUsuario(form.username) && validarSenha(form.password)
    }

    const handleChange =(event) => {
        console.log(event.target.name, event.target.value)
        setForm({...form, [event.target.name]: event.target.value})
    }

    return ( 
        <Container>
            <Form>
                <h1>Login - Tarefas</h1>
                <Input
                    name='username'
                    placeholder='Digite o seu nome de usuário'
                    onChange={handleChange}
                    type='text'
                />
                <Input
                    name='password'
                    placeholder='Digite a sua senha'
                    onChange={handleChange}
                    type='password'
                />
                <Botao
                    type='submit'
                    text='Entrar'
                    onClick={handleSubmit}
                    disabled={loading === true || !validadorInput()}
                />
                <SubContainerSign>
                    <NavLink to="cadastro">Cadastre-se</NavLink>
                </SubContainerSign>
            </Form>
        </Container>
     );
}
 
export default Login;