import type { NftCollection } from "../scripts/fetchUserData";

import NoImage from "../assets/icons/noImage";
import { useEffect, useState } from "react";
import { withdrawCollection } from "../scripts/withdrawCollection";
import WebApp from "@twa-dev/sdk";
import { useTonConnectUI } from "@tonconnect/ui-react";
import LoadingIcon from "../assets/icons/loadingIcon";
import { postEvent } from "@telegram-apps/sdk-react";

type CollectionCardPageProps = {
  NftCollection: NftCollection | undefined;
  userBalance: number | undefined;
  setActivePage: React.Dispatch<React.SetStateAction<number>>;
};

const CollectionCardPage = ({
  NftCollection,
  setActivePage,
  userBalance,
}: CollectionCardPageProps) => {
  const [isWithdraw, setIsWithdraw] = useState(false);
  const [tonConnectUI] = useTonConnectUI();
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(0);
  const [connected, setConnected] = useState(tonConnectUI.connected);
  const [isTransition, setIsTransition] = useState(false);
  const [isTransitionEnded, setIsTransitionEnded] = useState(false);

  function wait(millisecond: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, millisecond));
  }

  postEvent("web_app_set_header_color", { color: "#101010" });

  useEffect(() => {
    (async () => {
      await wait(50);
      setIsTransition(true);
      return;
    })();
  }, []);

  useEffect(() => {
    const unsubscribe = tonConnectUI.onStatusChange((status) => {
      setConnected(
        status?.account.address !== undefined &&
          status?.account.address !== null
      );
    });
    return () => unsubscribe();
  }, [tonConnectUI]);

  return (
    <div className="absolute flex flex-col items-center right-[50%] translate-x-[50%] w-full h-full top-0  bg-[#101010]">
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
      <div className="flex items-center justify-center w-[95%] border border-white/40 h-27 rounded-2xl bg-white/20">
        {NftCollection?.metadata.cover_image ? (
          <div className="w-full h-full">
            <img
              src={NftCollection?.metadata.cover_image}
              className="absolute w-[95%] h-27 rounded-2xl object-cover blur-3xl"
            />
            <img
              src={NftCollection?.metadata.cover_image}
              className="relative w-full h-full rounded-2xl object-cover"
            />
          </div>
        ) : (
          <div className="w-20">
            <NoImage />
          </div>
        )}
      </div>
      <div className="flex items-center justify-start pl-4 mt-2 w-full h-20 bg-white/0">
        <div className="flex items-center justify-center w-20 h-20 rounded-lg border border-white/40 bg-white/20">
          {NftCollection?.metadata.image ? (
            <img
              src={NftCollection?.metadata.image}
              className="w-full h-full rounded-lg object-cover"
            />
          ) : (
            <div className="w-10">
              <NoImage />
            </div>
          )}
        </div>
        <div className="flex flex-col items-start  text-start w-[55%] h-full">
          <span className="w-[100%] truncate ml-3 mt-1 text-lg font-semibold">
            {NftCollection?.metadata.name}
          </span>
          <span className="w-full truncate ml-3 mt text-sm font text-white/30">
            by: {NftCollection?.metadata.marketplace}
          </span>
        </div>
      </div>
      <div className="flex flex-wrap gap-1 w-[93%] mt-2 justify-start">
        {NftCollection?.metadata.social_links?.map((value) => {
          if (!value.split("/")[3]) {
            return;
          }
          return (
            <a
              href={value}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center pl-2.5 pr-2.5 h-7 rounded-full cursor-pointer bg-amber-800"
            >
              <span className="text-[12px]">{value.split("/")[2]}</span>
            </a>
          );
        })}
      </div>
      <div className="w-full h-25 pl-4 pr-4 mt-7 break-words line-clamp-4 text-balance">
        {NftCollection?.metadata.description && (
          <span className="text-3xl font-serif">
            "{NftCollection?.metadata.description}"
          </span>
        )}
      </div>
      <div className="absolute w-full flex items-center justify-center bottom-3.5">
        {NftCollection &&
        NftCollection.is_testnet &&
        NftCollection.address &&
        tonConnectUI.account?.address ? (
          <button
            className={`flex w-[93%] min-h-16 text-2xl font-semibold items-center justify-center transition-colors rounded-full duration-200 ${
              isSuccess === 1
                ? "bg-green-600/90"
                : isSuccess === 2 || (userBalance && userBalance < 10000000)
                ? "bg-red-600/70"
                : "bg-sky-600"
            }`}
            onClick={async () => {
              if (userBalance && userBalance >= 10000000 && !isWithdraw) {
                setIsWithdraw(true);
                setIsSuccess(0);
                const result = await withdrawCollection(
                  NftCollection.address,
                  tonConnectUI.account?.address,
                  WebApp.initDataUnsafe.user?.id,
                  NftCollection?.is_testnet
                );
                setIsWithdraw(false);
                if (result !== "OK") {
                  setIsSuccess(2);
                  setError(result);
                  return;
                }
                setIsSuccess(1);
              }
            }}
          >
            {isWithdraw ? (
              <div className="w-10 h-10">
                <LoadingIcon />
              </div>
            ) : isSuccess === 1 ? (
              <span>Success</span>
            ) : isSuccess === 2 ? (
              <div className="flex flex-col items-center justify-center w-full h-full">
                <div>
                  <span className="text-2xl font-semibold">Failed</span>
                </div>
                <span className="text-[10px] font-semibold">{error}</span>
              </div>
            ) : userBalance && userBalance < 10000000 ? (
              <span>Not enough TON</span>
            ) : (
              <span>Withdraw</span>
            )}
          </button>
        ) : (
          <button
            className={`flex items-center mt-2 transition-colors duration-200 justify-center w-[93%] min-h-16 bg-sky-600 rounded-4xl`}
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

export default CollectionCardPage;
