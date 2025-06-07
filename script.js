document.addEventListener("DOMContentLoaded", carregarTarefas);

function adicionarTarefa() {
  const input = document.getElementById("tarefa");
  const texto = input.value.trim();
  const lista = document.getElementById("lista");

  if (texto !== "") {
    const tarefa = {
      texto: texto,
      concluida: false
    };

    criarItemNaTela(tarefa);
    salvarTarefa(tarefa);
    input.value = "";
  }
}

function criarItemNaTela(tarefa) {
  const lista = document.getElementById("lista");
  const item = document.createElement("li");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("check");
  checkbox.checked = tarefa.concluida;

  checkbox.addEventListener("change", () => {
    item.classList.toggle("completed", checkbox.checked);
    atualizarStatusNoStorage(item.querySelector("span").textContent, checkbox.checked);
  });

  const spanTexto = document.createElement("span");
  spanTexto.textContent = tarefa.texto;

  const botaoExcluir = document.createElement("button");
  botaoExcluir.innerHTML = "🗑️";
  botaoExcluir.classList.add("delete-btn");
  botaoExcluir.onclick = () => {
    item.remove();
    removerTarefa(tarefa.texto);
  };

  item.classList.toggle("completed", tarefa.concluida);
  item.appendChild(checkbox);
  item.appendChild(spanTexto);
  item.appendChild(botaoExcluir);
  lista.appendChild(item);
}

// Funções de localStorage
function salvarTarefa(tarefa) {
  const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
  tarefas.push(tarefa);
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function carregarTarefas() {
  const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
  tarefas.forEach(tarefa => criarItemNaTela(tarefa));
}

function atualizarStatusNoStorage(texto, status) {
  const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
  const atualizadas = tarefas.map(t => {
    if (t.texto === texto) t.concluida = status;
    return t;
  });
  localStorage.setItem("tarefas", JSON.stringify(atualizadas));
}

function removerTarefa(texto) {
  let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
  tarefas = tarefas.filter(t => t.texto !== texto);
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}
