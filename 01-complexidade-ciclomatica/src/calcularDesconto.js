//faixas: Faixas de preço
const REGRAS = {
  premium: {
    taxaPadrao: 0.05,
    faixas: [
      { acimaDe: 1000, taxa: 0.15, taxaVeterano: 0.20 },
      { acimaDe: 500, taxa: 0.10 },
    ],
  },
  gold: {
    taxaPadrao: 0.02,
    faixas: [
      { acimaDe: 1000, taxa: 0.10 },
    ],
  },
};

function calcularDesconto(cliente, valor) {
  const regra = REGRAS[cliente.tipo];
  if (!regra) return 0;

  const faixa = regra.faixas.find((f) => valor > f.acimaDe);
  if (!faixa) return valor * regra.taxaPadrao;

  const veterano = cliente.anosCadastro > 5;
  const taxa = veterano && faixa.taxaVeterano ? faixa.taxaVeterano : faixa.taxa;
  return valor * taxa;
}

module.exports = calcularDesconto;