function consultarCEP() {
    var cepOrLogradouro = document.getElementById('cepInput').value;

    if (!cepOrLogradouro) {
        alert("Por favor, digite um CEP ou Logradouro.");
        return;
    }

    // Limpar resultados anteriores
    limparResultados();

    // Fazer requisição à API Via Cep
    fetch(`https://viacep.com.br/ws/${cepOrLogradouro}/json/`)
        .then(response => response.json())
        .then(data => {
            if (!data.erro) {
                // Exibir resultados na tabela
                exibirResultados(data);
            } else {
                alert("CEP ou Logradouro não encontrado.");
            }
        })
        .catch(error => {
            console.error("Erro ao buscar CEP:", error);
            alert("Erro ao buscar CEP. Por favor, tente novamente.");
        });
}

function exibirResultados(cepData) {
    var resultTable = document.getElementById('resultTable');
    var resultBody = document.getElementById('resultBody');

    var row = resultBody.insertRow();
    row.insertCell(0).textContent = "1";
    row.insertCell(1).textContent = cepData.logradouro || "-";
    row.insertCell(2).textContent = cepData.bairro || "-";
    row.insertCell(3).textContent = cepData.localidade || "-";
    row.insertCell(4).textContent = cepData.uf || "-";
    row.insertCell(5).textContent = formatarCEP(cepData.cep);

    // Exibir a tabela
    resultTable.style.display = 'table';
}

function limparResultados() {
    var resultTable = document.getElementById('resultTable');
    var resultBody = document.getElementById('resultBody');

    // Limpar resultados anteriores
    resultBody.innerHTML = "";
    resultTable.style.display = 'none';
}

function formatarCEP(cep) {
    // Formatar CEP com máscara: 30000-000
    return cep.replace(/^(\d{5})(\d{3})$/, "$1-$2");
}
