const supabaseUrl = 'https://verghknzyulewhjtxaln.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZlcmdoa256eXVsZXdoanR4YWxuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3MzE4MDgsImV4cCI6MjA1OTMwNzgwOH0.zbLollRph68LJQ0DvLfqltQ0WgXGEtzmX1khwtyl-zM';
document.addEventListener("DOMContentLoaded", () => {
    const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);
});

const form = document.getElementById('form');
const tableBody = document.querySelector('#dataTable tbody');

// Carrega os registros ao iniciar
window.addEventListener('DOMContentLoaded', async () => {
  const { data, error } = await supabase.from('registros').select('*');
  if (error) {
    console.error('Erro ao carregar dados:', error);
  } else {
    data.forEach(addRowToTable);
  }
});

// Adiciona nova linha na tabela
function addRowToTable(registro) {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${registro.nome}</td>
    <td>${registro.equipamento}</td>
    <td>${registro.defeito}</td>
    <td>${registro.status}</td>
    <td>${registro.data}</td>
    <td>${registro.valor}</td>
  `;
  tableBody.appendChild(row);
}

// Salva novo registro
form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const nome = document.getElementById('nome').value;
  const equipamento = document.getElementById('equipamento').value;
  const defeito = document.getElementById('defeito').value;
  const status = document.getElementById('status').value;
  const data = document.getElementById('data').value;
  const valor = document.getElementById('valor').value;

  const { data: inserted, error } = await supabase.from('registros').insert([{
    nome,
    equipamento,
    defeito,
    status,
    data,
    valor
  }]);

  if (error) {
    alert('Erro ao salvar os dados!');
    console.error(error);
  } else {
    addRowToTable(inserted[0]);
    form.reset();
  }
});
