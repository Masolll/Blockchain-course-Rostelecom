const keccak256 = require("ethereum-cryptography/keccak.js").keccak256;
const secp256k1 = require("ethereum-cryptography/secp256k1").secp256k1;

const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = { 
  "02506c2e8d95ca40980274bc5849bfd950b654c0314a829e7cca0b9ba43491dc9e": 100,
  "031abd74303ee3d585311db3063fc811a39a25694196686548fb38d6b61cb51254": 50,
  "0371d699a862579d14e5a664a6cdb34e6fa59ce0f66efbbfbd24ac0d49e0e780ea": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const transaction = req.body;
  console.log(transaction);
  const { sender, recipient, amount, hexSign } = transaction;

  const payload = {
    sender: sender,
    amount: amount.toString(),
    recipient: recipient
  }
  const payloadHash = keccak256(Uint8Array.from(JSON.stringify(payload)));
  
  const isSigned = secp256k1.verify(hexSign, payloadHash, sender);
  console.log("Is signed: ", isSigned);
  if (isSigned){
    setInitialBalance(sender);
    setInitialBalance(recipient);
  
    if (balances[sender] < amount) {
      res.status(400).send({ message: "Not enough funds!" });
    } else {
      balances[sender] -= amount;
      balances[recipient] += amount;
      res.send({ balance: balances[sender] });
    }
  }
  else {
    res.status(400).send({ message: "Not signed!" });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
