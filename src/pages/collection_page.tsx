import type { NftCollection } from "../scripts/fetchUserData";

import NoImage from "../component/noImage";

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
  console.log(userBalance); //  to delete warnings
  return (
    <div className="absolute flex flex-col items-center w-full h-full min-w-80 max-w-150 top-0 left-0 bg-[#101010]">
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
      <div className="flex items-center justify-center w-[95%] h-45 rounded-2xl bg-white/20">
        {NftCollection?.metadata.cover_image ? (
          <img
            src={NftCollection?.metadata.cover_image}
            className="w-full object-cover"
          />
        ) : (
          <div className="w-20">
            <NoImage />
          </div>
        )}
      </div>
      <div className="flex items-center justify-start pl-4 mt-2 w-full h-20 bg-white/0">
        <div className="flex items-center justify-center w-20 h-20 rounded-lg bg-white/20">
          {NftCollection?.metadata.image ? (
            <img src={NftCollection?.metadata.image} />
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
              className="flex items-center justify-center pl-2.5 pr-2.5 h-7 rounded-full cursor-pointer bg-amber-800"
            >
              <span className="text-[12px]">{value.split("/")[2]}</span>
            </a>
          );
        })}
      </div>
      {NftCollection?.metadata.description && (
        <div className="w-full pl-4 pr-4 mt-7 break-words line-clamp-4 text-balance">
          <span className="text-3xl font-serif">
            "{NftCollection?.metadata.description}"
          </span>
        </div>
      )}
    </div>
  );
};

export default CollectionCardPage;
