let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
let total = parseFloat(localStorage.getItem('total')) || 0;

function adicionarAoCarrinho(produto, preco) {
    carrinho.push({ produto, preco });
    total += preco;
    salvarCarrinho();
    atualizarCarrinho();
}

function removerDoCarrinho(index) {
    total -= carrinho[index].preco;
    carrinho.splice(index, 1);
    salvarCarrinho();
    atualizarCarrinho();
}

function atualizarCarrinho() {
    const listaCarrinho = document.getElementById('lista-carrinho');
    const totalEl = document.getElementById('total');

    listaCarrinho.innerHTML = '';

    carrinho.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${item.produto} - R$ ${item.preco.toFixed(2)} 
        <button onclick="removerDoCarrinho(${index})">Remover</button>`;
        listaCarrinho.appendChild(li);
    });

    if (carrinho.length === 0) {
        listaCarrinho.innerHTML = '<li>Seu carrinho está vazio.</li>';
    }

    totalEl.textContent = `Total: R$ ${total.toFixed(2)}`;
}

function finalizarCompra() {
    if (carrinho.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }

    let mensagem = "Olá, gostaria de finalizar a compra:\n\n";
    carrinho.forEach(item => {
        mensagem += `- ${item.produto}: R$ ${item.preco.toFixed(2)}\n`;
    });
    mensagem += `\nTotal: R$ ${total.toFixed(2)}`;

    const url = `https://wa.me/5511916489808?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');

    carrinho = [];
    total = 0;
    salvarCarrinho();
    atualizarCarrinho();
}

function salvarCarrinho() {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    localStorage.setItem('total', total.toString());
}

// Atualizar o carrinho assim que carregar a página
document.addEventListener('DOMContentLoaded', atualizarCarrinho);
