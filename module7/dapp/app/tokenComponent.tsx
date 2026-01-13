"use client";
import { getContract, Address, createPublicClient, http, erc721Abi } from "viem";
import { sepolia } from "viem/chains";
import { contractAbi } from "./abi";
import { ConnectPublicClient, ConnectWalletClient } from "./client";
import { useState } from "react";

async function ReadContract(functionName: string, args: any[] = [])
{
    const publicClient = createPublicClient({
        chain: sepolia,
        transport: http()
    });
    return await publicClient.readContract({
        address: "0xaE2A37b60B7Af7fCca8167dF617F82A34f22719C",
        abi: contractAbi,
        functionName: functionName as never,
        args
    })
}

export default function TokenComponent() {
  const [contractAddress, setContractAddress] = useState("");
  const [tokenId, setTokenId] = useState(0);

  const setValue = (setter:any) => (evt:any) => setter(evt.target.value);

  async function buttonClick() {
    const checkedAddress = contractAddress as Address;
    
    const symbol = await ReadContract("symbol");
    const name = await ReadContract("name");
    const token_id = BigInt(tokenId);
    const owner = await ReadContract("ownerOf", [token_id]);

    alert(`Symbol: ${symbol}\nName: ${name}\nOwner of token_id = ${token_id} is ${owner}`); 
  }
    
    return (
      <div className="card">
        <label>
        Address: 
        <input
          placeholder="Smart Contract Instance"
          value={contractAddress}
          onChange={setValue(setContractAddress)}
        ></input>
        </label>
        <br />

        <label>Token Id: 
        <input placeholder="1" value={tokenId} onChange={setValue(setTokenId)} />
        </label>
          <button
            className="px-8 py-2 rounded-md flex flex-row items-center justify-center border border-[#1e2124] hover:border hover:border-indigo-600 shadow-md shadow-indigo-500/10"
            onClick={ buttonClick }>
            <h1 className="text-center">Token Info</h1>
          </button>
      </div>
    );
}