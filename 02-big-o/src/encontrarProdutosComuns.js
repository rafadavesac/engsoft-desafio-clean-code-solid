function encontrarProdutosComuns(listaA, listaB) {
  const setB = new Set(listaB);
  const comuns = [];

  for (const produto of listaA) {
    if (setB.has(produto)) {
      comuns.push(produto);
    }
  }

  return comuns;
}

module.exports = encontrarProdutosComuns;