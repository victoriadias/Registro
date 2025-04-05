// Espera o DOM carregar antes de iniciar
document.addEventListener("DOMContentLoaded", async () => {
    const supabaseUrl = "https://verghknzyulewhjtxaln.supabase.co";
    const supabaseKey = "SUA_ANON_KEY_AQUI"; // Substitua pela sua chave real
    const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

    // Função para carregar os registros do banco e exibir na tabela
    async function carregarRegistros() {
        const { data, error } = await supabase.from("servicos").select("*");
        if (error) {
            console.error("Erro ao carregar registros:", error.message);
            return;
        }

        const tabela = document.getElementById("tabela-registros");
        tabela.innerHTML = ""; // Limpa a tabela antes de adicionar novos dados

        data.forEach(registro => {
            const row = `<tr>
                <td>${registro.id}</td>
                <td>${registro.solicitante}</td>
                <td>${registro.loja}</td>
                <td>${registro.servico}</td>
                <td>R$ ${registro.orcamento}</td>
                <td>${registro.infraSpeak}</td>
                <td>${registro.mes} de ${registro.ano}</td>
                <td>${registro.faturamento}</td>
                <td>${registro.situacao}</td>
                <td>${registro.tipoServico}</td>
                <td>
                    <button onclick="editarRegistro(${registro.id})" class="btn btn-primary">Editar</button>
                    <button onclick="removerRegistro(${registro.id})" class="btn btn-danger">Remover</button>
                </td>
            </tr>`;
            tabela.innerHTML += row;
        });
    }

    // Define a função global para adicionar um registro
    window.adicionarRegistro = async function() {
        console.log("Adicionando registro...");

        // Pegando valores dos inputs
        const solicitante = document.getElementById("solicitante").value;
        const loja = document.getElementById("loja").value;
        const servico = document.getElementById("servico").value;
        const infraSpeak = document.getElementById("infraSpeak").value;
        const faturamento = document.getElementById("faturamento").value;
        const tipoServico = document.getElementById("tipoServico").value;
        const orcamento = document.getElementById("orcamento").value;
        const mes = document.getElementById("mes").value;
        const ano = document.getElementById("ano").value;
        const situacao = document.getElementById("situacao").value;

        // Inserindo dados no Supabase
        const { data, error } = await supabase
            .from("servicos")
            .insert([
                {
                    solicitante,
                    loja,
                    servico,
                    infraSpeak,
                    faturamento,
                    tipoServico,
                    orcamento,
                    mes,
                    ano,
                    situacao
                }
            ]);

        if (error) {
            console.error("Erro ao adicionar registro:", error.message);
        } else {
            console.log("Registro adicionado com sucesso:", data);
            location.reload(); // Atualiza a página para exibir o novo registro
        }
    };

    // Define a função global para remover um registro
    window.removerRegistro = async function(id) {
        const { error } = await supabase.from("servicos").delete().eq("id", id);
        if (error) {
            console.error("Erro ao remover registro:", error.message);
        } else {
            console.log("Registro removido com sucesso!");
            location.reload();
        }
    };

    // Chama a função para carregar os registros ao iniciar a página
    carregarRegistros();
});
