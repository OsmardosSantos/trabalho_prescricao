// Mock de dados simulando o retorno do banco de dados
const medicamentos = [
  { 
    codigo: "MED-001", 
    nome: "Vancomicina 500mg IV fam", 
    posologia: "1 frasco EV a cada 12h",
    qtdPrescrita: 10, 
    saldoEstoque: 50, 
    substituto: "Linezolida 600mg fam" 
  },
  { 
    codigo: "MED-002", 
    nome: "Cefepima 1000mg fam", 
    posologia: "1 frasco EV a cada 8h",
    qtdPrescrita: 21, 
    saldoEstoque: 8, 
    substituto: "Meropenem 1000mg fam" 
  },
  { 
    codigo: "MED-003", 
    nome: "Claritromicina 500mg fam", 
    posologia: "1 frasco EV a cada 12h",
    qtdPrescrita: 12, 
    saldoEstoque: 0, 
    substituto: "Azitromicina 500mg fam" 
  },
  { 
    codigo: "MED-004", 
    nome: "Dipirona 500mg", 
    posologia: "1 comprimido VO a cada 6h se dor/febre",
    qtdPrescrita: 5, 
    saldoEstoque: 5, 
    substituto: "Paracetamol 500mg" 
  }
];

// Monta a tabela na tela com base na lista recebida
function renderizarTabela(lista) {
  const tbody = document.getElementById("medicationTableBody");
  tbody.innerHTML = "";

  lista.forEach(med => {
    let statusHTML = "";
    let acaoHTML = "";

    // Regra 1: Estoque suficiente (Verde)
    if (med.saldoEstoque >= med.qtdPrescrita) {
      statusHTML = `<span class="badge status-green">● Atende Total</span>`;
      acaoHTML = `<span class="reserved-text">✔ ${med.qtdPrescrita} un. reservadas</span>`;
    } 
    // Regra 2: Estoque parcial (Amarelo)
    else if (med.saldoEstoque > 0 && med.saldoEstoque < med.qtdPrescrita) {
      statusHTML = `<span class="badge status-yellow">● Parcial (${med.saldoEstoque} disp.)</span>`;
      acaoHTML = `<button class="btn btn-swap" onclick="sugerirTroca('${med.nome}', '${med.substituto}')">Sugerir Troca</button>`;
    } 
    // Regra 3: Estoque zerado (Vermelho)
    else {
      statusHTML = `<span class="badge status-red">● Zerado</span>`;
      acaoHTML = `
        <div class="actions">
          <button class="btn btn-swap" onclick="sugerirTroca('${med.nome}', '${med.substituto}')">Sugerir Troca</button>
          <button class="btn btn-pharmacy" onclick="informarFarmacia('${med.nome}')">Informar Farmácia</button>
        </div>
      `;
    }

    tbody.innerHTML += `
      <tr>
        <td>
          <strong>${med.nome}</strong><br>
          <small>${med.codigo} • ${med.posologia}</small>
        </td>
        <td>${med.qtdPrescrita} un.</td>
        <td>${med.saldoEstoque} un.</td>
        <td>${statusHTML}</td>
        <td>${acaoHTML}</td>
      </tr>
    `;
  });
}

// Filtra os medicamentos conforme o usuário digita
function filtrarMedicamentos() {
  const texto = document.getElementById("searchInput").value.toLowerCase();
  
  const filtrados = medicamentos.filter(med => 
    med.nome.toLowerCase().includes(texto) || 
    med.codigo.toLowerCase().includes(texto)
  );
  
  renderizarTabela(filtrados);
}

// Abre o modal de sugestão de troca
function sugerirTroca(medicamento, substituto) {
  document.getElementById("modalTitle").innerText = "Sugestão de Troca Terapêutica";
  document.getElementById("modalBody").innerText = `Atenção: Estoque insuficiente para ${medicamento}.\nSugestão de troca: ${substituto}`;
  document.getElementById("actionModal").style.display = "flex";
}

// Abre o modal de alerta para a farmácia
function informarFarmacia(medicamento) {
  document.getElementById("modalTitle").innerText = "Notificação à Farmácia";
  document.getElementById("modalBody").innerText = `Alerta enviado! A Farmácia foi informada que o medicamento ${medicamento} está com estoque zerado.`;
  document.getElementById("actionModal").style.display = "flex";
}

// Fecha o modal
function fecharModal() {
  document.getElementById("actionModal").style.display = "none";
}

// Inicia a tabela assim que a página carrega
renderizarTabela(medicamentos);
