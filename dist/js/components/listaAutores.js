import Conta from "../types/GravaAutor.js";
import { FormatoData } from "../types/FormatoData.js";
import { formatarData } from "../utils/formatters.js";
const elementoRegistroTransacoesExtrato = document.querySelector(".extrato .registro-transacoes");
renderizarExtrato();
function renderizarExtrato() {
    const gruposTransacoes = Conta.getGruposTransacoes();
    elementoRegistroTransacoesExtrato.innerHTML = "";
    let htmlRegistroTransacoes = "";
    for (let grupoTransacao of gruposTransacoes) {
        let htmlTransacaoItem = "";
        for (let transacao of grupoTransacao.transacoes) {
            htmlTransacaoItem += `
                <div class="transacao-item">
                        <span class="tipo"><strong>Nome Autor:</strong> ${transacao.nome}<BR><strong>Data Cadastro: </strong>${formatarData(transacao.data, FormatoData.PADRAO)}<BR><BR></span>
                </div>
            `;
        }
        htmlRegistroTransacoes += `
                ${htmlTransacaoItem}
        `;
    }
    if (htmlRegistroTransacoes === "") {
        htmlRegistroTransacoes = "<div>Não há autores cadastrados.</div>";
    }
    elementoRegistroTransacoesExtrato.innerHTML = htmlRegistroTransacoes;
}
const ListarAutores = {
    atualizar() {
        renderizarExtrato();
    }
};
export default ListarAutores;
