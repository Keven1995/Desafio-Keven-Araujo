const cardapio = {
    cafe: { descricao: "Café", valor: 3.00, extras: ["chantily"] },
    chantily: { descricao: "Chantily(extra do café)", valor: 1.50 },
    suco: { descricao: "Suco Natural", valor: 6.20 },
    sanduiche: { descricao: "Sanduíche", valor: 6.50, extras: ["queijo"] },
    queijo: { descricao: "Queijo (extra do sanduíche)", valor: 2.00 },
    salgado: { descricao: "Salgado", valor: 7.25 },
    combo1: { descricao: "1 Suco e 1 Sanduíche", valor: 9.50 },
    combo2: { descricao: "1 Café e 1 Sanduíche", valor: 7.50 },
};

const formasDePagamento = ["dinheiro", "debito", "credito"];

function calcularValorDaCompra(pedido, formaPagamento) {
    const itens = pedido.split(",");
    let total = 0;
    let cafePedidos = 0;
    let chantilyPedidos = 0;
    let queijoPedidos = 0;
    let sanduichePedidos = 0;

    if (pedido.trim() === "") {
        return "Não há itens no carrinho de compra!";
    }

    for (const item of itens) {
        const partes = item.split(':');
        const codItens = partes[0];
        const quantidade = parseInt(partes[1]);


        if (!cardapio[codItens]) {
            return "Item inválido!";
        }

        if (quantidade <= 0) {
            return "Quantidade inválida!";
        }

        if (cardapio[codItens]) {
            if (codItens === "cafe") {
                cafePedidos += quantidade;
            } else if (codItens === "chantily") {
                chantilyPedidos += quantidade;
            }
        }

        const itemInfo = cardapio[codItens];
        total += itemInfo.valor * quantidade;
        
        if (itemInfo.extras && itemInfo.extras.includes("chantily")) {
            chantilyPedidos += quantidade;
        }
         if (chantilyPedidos > 0 && cafePedidos === 0) {
         return "Item extra não pode ser pedido sem o principal!";
        }
        if (cardapio[codItens]) {
            if (codItens === "queijo") {
                queijoPedidos += quantidade;
            } else if (codItens === "sanduiche") {
                sanduichePedidos += quantidade;
            }
        }
        
        if (itemInfo.extras && itemInfo.extras.includes("queijo")) {
            queijoPedidos += quantidade;
        }
         if (queijoPedidos > 0 && sanduichePedidos === 0) {
         return "Item extra não pode ser pedido sem o principal!";
        }
    }
        if (formaPagamento != "dinheiro" && formaPagamento != "debito" && formaPagamento != "credito") {
            return "Forma de pagamento inválida!"
        }

        if (formaPagamento === "dinheiro") {
            total *= 0.95; // Desconto de 5%
        } else if (formaPagamento === "credito") {
            total *= 1.03; // Taxa adicional de 3%
        }

        return `Total a pagar: R$ ${total.toFixed(2)}`;


        
}

// Exemplo de pedidos
const pedido = "cafe:1";
const formaPagamento = 'boleto';
const resultado = calcularValorDaCompra(pedido, formaPagamento);
console.log(resultado);
