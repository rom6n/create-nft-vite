import type { NftItem } from "../scripts/fetchUserData";

type NftCardPageProps = {
  connected: boolean;
  nftItem: NftItem | undefined;
  setNftCard: React.Dispatch<React.SetStateAction<boolean>>;
};

const NftCardPage = ({ connected, nftItem, setNftCard }: NftCardPageProps) => {
  return (
    <div className="absolute w-full h-full top-0 left-0 bg-black">
      <button
        className="absolute top-2 left-2 bg-white/13 w-20 h-6 rounded-full"
        onClick={() => {
          setNftCard(false);
        }}
      >
        Back
      </button>
      <div className="flex flex-col"></div>
    </div>
  );
};
export default NftCardPage;
