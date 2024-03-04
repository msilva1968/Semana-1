import Grava from "../types/GravaAutor.js";
import ListarAutores from "./listaAutores.js";
const elementoFormulario = document.querySelector(".block-nova-transacao form");
elementoFormulario.addEventListener("submit", function (event) {
    try {
        event.preventDefault();
        if (!elementoFormulario.checkValidity()) {
            alert("Por favor, preencha todos os campos do formulário!");
            return;
        }
        const inputNome = elementoFormulario.querySelector("#nome");
        const inputEmail = elementoFormulario.querySelector("#email");
        const inputbiografia = elementoFormulario.querySelector("#biografia");
        let nome = inputNome.value;
        let email = inputEmail.value;
        let biografia = inputbiografia.value;
        const validaEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/i;
        if (!validaEmail.test(email)) {
            alert("eMail inválido!");
            return;
        }
        if (biografia.length < 100) {
            alert("O campo biografia deve ter no mínimo 100 caracteres!");
            return;
        }
        else if ((biografia.length > 500)) {
            alert("O campo biografia deve ter no máximo 500 caracteres!");
            return;
        }
        const novaTransacao = {
            nome: nome,
            email: email,
            biografia: biografia,
            data: new Date(),
        };
        Grava.registrarTransacao(novaTransacao);
        ListarAutores.atualizar();
        elementoFormulario.reset();
    }
    catch (erro) {
        alert(erro.message);
    }
});
