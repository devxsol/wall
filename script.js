async function fetchWalletData() {
    const walletAddress = document.getElementById('walletInput').value;
    if (!walletAddress) {
        alert('Введите адрес кошелька!');
        return;
    }

    const SOLANA_RPC_URL = 'https://api.mainnet-beta.solana.com';

    try {
        const response = await fetch(SOLANA_RPC_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                jsonrpc: '2.0',
                id: 1,
                method: 'getBalance',
                params: [walletAddress],
            }),
        });

        const data = await response.json();
        const balance = data.result.value / 10 ** 9; // Переводим в SOL
        document.getElementById('result').innerHTML = `<h3>Баланс: ${balance} SOL</h3>`;
    } catch (error) {
        console.error('Ошибка:', error);
        document.getElementById('result').innerHTML = '<h3>Произошла ошибка. Попробуйте снова.</h3>';
    }
}
