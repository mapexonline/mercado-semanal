const categorias = {
  "Alimentos Básicos / Secos": [
    //ALIMENTOS BÁSICOS MUDAR AQUI:

    "5 QUILOS DE AÇÚCAR",
    "3 QUILOS DE FEIJÃO",
    "2 LITROS DE ÓLEO",
    "2 QUILOS DE TRIGO",
    "1 PACOTE DE MANTEIGA",
    "2 CAIXAS DE MELITA 103",
    "1 PÃO SOVADO",
    "1 MASSA DE TOMATE",
    "1 POTE DE ALHO",
  ],

  "MISTURA DA SEMANA": [
    //MISTURA DA SEMANA MUDAR AQUI

    "VARIADOS",
  ],

  OUTROS: [
    //OUTROS MUDAR AQUI

    "LAMPADAS RESERVAS",
    "SABONETES BANHEIRO ROGERIO",
  ],

  Hortifruti: [
    //HORTIFRUTI MUDAR AQUI:

    "2 PÉS DE ALFACE",
    "3 CENOURA",
    "1 PACOTE DE CEBOLA",
    "1 PACOTE DE REPOLHO",
    "4 TOMATES",
    "3 QUILOS DE BATATA",
  ],
  Pet:
    //PET MUDAR AQUI:

    ["1 PACOTE DE RAÇÃO"],
};

let produtosMarcados = JSON.parse(localStorage.getItem("itensMarcados")) || [];

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

    const marcadosNaCategoria = [];
    const naoMarcadosNaCategoria = [];

    itens.forEach((item) => {
      const key = `${categoria}-${item}`;
      if (produtosMarcados.includes(key)) {
        marcadosNaCategoria.push(item);
        marcados++;
      } else {
        naoMarcadosNaCategoria.push(item);
      }
      total++;
    });

    [...naoMarcadosNaCategoria, ...marcadosNaCategoria].forEach((item) => {
      const key = `${categoria}-${item}`;
      const li = document.createElement("li");
      li.className = "item";
      if (produtosMarcados.includes(key)) li.classList.add("checked");

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
  if (produtosMarcados.includes(key)) {
    produtosMarcados = produtosMarcados.filter((i) => i !== key);
  } else {
    produtosMarcados.push(key);
  }
  localStorage.setItem("itensMarcados", JSON.stringify(produtosMarcados));
  carregarLista();
}

function atualizarContador(faltam, total) {
  document.getElementById(
    "contador"
  ).textContent = `Faltam ${faltam} de ${total} produtos`;
}

function resetarLista() {
  localStorage.removeItem("itensMarcados");
  produtosMarcados = [];
  carregarLista();
}

function adicionarProduto() {
  const nome = prompt("Digite o nome do novo produto:");
  if (!nome) return;

  const categoria = prompt("Digite a categoria (existente ou nova):");
  if (!categoria) return;

  const nomeMaiusculo = nome.trim().toUpperCase();
  const categoriaFormatada = categoria.trim();

  if (!categorias[categoriaFormatada]) categorias[categoriaFormatada] = [];
  categorias[categoriaFormatada].push(nomeMaiusculo);
  carregarLista();
}

carregarLista();
