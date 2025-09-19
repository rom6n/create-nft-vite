import { useRawInitData } from "@telegram-apps/sdk-react";
import { address } from "@ton/ton";

export async function withdrawUserTon(
  withdrawToAddress: string | undefined,
  isTestnet: boolean,
  amount: bigint,
  userId: number | undefined
) {
  const initData = useRawInitData();

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
