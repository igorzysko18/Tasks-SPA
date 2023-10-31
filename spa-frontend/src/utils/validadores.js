
const validarNomeUsuario = (nome) => {
    return nome?.toString().length > 2
}

const validarSenha = (senha) => {
    return senha?.toString().length >= 8
}

const validarConfirmarSenha = (senha, confirmarSenha) => {
    return validarSenha(senha) && senha === confirmarSenha
}

export {
    validarNomeUsuario,
    validarSenha,
    validarConfirmarSenha
}