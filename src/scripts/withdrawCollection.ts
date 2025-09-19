import { address } from "@ton/ton";

export async function withdrawCollection(
  collectionAddress: string | undefined,
  withdrawToAddress: string | undefined,
  userID: number | undefined,
  isTestnet: boolean | undefined,
  initData: string
) {
  if (
    !withdrawToAddress ||
    !userID ||
    !collectionAddress ||
    isTestnet === undefined
  ) {
    return "";
  }
  const withdrawTo = address(withdrawToAddress).toString({
    testOnly: isTestnet ? true : false,
  });
  const res = await fetch(
    `https://create-nft-go.onrender.com/api/nft-collection/withdraw/${collectionAddress}?withdraw-to=${withdrawTo}&owner-id=${userID}&is-testnet=${isTestnet}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Init-Data": initData ? initData : "no init data",
      },
    }
  );
  if (res.status !== 200) {
    const resultMsg = await res.text();
    console.log(resultMsg);
    return resultMsg;
  }
  return "OK";
}
