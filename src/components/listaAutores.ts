import Conta from "../types/GravaAutor.js";
import { FormatoData } from "../types/FormatoData.js";
import { GrupoTransacao } from "../types/GrupoTransacao.js";
import { formatarData } from "../utils/formatters.js";

const elementoRegistroTransacoesExtrato: HTMLElement = document.querySelector(".extrato .registro-transacoes");

renderizarExtrato();
function renderizarExtrato(): void {
    const gruposTransacoes: GrupoTransacao[] = Conta.getGruposTransacoes();
    elementoRegistroTransacoesExtrato.innerHTML = "";
    let htmlRegistroTransacoes: string = "";

    for (let grupoTransacao of gruposTransacoes)
    {
        let htmlTransacaoItem: string = "";
        for (let transacao of grupoTransacao.transacoes)
        {
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
    atualizar(): void {
        renderizarExtrato();
    }
}
export default ListarAutores;