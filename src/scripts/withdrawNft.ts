import { address } from "@ton/ton";

export async function withdrawNftItem(
  nftItemAddress: string,
  withdrawToAddress: string | undefined,
  userID: number | undefined,
  isTestnet: boolean
) {
  if (!withdrawToAddress || !userID) {
    return "";
  }
  const withdrawTo = address(withdrawToAddress).toString({
    testOnly: isTestnet ? true : false,
  });
  const res = await fetch(
    `https://create-nft-go.onrender.com/api/nft-item/withdraw/${nftItemAddress}?withdraw-to=${withdrawTo}&owner-id=${userID}&is-testnet=${isTestnet}`,
    {
      method: "POST",
    }
  );
  if (res.status !== 200) {
    const resultMsg = await res.text();
    console.log(resultMsg);
    return resultMsg;
  }
  return "OK";
}
