export async function withdrawNftItem(
  nftItemAddress: string,
  withdrawToAddress: string | undefined,
  userID: number | undefined,
  isTestnet: boolean
) {
  const res = await fetch(
    `https://create-nft-go.onrender.com/api/nft-item/withdraw/${nftItemAddress}?withdraw-to=${withdrawToAddress}&owner-id=${userID}&is-testnet=${isTestnet}`,
    {
      method: "GET",
    }
  );
  if (res.status !== 200) {
    const resultMsg = await res.text();
    console.log(resultMsg);
    return resultMsg;
  }
  return "OK";
}
