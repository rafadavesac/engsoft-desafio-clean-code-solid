class Pedido {
  constructor(dados) {
    this.dados = dados;
  }

  validar() {
    const { itens } = this.dados;
    if (!itens || itens.length === 0) throw new Error("Pedido sem itens");
  }

  calcularTotal() {
    let total = 0;
    for (const item of this.dados.itens) {
      total += item.preco * item.quantidade;
    }
    if (total > 1000) total *= 0.9;
    return total;
  }
}

// Responsabilidade: salvar a venda (persistência).
class VendasRepository {
  async salvar(pedido) {
    console.log(`Salvando pedido ${pedido.id}...`);
  }
}

// Responsabilidade: avisar o cliente (notificação).
class NotificadorService {
  async notificar(pedido) {
    console.log(`Enviando e-mail para ${pedido.clienteEmail}...`);
  }
}

// Responsabilidade: coordenar os passos da venda.
// As dependências chegam pelo construtor (injeção de dependência).
class SistemaDeVendas {
  constructor(repository = new VendasRepository(), notificador = new NotificadorService()) {
    this.repository = repository;
    this.notificador = notificador;
  }

  async processarVenda(dadosPedido) {
    const pedido = new Pedido(dadosPedido);
    pedido.validar();

    const total = pedido.calcularTotal();
    const vendaFinalizada = { ...dadosPedido, total, status: "pago" };

    await this.repository.salvar(vendaFinalizada);
    await this.notificador.notificar(vendaFinalizada);

    return vendaFinalizada;
  }
}

module.exports = SistemaDeVendas;