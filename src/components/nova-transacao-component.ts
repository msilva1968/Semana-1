import { Transacao } from "../types/Transacao.js";
import Grava from "../types/GravaAutor.js";
import ListarAutores from "./listaAutores.js";

const elementoFormulario = document.querySelector(".block-nova-transacao form") as HTMLFormElement;
elementoFormulario.addEventListener("submit", function(event) {
    try 
    {
        event.preventDefault();
        if (!elementoFormulario.checkValidity()) {
            alert("Por favor, preencha todos os campos do formulário!");
            return;
        }

        const inputNome = elementoFormulario.querySelector("#nome") as HTMLInputElement;
        const inputEmail = elementoFormulario.querySelector("#email") as HTMLInputElement;
        const inputbiografia = elementoFormulario.querySelector("#biografia") as HTMLInputElement;

        let nome: string = inputNome.value;
        let email: string = inputEmail.value;
        let biografia: string = inputbiografia.value;

        const validaEmail: RegExp = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/i;
        
        if (!validaEmail.test(email)) {
            alert("eMail inválido!");
            return;
        }

       if (biografia.length < 100){
           alert("O campo biografia deve ter no mínimo 100 caracteres!");
           return;

       }else if ( (biografia.length > 500)){
           alert("O campo biografia deve ter no máximo 500 caracteres!");
           return;
       }

        const novaTransacao: Transacao = {
            nome: nome,
            email: email,
            biografia: biografia,
            data: new Date(),
                }

        Grava.registrarTransacao(novaTransacao);
        ListarAutores.atualizar();
        elementoFormulario.reset();
    }
    catch(erro) {
        alert(erro.message);
    }
});