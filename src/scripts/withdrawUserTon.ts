import { address } from "@ton/ton";

export async function withdrawUserTon(
  withdrawToAddress: string | undefined,
  isTestnet: boolean,
  amount: bigint,
  userId: number | undefined
) {
  if (!withdrawToAddress || !userId) {
    return "";
  }

  const ping = await fetch(`https://create-nft-go.onrender.com/ping`, {
    method: "GET",
  });

  if (ping.status !== 200) {
    return "Failed server pinging";
  }

  const withdrawTo = address(withdrawToAddress);
  const res = await fetch(
    `https://create-nft-go.onrender.com/api/user/withdraw/${userId}?withdraw-to=${withdrawTo}&amount=${amount}&is-testnet=${isTestnet}`,
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
