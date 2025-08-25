import { useState } from "react";
import type { NftItem } from "../scripts/fetchUserData";

type FeedProps = {
  setActivePage: React.Dispatch<React.SetStateAction<number>>;
  userNftItems: NftItem[] | undefined;
  setSelectedNft: React.Dispatch<React.SetStateAction<NftItem | undefined>>;
};

const Feed = ({ setActivePage, userNftItems, setSelectedNft }: FeedProps) => {
  const [activeNav, setActiveNav] = useState(1);

  return (
    <div className="w-[100%] min-w-80 min-h-125 bg-white/8 pb-3 rounded-2xl">
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
          <div className="flex ml-2 w-full h-full gap-2">
            <button
              className="relative group cursor-pointer mt-17 bg-white/25 w-[47%] h-52 rounded-2xl border border-white/40 hover:bg-white/35 hover:border-white"
              onClick={() => {
                setActivePage(1);
              }}
            >
              <p className="absolute top-6 right-[50%] translate-x-[50%] text-white text-[90px] font-semibold">
                +
                <span className="absolute text-[10px] text-white/25 top-27 right-[50%] translate-x-[50%] w-20 font-semibold group-hover:text-white">
                  Create your own unique NFT
                </span>
              </p>
            </button>
            {userNftItems?.slice(0, 1).map((value) => (
              <button
                className="relative flex flex-col mt-17 justify-between bg-white/10 h-52 w-[47%] rounded-2xl border border-white/40 overflow-hidden"
                onClick={() => {
                  setSelectedNft(value);
                  setActivePage(2);
                }}
              >
                <img
                  src={value.metadata.image}
                  className="w-full max-h-40 min-h-40 object-cover rounded-t-2xl"
                />
                <div className="absolute flex bg-[#343434] pl-2 pr-2 h-5 right-1 bottom-12.5 justify-center items-center rounded-full">
                  <span className="text-[15px] font-mono">
                    {"# " + value.index}
                  </span>
                </div>

                <div className="flex flex-col mb-2 items-start justify-end px-2">
                  <span className="font-semibold text-sm truncate">
                    {value.metadata.name}
                  </span>
                  <span className="text-[10px] text-gray-400 truncate">
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
          <div className="grid grid-cols-2 ml-2 mr-2 mt-2 gap-2">
            {userNftItems?.slice(1).map((value) => (
              <button
                className="relative flex flex-col justify-between bg-white/10 h-52 rounded-2xl border border-white/40 overflow-hidden"
                onClick={() => {
                  setSelectedNft(value);
                  setActivePage(2);
                }}
              >
                <img
                  src={value.metadata.image}
                  className="w-full max-h-40 min-h-40 object-cover rounded-t-2xl"
                />

                <div className="absolute flex bg-[#343434] pl-2 pr-2 h-5 right-1 bottom-12.5 justify-center items-center rounded-full">
                  <span className="text-[15px] font-mono">
                    {"# " + value.index}
                  </span>
                </div>

                <div className="flex flex-col mb-2 items-start justify-end px-2">
                  <span className="font-semibold text-sm truncate">
                    {value.metadata.name}
                  </span>
                  <span className="text-[10px] text-gray-400 truncate">
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
        disabled={true}
        className={`select-nft-collections ${activeNav === 2 ? "active" : ""}`}
        onClick={() => {
          //setActiveNav(2);
        }}
      >
        Collections
      </button>
      {activeNav === 2 && (
        <button className="absolute group cursor-pointer top-20 left-4 bg-white/15 w-35 h-35 rounded-xl border-[2px] border-sky-200 hover:bg-white/20">
          <p className="absolute top-[-10px] right-[50%] translate-x-[50%] text-white text-[90px] font-semibold">
            +
            <span className="absolute text-[10px] text-white/20 top-27 right-[50%] translate-x-[50%] w-27 font-semibold group-hover:text-white">
              Create your own Collection of NFTs
            </span>
          </p>
        </button>
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
