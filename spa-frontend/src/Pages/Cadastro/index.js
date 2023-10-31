import React, {useState} from "react";
import { Container, Form, SubContainerSign  } from "./styles";
import Input from "../../Components/Input/index";
import Botao from "../../Components/Botao/index"
import { validarConfirmarSenha, validarNomeUsuario, validarSenha } from "../../utils/validadores";
import UserService from '../../Services/UserService'
import { NavLink, useNavigate } from 'react-router-dom'


const userService = new UserService()

const Login = () => {
    const [setLoading] = useState()
    const [form, setForm] = useState([{}])
    const navigate = useNavigate()

    const handleSubmit = async () => {
        try {
            setLoading(true)
            const response = await userService.cadastrar(form)
            if (response === true) {
                navigate('/*')
            }
            setLoading(false)
        } catch (err) {
            alert('Erro no login.')
        }
    }

    const validadorInput = () => {
        if (!validarSenha(form.password)) alert('A senha deve conter pelo menos um dígito, uma letra minúscula, uma letra maiúscula e um caractere especial e 8 caracteres no total.')
        return validarNomeUsuario(form.username) 
        && validarSenha(form.password) 
        & validarConfirmarSenha(form.password, form.passwordConfirmed)
    }

    const handleChange =(event) => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    return ( 
        <Container>
            <Form>
                <h1>Cadastro de usuário</h1>
                <Input
                    name='username'
                    placeholder='Digite o o nome de usuário'
                    onChange={handleChange}
                    type='text'
                />
                <Input
                    name='password'
                    placeholder='Digite a sua senha'
                    onChange={handleChange}
                    type='password'
                />
                <Input
                    name='passwordConfirmed'
                    placeholder='Confirme a sua senha'
                    onChange={handleChange}
                    type='password'
                />
                <Botao
                    type='submit'
                    text='Cadastrar'
                    onClick={handleSubmit}
                    disabled={!validadorInput()}
                />
                <SubContainerSign>
                    <NavLink to="*">Já possui conta?Faça o login!</NavLink>
                </SubContainerSign>
            </Form>
        </Container>
     );
}
 
export default Login;