import { useState } from "react";

type FeedProps = {
  setActivePage: React.Dispatch<React.SetStateAction<number>>;
};

const Feed = ({ setActivePage }: FeedProps) => {
  const [activeNav, setActiveNav] = useState(1);
  return (
    <div className="grid w-[100%] bg-white/10 h-59 rounded-[25px]">
      <button
        className={`select-nfts ${activeNav === 1 ? "active" : ""}`}
        onClick={() => {
          setActiveNav(1);
        }}
      >
        NFTs
      </button>
      {activeNav === 1 && (
        <button
          className="absolute group cursor-pointer top-20 left-4 bg-white/15 w-35 h-35 rounded-xl border-[2px] border-white hover:bg-white/20"
          onClick={() => {
            setActivePage(1);
          }}
        >
          <p className="absolute top-[-10px] left-9 text-white text-[90px] font-semibold">
            +
            <p className="absolute text-[10px] text-white/20 top-27 left-[-20px] w-27 font-semibold group-hover:text-white">
              Create your own unique NFT
            </p>
          </p>
        </button>
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
          className="absolute group cursor-pointer top-20 left-4 bg-white/15 w-35 h-35 rounded-xl border-[2px] border-white hover:bg-white/20"
          onClick={() => {
            setActivePage(2);
          }}
        >
          <p className="absolute top-[-10px] left-9 text-white text-[90px] font-semibold">
            +
            <p className="absolute text-[10px] text-white/20 top-27 left-[-20px] w-27 font-semibold group-hover:text-white">
              Create your own Collection of NFTs
            </p>
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
