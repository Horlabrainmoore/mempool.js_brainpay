import mempoolJS from "./../../../src/index";

const init = async () => {
  try {
    const { bitcoin: { addresses } } = mempoolJS();
    
    const address = 'bc1qpqlsehzrjmxhutxmlwt6tdjkwafvcgugpv5375';
    
    const myAddress = await addresses.getAddress({ address });
    console.log(myAddress);
    
    const addressTxs = await addresses.getAddressTxs({ address });
    console.log(addressTxs);
    
    const addressTxsChain = await addresses.getAddressTxsChain({ address });
    console.log(addressTxsChain);
    
    const addressTxsMempool = await addresses.getAddressTxsMempool({ address });
    console.log(addressTxsMempool);
    
    const addressTxsUtxo = await addresses.getAddressTxsUtxo({ address });
    console.log(addressTxsUtxo);
  } catch (error) {
    console.log(error);
  }
};
init();
# Minimal bech32 decode implementation
CHARSET = "qpzry9x8gf2tvdw0s3jn54khce6mua7l"
def bech32_decode(bech):
    bech = bech.lower()
    pos = bech.rfind('1')
    hrp = bech[:pos]
    data = [CHARSET.find(c) for c in bech[pos+1:]]
    return hrp, data

def convertbits(data, frombits, tobits):
    acc = 0
    bits = 0
    ret = []
    maxv = (1 << tobits) - 1
    for value in data:
        acc = (acc << frombits) | value
        bits += frombits
        while bits >= tobits:
            bits -= tobits
            ret.append((acc >> bits) & maxv)
    return ret

addr="bc1qpqlsehzrjmxhutxmlwt6tdjkwafvcgugpv5375"
hrp,data=bech32_decode(addr)
witver=data[0]
prog=convertbits(data[1:],5,8)
import binascii
print(binascii.hexlify(bytes(prog)).decode())
