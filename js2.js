const categorias = {
  PADARIA: ["MANTEIGA", "REQUEIJAO", "1 KG DE TRIGO", "2 MIOJO SABOR GALINHA"],

  HORTIFRUTI: ["1 KG DE CEBOLA", "3 KG BATATA ", "CENOURA", "2 CAIXAS DE OVOS"],

  AÇOUGUE: ["3 KG DE SOBRECOXA"],

  MERCEARIA: ["3 LITROS DE OLEO", "1KG DE SAL", "1 KG DE MASSA DE TOMATE"],

  BEBIDAS: ["REFRIGERANTE", "SUCO DE CAIXINHA"],

  "HIGIENE / LIMPEZA": ["FIO DENTAL"],
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
