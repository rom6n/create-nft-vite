import { useState } from "react";
import type { NftItem } from "../scripts/fetchUserData";

type FeedProps = {
  setActivePage: React.Dispatch<React.SetStateAction<number>>;
  userNftItems: NftItem[] | undefined;
};

const Feed = ({ setActivePage, userNftItems }: FeedProps) => {
  const [activeNav, setActiveNav] = useState(1);

  return (
    <div className="w-[100%] bg-white/8 pb-3 rounded-2xl">
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
              className="relative group cursor-pointer mt-17 bg-white/25 w-[47%] h-60 rounded-2xl border border-white/40 hover:bg-white/35 hover:border-white"
              onClick={() => {
                setActivePage(1);
              }}
            >
              <p className="absolute top-6 right-[50%] translate-x-[50%] text-white text-[90px] font-semibold">
                +
                <span className="absolute text-[10px] text-white/25 top-27 right-[50%] translate-x-[50%] w-27 font-semibold group-hover:text-white">
                  Create your own unique NFT
                </span>
              </p>
            </button>
            {userNftItems?.slice(0, 1).map((value) => (
              <button className="relative cursor-pointer bg-white/10 h-58 rounded-2xl border border-white/40 hover:bg-white/35 hover:border-white">
                <img
                  src={value.metadata.image}
                  className="absolute top-0 right-[50%] translate-x-[50%] rounded-t-2xl"
                />
                <div className="absolute block w-full bottom-10.5 -left-33">
                  <span className="absolute w-full font-semibold">
                    {value.metadata.name}
                  </span>
                  <span className="absolute top-5 w-full text-[10px]">
                    {value.collection_name}
                  </span>
                </div>
                <span
                  className={`absolute bottom-3 right-1 font-semibold ${
                    value.is_testnet ? "text-red-500/60" : "text-sky-500/80"
                  }`}
                >
                  {value.is_testnet ? "Testnet" : "Mainnet"}
                </span>
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 ml-2 mr-2 mt-2 gap-2">
            {userNftItems?.slice(1).map((value) => (
              <button className="relative cursor-pointer bg-white/10 h-58 rounded-2xl border border-white/40 hover:bg-white/35 hover:border-white">
                <img
                  src={value.metadata.image}
                  className="absolute top-0 right-[50%] translate-x-[50%] rounded-t-2xl"
                />
                <div className="absolute block w-full bottom-10.5 -left-33">
                  <span className="absolute w-full font-semibold">
                    {value.metadata.name}
                  </span>
                  <span className="absolute top-5 w-full text-[10px]">
                    {value.collection_name}
                  </span>
                </div>
                <span
                  className={`absolute bottom-3 right-1 font-semibold ${
                    value.is_testnet ? "text-red-500/60" : "text-sky-500/80"
                  }`}
                >
                  {value.is_testnet ? "Testnet" : "Mainnet"}
                </span>
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
        <button
          className="absolute group cursor-pointer top-20 left-4 bg-white/15 w-35 h-35 rounded-xl border-[2px] border-sky-200 hover:bg-white/20"
          onClick={() => {
            setActivePage(2);
          }}
        >
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
