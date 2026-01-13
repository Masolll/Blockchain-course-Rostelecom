import { ethers } from "ethers";
import './App.css'
import TokenInfo from "./TokenInfo";

const providerUrl = 'https://ethereum-sepolia-rpc.publicnode.com';
const provider = new ethers.JsonRpcProvider(providerUrl);
const network = await provider.getNetwork();

function App() {
  console.log(network);
  return (
      <>
        <TokenInfo provider = {provider}/>
      </>
  )
}
export default App
