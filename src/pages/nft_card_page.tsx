import { useEffect, useState } from "react";
import type { NftItem } from "../scripts/fetchUserData";
import LoadingIcon from "../assets/icons/loadingIcon";
import { withdrawNftItem } from "../scripts/withdrawNft";
import { useTonConnectUI } from "@tonconnect/ui-react";
import WebApp from "@twa-dev/sdk";
import { fromNano } from "@ton/ton";
import NoImage from "../assets/icons/noImage";

type NftCardPageProps = {
  nftItem: NftItem | undefined;
  userBalance: number | undefined;
  setActivePage: React.Dispatch<React.SetStateAction<number>>;
};

const NftCardPage = ({
  nftItem,
  setActivePage,
  userBalance,
}: NftCardPageProps) => {
  const [hasAttributes, setHasAttributes] = useState<boolean>(false);
  const [isTransition, setIsTransition] = useState(false);
  const [isTransitionEnded, setIsTransitionEnded] = useState(false);
  const [isWithdraw, setIsWithdraw] = useState(false);
  const [isSuccess, setIsSuccess] = useState(0);
  const [error, setError] = useState("");
  const [tonConnectUI] = useTonConnectUI();
  const [connected, setConnected] = useState(tonConnectUI.connected);

  // Подписываемся на изменения статуса
  useEffect(() => {
    const unsubscribe = tonConnectUI.onStatusChange((status) => {
      setConnected(
        status?.account.address !== undefined &&
          status?.account.address !== null
      );
    });
    return () => unsubscribe();
  }, [tonConnectUI]);

  function wait(millisecond: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, millisecond));
  }

  useEffect(() => {
    (async () => {
      await wait(50);
      setIsTransition(true);
      return;
    })();
  }, []);

  useEffect(() => {
    if (nftItem) {
      for (const attribute of nftItem.metadata.attributes) {
        if (attribute.trait_type !== "" && attribute.value !== "") {
          setHasAttributes(true);
        }
      }
    }
  }, []);

  return (
    <div className="absolute w-full h-full min-w-80 max-w-150 top-0 left-0 bg-black">
      <div className="flex w-full p-4">
        <button
          className="bg-[#282828] w-22 h-8 font-semibold rounded-full z-1"
          style={{
            boxShadow: "0 2px 5px #000000D1",
          }}
          onClick={() => {
            setActivePage(0);
          }}
        >
          {"< Back"}
        </button>
      </div>
      <div className="flex w-full">
        {nftItem?.metadata.image ? (
          <div className="w-full">
            <img
              src={nftItem?.metadata.image}
              className="absolute w-full rounded-4xl object-cover blur-3xl"
            />
            <img
              src={nftItem?.metadata.image}
              className="relative w-full rounded-4xl object-cover"
            />
          </div>
        ) : (
          <div className="flex items-center justify-center h-80 w-full bg-white/30 rounded-4xl">
            <div className="w-35">
              <NoImage />
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col w-full justify-center">
        <div className="flex flex-col items-start w-full h-25 mt-3 rounded-4xl bg-white/13">
          <a
            className="flex h-[50%] w-full items-center"
            href={`${
              nftItem?.is_testnet
                ? "https://testnet.tonviewer.com/" + nftItem?.address
                : "https://tonviewer.com/" + nftItem?.address
            }`}
            rel="noopener noreferrer"
            target="_blank"
          >
            <span className="relative text-md mt-0 ml-10 font-semibold text-white/80">
              Tonviewer
            </span>
            <span className="absolute right-10 text-2xl text-white/80">
              {">"}
            </span>
          </a>
          <div className="w-full h-[1px] bg-white/20" />
          <a
            className="flex h-[50%] w-full items-center"
            href={`${
              nftItem?.is_testnet
                ? "https://testnet.tonviewer.com/" + nftItem?.collection_address
                : "https://tonviewer.com/" + nftItem?.collection_address
            }`}
            rel="noopener noreferrer"
            target="_blank"
          >
            <span className="relative text-start w-[60%] truncate overflow-hidden text-md mt-0 ml-10 font-semibold text-white/80">
              {nftItem?.collection_name}
            </span>
            <span className="absolute text-2xl right-10 text-white/80">
              {">"}
            </span>
          </a>
        </div>
        <div className="flex flex-col items-start w-full pb-4 mt-2 rounded-4xl bg-white/13">
          <div className="flex gap-4 w-full">
            <div className="flex flex-col ml-4 mt-4 p-2 pl-4 pr-4 min-w-[44.5%] border rounded-3xl items-start ">
              <span className="text-2xl font-semibold">Index</span>
              <span className="text-xl text-start font-mono">
                {nftItem?.index}
              </span>
            </div>
            <div className="flex flex-col mr-4 mt-4 p-2 pl-4 pr-4 w-full min-w-[20%] border rounded-3xl items-start ">
              <span className="text-2xl font-semibold">Network</span>
              <span className="text-xl text-start font-mono">
                {nftItem?.is_testnet ? "Testnet" : "Mainnet"}
              </span>
            </div>
          </div>
          <div className="flex flex-col ml-4 mt-4 p-2 pl-4 pr-4 max-w-[80%] border rounded-3xl items-start ">
            <span className="text-2xl font-semibold">Name</span>
            <span className="text-xl text-start font-mono max-w-full overflow-x-auto">
              {nftItem?.metadata.name}
            </span>
          </div>
          <div className="flex flex-col ml-4 mt-2.5 p-2 pl-4 pr-4 min-w-[65%] max-w-[80%] border rounded-3xl items-start ">
            <span className="text-2xl font-semibold">Description</span>
            <span className="text-xl text-start font-mono max-w-full overflow-x-auto">
              {nftItem?.metadata.description}
            </span>
          </div>
          <div className="flex flex-col ml-4 mt-4 p-2 pl-4 pr-4 min-w-[57%] max-w-[80%] border rounded-3xl items-start ">
            <span className="text-2xl font-semibold">Collection</span>
            <span className="text-xl text-start font-mono max-w-full overflow-x-auto">
              {nftItem?.collection_name}
            </span>
          </div>
        </div>
        {hasAttributes && (
          <div className="flex flex-col items-start w-full pb-4 mt-2 rounded-4xl bg-white/13">
            {nftItem?.metadata.attributes.map(
              (value) =>
                value.trait_type && (
                  <div className="flex flex-col ml-4 mt-4 p-2 pl-4 min-w-[92%] max-w-[92%] border rounded-3xl items-start ">
                    <span className="text-2xl font-semibold">
                      {value.trait_type}
                    </span>
                    <span className="text-xl text-start font-mono">
                      {value.value}
                    </span>
                  </div>
                )
            )}
          </div>
        )}
        {tonConnectUI.account?.address &&
        WebApp.initDataUnsafe.user?.id &&
        nftItem?.address ? (
          <div className="flex flex-col items-start mb-2 mt-2 w-full min-h-30 rounded-4xl bg-white/13">
            <div className="flex flex-col ml-5 m-2 text-left text-white/30 font-mono text-[13px] ">
              <span>Cost 0.05 TON</span>
              <span>
                Balance after process:{" "}
                {userBalance ? fromNano(userBalance - 50000000) : "--"} TON
              </span>
            </div>
            <button
              className={`flex items-center transition-colors duration-200 justify-center w-full min-h-16 ${
                isSuccess === 1
                  ? "bg-green-600/90"
                  : isSuccess === 2
                  ? "bg-red-600/70"
                  : "bg-sky-600"
              } rounded-4xl`}
              onClick={
                isWithdraw
                  ? () => {}
                  : async () => {
                      setIsWithdraw(true);
                      const result = await withdrawNftItem(
                        nftItem?.address,
                        tonConnectUI.account?.address,
                        WebApp.initDataUnsafe.user?.id,
                        nftItem.is_testnet
                      );
                      setIsWithdraw(false);
                      if (result !== "OK") {
                        setIsSuccess(2);
                        setError(result);
                        return;
                      }
                      setIsSuccess(1);
                    }
              }
            >
              {isWithdraw ? (
                <div className="w-10 h-10">
                  <LoadingIcon />
                </div>
              ) : isSuccess === 1 ? (
                <span className="text-2xl font-semibold">Success</span>
              ) : isSuccess === 2 ? (
                <div className="w-full h-full">
                  <div className="flex w-full h-full items-center justify-center">
                    <span className="text-2xl font-semibold">Failed</span>
                  </div>
                  <span className="text-[10px] max-w-100 font-semibold">
                    {error}
                  </span>
                </div>
              ) : (
                <span className="text-2xl font-semibold">Withdraw</span>
              )}
            </button>
          </div>
        ) : (
          <button
            className={`flex items-center mt-2 mb-2 transition-colors duration-200 justify-center w-full min-h-16 bg-sky-600 rounded-4xl`}
            onClick={() => {
              if (!connected) {
                tonConnectUI.openModal();
              }
            }}
          >
            <span className="text-2xl font-semibold">Connect Wallet</span>
          </button>
        )}
      </div>
      <div
        className={`absolute left-0 top-0 bottom-0 right-0 w-full h-1000 overflow-y-hidden bg-black transition-opacity duration-400 ease-in-out z-[3000] 
          ${isTransition ? "opacity-0" : "opacity-100"} 
          ${isTransitionEnded ? "hidden" : ""}`}
        onTransitionEnd={() => setIsTransitionEnded(true)}
      />
    </div>
  );
};
export default NftCardPage;
