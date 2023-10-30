
const validarNomeUsuario = (nome) => {
    return nome?.toString().length > 2
}

const validarSenha = (senha) => {
    console.log(senha?.toString().length > 8)
    return senha?.toString().length > 8
}

const validarConfirmarSenha = (senha, confirmarSenha) => {
    return validarSenha(senha) && senha === confirmarSenha
}

export {
    validarNomeUsuario,
    validarSenha,
    validarConfirmarSenha
}