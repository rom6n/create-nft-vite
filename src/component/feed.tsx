import { useState } from "react";
import type { NftCollection, NftItem } from "../scripts/fetchUserData";
import CreateNewIcon from "../assets/icons/createNew";

type FeedProps = {
  setActivePage: React.Dispatch<React.SetStateAction<number>>;
  userNftItems: NftItem[] | undefined;
  userNftCollections: NftCollection[] | undefined;
  setSelectedNft: React.Dispatch<React.SetStateAction<NftItem | undefined>>;
  setSelectedCollection: React.Dispatch<
    React.SetStateAction<NftCollection | undefined>
  >;
};

const Feed = ({
  setActivePage,
  userNftItems,
  setSelectedNft,
  userNftCollections,
  setSelectedCollection,
}: FeedProps) => {
  const [activeNav, setActiveNav] = useState(1);

  return (
    <div className="w-[100%] min-w-80 min-h-80 bg-white/8 pb-3 rounded-2xl">
      <button
        className={`select-nfts ${activeNav === 1 ? "active" : ""}`}
        onClick={() => {
          setActiveNav(1);
        }}
      >
        NFTs
      </button>
      {activeNav === 1 && (
        <div className="min-h-120">
          <div className="flex mt-17 w-full h-full gap-2 px-2">
            <button
              className="relative flex group cursor-pointer bg-white/25 w-full max-w-[50%] h-52 rounded-2xl border border-white/40"
              onClick={() => {
                setActivePage(1);
              }}
            >
              <div className="absolute flex flex-col items-center justify-center w-full h-full text-white text-[90px]">
                <div className="w-18 h-18">
                  <CreateNewIcon />
                </div>
                <span className="text-[10px] text-white/25 w-20 font-medium">
                  Create your own unique NFT
                </span>
              </div>
            </button>
            {userNftItems?.slice(0, 1).map((value) => (
              <button
                className="relative flex flex-col justify-between bg-white/10 h-52 w-full rounded-2xl border border-white/40 overflow-hidden cursor-pointer"
                onClick={() => {
                  setSelectedNft(value);
                  setActivePage(2);
                }}
              >
                {value.metadata.image ? (
                  <img
                    src={value.metadata.image}
                    className="w-full max-h-40 min-h-40 object-cover rounded-t-2xl"
                  />
                ) : (
                  <div />
                )}
                <div className="absolute flex bg-[#343434] pl-2 pr-2 h-5 right-1 bottom-12.5 justify-center items-center rounded-full">
                  <span className="text-[15px] font-mono">
                    {"# " + value.index}
                  </span>
                </div>

                <div className="flex flex-col mb-2 text-start items-start justify-end px-2">
                  <span className="font-semibold w-[70%] text-sm truncate">
                    {value.metadata.name}
                  </span>
                  <span className="text-[10px] w-[60%] text-gray-400 truncate">
                    {value.collection_name}
                  </span>
                </div>

                <div
                  className={`absolute flex w-13 h-5 justify-center items-center rounded-full ${
                    value.is_testnet ? "bg-red-500/70" : "bg-sky-500/70"
                  } bottom-1 right-1`}
                >
                  <span className="text-[10px] font-semibold text-white">
                    {value.is_testnet ? "Testnet" : "Mainnet"}
                  </span>
                </div>
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 w-full px-2 mt-2 gap-2">
            {userNftItems?.slice(1).map((value) => (
              <button
                className="relative flex flex-col justify-between bg-white/10 h-52 rounded-2xl border border-white/40 overflow-hidden cursor-pointer"
                onClick={() => {
                  setSelectedNft(value);
                  setActivePage(2);
                }}
              >
                {value.metadata.image ? (
                  <img
                    src={value.metadata.image}
                    className="w-full max-h-40 min-h-40 object-cover rounded-t-2xl"
                  />
                ) : (
                  <div className="w-full h-40 border-b border-white/40" />
                )}

                <div className="absolute flex bg-[#343434] pl-2 pr-2 h-5 right-1 bottom-12.5 justify-center items-center rounded-full">
                  <span className="text-[15px] font-mono">
                    {"# " + value.index}
                  </span>
                </div>

                <div className="flex flex-col mb-2 text-start items-start justify-end px-2">
                  <span className="font-semibold w-[70%] text-sm truncate">
                    {value.metadata.name}
                  </span>
                  <span className="text-[10px] w-[60%] text-gray-400 truncate">
                    {value.collection_name}
                  </span>
                </div>

                <div
                  className={`absolute flex w-13 h-5 justify-center items-center rounded-full ${
                    value.is_testnet ? "bg-red-500/70" : "bg-sky-500/70"
                  } bottom-1 right-1`}
                >
                  <span className="text-[10px] font-semibold text-white">
                    {value.is_testnet ? "Testnet" : "Mainnet"}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
      <button
        className={`select-nft-collections ${activeNav === 2 ? "active" : ""}`}
        onClick={() => {
          setActiveNav(2);
        }}
      >
        Collections
      </button>
      {activeNav === 2 && (
        <div className="flex flex-col gap-2 w-full items-center">
          <button
            className="flex items-center w-[94%] h-25 mt-17 group cursor-pointer bg-white/25 rounded-xl border-[1px] border-white/50"
            onClick={() => {
              setActivePage(3);
            }}
          >
            <div className="flex w-[33%] h-full items-center justify-center rounded-l-xl border-r-[1px] border-white/50">
              <span className="text-6xl mb-2 font-semibold">+</span>
            </div>
            <div className="flex flex-col items-start w-[67%] h-full ">
              <span className="mt-1.5 ml-2 font-semibold text-lg">
                Create new Collection
              </span>
              <span className="ml-2 mr-2 text-left text-[9px] font-semibold text-white/30">
                You can create your own fully decentralized NFT Collection with
                no commission
              </span>
              <div className="flex ml-2 mt-2.5 gap-1 w-full">
                <div className="flex min-w-13 h-5 pl-1.5 pr-1.5 justify-center items-center bg-black/60 rounded-full text-[10px] font-semibold">
                  0 items
                </div>
                <div className="flex min-w-13 h-5 pl-1.5 pr-1.5 justify-center items-center bg-blue-500/60 rounded-full text-[10px] font-semibold">
                  Decentralized
                </div>
                <div className="flex min-w-13 h-5 pl-1.5 pr-1.5 justify-center items-center bg-orange-500/60 rounded-full text-[10px] font-semibold">
                  Devnet
                </div>
              </div>
            </div>
          </button>
          {userNftCollections?.map((value) => (
            <button
              className="flex items-center w-[94%] h-25 group cursor-pointer bg-white/13 rounded-xl border-[1px] border-white/50"
              onClick={() => {
                setSelectedCollection(value);
                setActivePage(4);
              }}
            >
              <div className="flex w-[33%] h-full items-center justify-center rounded-l-xl border-r-[1px] border-white/50">
                {value.metadata.image && (
                  <img
                    src={value.metadata.image}
                    className="h-full w-full object-cover rounded-l-xl"
                  />
                )}
              </div>
              <div className="flex pt-1.5 flex-col justify-around items-start w-[67%] h-full overflow-clip">
                <div className="flex flex-col min-h-[50%] max-h-[60%] items-start">
                  <span className="ml-2 font-semibold text-lg truncate">
                    {value.metadata.name}
                  </span>
                  <span className="ml-2 mr-2 text-left text-[9px] font-semibold text-white/30">
                    {value.metadata.description
                      ? value.metadata.description.slice(0, 70)
                      : ""}
                  </span>
                </div>
                <div className="flex pb-1.5 items-end ml-2 w-full h-[40%] gap-1">
                  <div className="flex min-w-13 h-5 pl-1.5 pr-1.5 justify-center items-center bg-black/60 rounded-full text-[10px] font-semibold">
                    {value.next_item_index ? value.next_item_index - 1 : "--"}{" "}
                    items
                  </div>
                  <div className="flex min-w-13 h-5 pl-1.5 pr-1.5 justify-center items-center bg-blue-500/60 rounded-full text-[10px] font-semibold">
                    {value.metadata.marketplace
                      ? value.metadata.marketplace === "create-nft-tma"
                        ? "Decentralized"
                        : "Centralized"
                      : "Centralized"}
                  </div>
                  <div
                    className={`flex min-w-13 h-5 pl-1.5 pr-1.5 justify-center items-center ${
                      value.is_testnet ? "bg-red-500/70" : "bg-sky-600"
                    } rounded-full text-[10px] font-semibold`}
                  >
                    {value.is_testnet ? "Testnet" : "Mainnet"}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
      <div className="absolute w-[100%] bg-[#2d2c2c] h-0.5 top-[55px]" />
      {activeNav === 1 ? (
        <div className="absolute w-16 h-[3px] rounded-full right-[77%] translate-x-[50%] bg-white top-[54.5px] transition-[right] duration-150 ease-out" />
      ) : (
        <div className="absolute w-16 h-[3px] rounded-full right-[30%] translate-x-[50%] bg-white top-[54.5px] transition-[right] duration-150 ease-out" />
      )}
    </div>
  );
};

export default Feed;
