"use client";
import { useState } from "react";
import { createPublicClient, http} from "viem";
import {sepolia} from "viem/chains";
import { ConnectWalletClient } from "./client";
import "viem/window";


const contractAbi = [
    {"inputs":[],"name":"getBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address payable","name":"_to","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"sendEther","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}
] as const;

const contractAddress = "0xe37c43cbb2361a6b2a6002e2317CeB1B96994a46";


export default function SimpleWalletComponent()
{
    const [balanceWallet, setBalance] = useState(BigInt(0));
    const [recipientAddress, setRecipient] = useState("");
    const [transactionAmount, setTransactionAmount] = useState(BigInt(0));

    const setValue = (setter:any) => (evt:any) => setter(evt.target.value);

    async function getBalance()
    {
        const publicClient = createPublicClient({
            chain: sepolia,
            transport: http()
        });
        const currentBalance = await publicClient.readContract({
            address: contractAddress,
            abi: contractAbi,
            functionName: "getBalance"
        });
        setBalance(currentBalance);
        console.log(`Текущий баланс ${currentBalance}`);
    }

    async function sendEther()
    {
        const walletClient = await ConnectWalletClient();
        const [walletClientAddress] = await walletClient.getAddresses();
        console.log(`Адрес инициирующий транзакцию ${walletClientAddress}`);

        walletClient.writeContract({
            address: contractAddress,
            abi: contractAbi,
            functionName: "sendEther",
            args: [recipientAddress as `0x${string}`, transactionAmount],
            account: walletClientAddress
        })

        console.log(`Отправлено ${transactionAmount}`);
    }

    return (
        <div className="card">
            <h1>Contract: Simple Wallet</h1>
            <h1>Address: {contractAddress}</h1>
            <div className="card">
                <div>Balance: {balanceWallet}</div>
                <button onClick={ getBalance } className="px-8 py-2 rounded-md flex flex-row items-center justify-center border border-[#1e2124] hover:border hover:border-indigo-600 shadow-md shadow-indigo-500/10">
                    <h1>Update Balance</h1>
                </button>
            </div>
            <div className="card">
                <div>Withdraw</div>
                <label>Recipient: 
                    <input
                    placeholder="recipient address 0x"
                    value={recipientAddress}
                    onChange={setValue(setRecipient)}
                    ></input>
                </label>
                <br />
                <label>Amount: 
                    <input placeholder="1" value={`${transactionAmount}`} onChange={setValue(setTransactionAmount)} />
                </label>
                <button onClick={ sendEther } className="px-8 py-2 rounded-md flex flex-row items-center justify-center border border-[#1e2124] hover:border hover:border-indigo-600 shadow-md shadow-indigo-500/10">
                    <h1>Send</h1>
                </button>
            </div>
        </div> 
    )
}