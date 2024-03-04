import { Transacao } from "./Transacao.js";
import { GrupoTransacao } from "./GrupoTransacao.js";

const transacoes: Transacao[] = JSON.parse(localStorage.getItem("transacoes"), (key: string, value: string) => {
    if (key === "data") {
        return new Date(value);
    }

    return value;
}) || [];

const Grava = {

    getDataAcesso(): Date {
        return new Date();
    },

    getGruposTransacoes(): GrupoTransacao[] {
        const gruposTransacoes: GrupoTransacao[] = [];
        const listaTransacoes: Transacao[] = structuredClone(transacoes);
        const transacoesOrdenadas: Transacao[] = listaTransacoes.sort((t1, t2) => t2.data.getTime() - t1.data.getTime());
        let labelAtualGrupoTransacao: string = "";

        for (let transacao of transacoesOrdenadas) {
            let labelGrupoTransacao: string = transacao.data.toLocaleDateString("pt-br", { month: "long", year: "numeric" });
            if (labelAtualGrupoTransacao !== labelGrupoTransacao) {
                labelAtualGrupoTransacao = labelGrupoTransacao;
                gruposTransacoes.push({
                    label: labelGrupoTransacao,
                    transacoes: []
                });
            }
            gruposTransacoes.at(-1).transacoes.push(transacao);
        }

        return gruposTransacoes;
    },

    registrarTransacao(novaTransacao: Transacao): void {

        transacoes.push(novaTransacao);
        console.log(this.getGruposTransacoes());
        localStorage.setItem("transacoes", JSON.stringify(transacoes));
    }
}

export default Grava;