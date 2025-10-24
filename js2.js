const categorias = {
  GERAL: [

    "5KG DE AÇUCAR",
 "3KG DE BATATA",
 "4 CENOURAS",
 "3 PIMENTOES",
 "2 ALFACE",
 "5 TOMATE",
 "3 ABOBRINHAS",
 "2 BERINGELAS",
 "1 MAÇO DE COUVE",
 "3 CAIXAS DE LEITE",
 "1 POTE DE MANTEIGA",
 "ESPONJAS DE LOUÇA",
  ],
};

// Usa Set para evitar duplicados
let produtosMarcados = new Set(
  JSON.parse(localStorage.getItem("itensMarcados")) || []
);

function carregarLista() {
  const listaEl = document.getElementById("lista");
  listaEl.innerHTML = "";

  let total = 0;
  let marcados = 0;

  Object.entries(categorias).forEach(([categoria, itens]) => {
    const titulo = document.createElement("h3");
    titulo.textContent = categoria;
    listaEl.appendChild(titulo);

    const ul = document.createElement("ul");
    ul.className = "lista";

    // Ordena: não marcados primeiro
    const ordenados = [...itens].sort((a, b) => {
      const aMarc = produtosMarcados.has(`${categoria}-${a}`);
      const bMarc = produtosMarcados.has(`${categoria}-${b}`);
      if (aMarc !== bMarc) return aMarc ? 1 : -1;
      return a.localeCompare(b, "pt-BR");
    });

    ordenados.forEach((item) => {
      total++;
      const key = `${categoria}-${item}`;

      const li = document.createElement("li");
      li.className = "item";
      if (produtosMarcados.has(key)) {
        li.classList.add("checked");
        marcados++;
      }

      li.onclick = () => marcarItem(key);

      const spanProduto = document.createElement("span");
      spanProduto.textContent = item;
      spanProduto.style.flexGrow = "1";
      li.appendChild(spanProduto);

      ul.appendChild(li);
    });

    listaEl.appendChild(ul);
  });

  atualizarContador(total - marcados, total);
}

function marcarItem(key) {
  if (produtosMarcados.has(key)) {
    produtosMarcados.delete(key);
  } else {
    produtosMarcados.add(key);
  }
  localStorage.setItem("itensMarcados", JSON.stringify([...produtosMarcados]));
  carregarLista();
}

function atualizarContador(faltam, total) {
  document.getElementById(
    "contador"
  ).textContent = `Faltam ${faltam} de ${total} produtos`;
}

function resetarLista() {
  produtosMarcados.clear();
  localStorage.removeItem("itensMarcados");
  carregarLista();
}

function adicionarProduto() {
  const nome = prompt("Digite o nome do novo produto:");
  if (!nome) return;

  const categoria = prompt("Digite a categoria (existente ou nova):");
  if (!categoria) return;

  const nomeItem = nome.trim().toUpperCase();
  const categoriaFormatada = categoria.trim().toUpperCase();

  if (!categorias[categoriaFormatada]) categorias[categoriaFormatada] = [];
  categorias[categoriaFormatada].push(nomeItem);

  carregarLista();
}

document.addEventListener("DOMContentLoaded", carregarLista);
