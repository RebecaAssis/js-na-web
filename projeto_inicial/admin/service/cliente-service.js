const criaNovaLinha = (nome, email) => {
    const linhaNovoCliente = document.createElement("tr");
    const conteudo = `
    <td class="td" data-td>${nome}</td>
    <td>${email}</td>
    <td>
        <ul class="tabela__botoes-controle">
            <li><a href="../telas/edita_cliente.html" class="botao-simples botao-simples--editar">Editar</a></li>
            <li><button class="botao-simples botao-simples--excluir" type="button">Excluir</button></li>
        </ul>
    </td>
    `
    linhaNovoCliente.innerHTML = conteudo;
    return linhaNovoCliente;
}

const tabela = document.querySelector("[data-tabela]");

const listaClientes = () => {

    const promise = new Promise((resolve, reject) => {
        const http = new XMLHttpRequest();

        // 1 - abrindo a comunicação
        // 2 - enviando a comunicação
        // 3 - ao carrgar a página
        // 4 - pegando a resposta do servidor
        // 5 - lembre-se que o http nos retorna um TEXTO. Teremos que transformar essa resposta em um objeto js para consguirmos fazer o forEach (percorrer o objeto e pegar os dados)

        http.open("GET", "http://localhost:3000/profile");
        http.onload = () => {

            if(http.status >= 400) {

                reject(JSON.parse(http.response));

            } else {

                resolve(JSON.parse(http.response));
            }

        }
        http.send();
    });
    
    return promise;
};

listaClientes()
.then(data => {
    data.forEach(elemento => {
        tabela.appendChild(criaNovaLinha(elemento.nome, elemento.email))
    });
});