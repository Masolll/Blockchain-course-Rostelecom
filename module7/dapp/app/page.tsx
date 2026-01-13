// import TokenComponent from "./tokenComponent";
import TokenComponent from "./tokenComponent";
import TransactionComponent from "./transactionComponent";
import WalletComponent from "./walletComponent";
import SimpleWalletComponent from "./simpleWalletComponent";

export default function Home() {
    return (
        <main className="min-h-screen">
                <div className="flex flex-col items-center justify-center h-screen ">
                    <WalletComponent />  
                    {/* <TransactionComponent />  */}
                    <TokenComponent />        
                    <SimpleWalletComponent />    
                </div>
        </main>
    );
}