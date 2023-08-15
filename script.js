import Web3 from 'web3';

// Connect to Web3 provider (such as MetaMask)
window.addEventListener('load', async () => {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable(); // Request user permission to access their accounts
    } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
    } else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask.');
    }
});

// Smart contract information
const contractAddress = 'YOUR_CONTRACT_ADDRESS_HERE';
const contractAbi = [...]; // Contract ABI

// Function to handle the minting of tokens
async function mintTokens() {
    const recipient = document.getElementById('recipientInput').value;
    const amount = document.getElementById('amountInput').value;

    const contract = new window.web3.eth.Contract(contractAbi, contractAddress);

    try {
        const accounts = await window.web3.eth.getAccounts();
        const tx = await contract.methods.mintTokens(recipient, amount).send({ from: accounts[0] });

        console.log('Transaction successful:', tx.transactionHash);
    } catch (error) {
        console.error('Error minting tokens:', error);
    }
}

// Event listener for "Mint Tokens" button
document.getElementById('mintButton').addEventListener('click', async () => {
    await mintTokens();
});
