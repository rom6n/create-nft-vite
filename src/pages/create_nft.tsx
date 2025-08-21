import { useEffect, useState } from "react";
import type { NftCollection } from "../scripts/fetchUserData";
import { fromNano } from "@ton/ton";

type CreateNftPageProps = {
  setActivePage: React.Dispatch<React.SetStateAction<number>>;
  userNftCollections: NftCollection[] | undefined;
  userBalance: number | undefined;
};

const CreateNftPage = ({
  setActivePage,
  userNftCollections,
  userBalance,
}: CreateNftPageProps) => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<string | null>("");
  const [selectOpen, setSelectOpen] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState("Collection");
  const [isTransition, setIsTransition] = useState(false);
  const [isTransitionEnded, setIsTransitionEnded] = useState(false);

  const mintCost = 100000000;

  function wait(millisecond: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, millisecond));
  }

  useEffect(() => {
    (async () => {
      await wait(50);
      setIsTransition(true);
      return;
    })();
    // запускаем анимацию сразу после монтирования
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(URL.createObjectURL(file));
    }
  };

  const setNameFunc = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setName(e.target.value);
  };
  const setDescriptionFunc = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  return (
    <div className="absolute right-[50%] translate-x-[50%] top-0 w-full h-full text-[17px] bg-black">
      <button
        className="absolute w-22 h-8 left-2 top-3 bg-white/20 font-semibold rounded-full cursor-pointer hover:bg-white/25 z-2"
        onClick={() => {
          setActivePage(0);
        }}
      >{`< Back`}</button>
      <div className="absolute top-18 text-5xl font-bold w-full right-[50%] translate-x-[50%] z-1">
        <b
          className="cursor-default"
          style={{
            filter:
              "drop-shadow(0 10px 50px white) drop-shadow(0 10px 80px white)",
          }}
        >
          Create NFT
        </b>
      </div>
      <div className="absolute w-full h-[651px] bottom-0 bg-[#2c2c2c] right-[50%] translate-x-[50%] rounded-t-3xl z-2">
        <div className="absolute w-45 h-45 left-4 top-4 rounded-xl">
          <label className="relative w-full h-full block cursor-pointer">
            {image ? (
              <img
                src={image}
                alt="preview"
                className="w-full h-full object-cover rounded-xl border-2 border-dashed border-white/20"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center rounded-xl border-2 border-dashed border-white/30 bg-white/15 hover:bg-white/20">
                <span className="text-white/50 text-sm">
                  Press to select a photo
                </span>
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>
        <button
          className="absolute flex justify-center w-[43%] h-8 right-[27%] translate-x-[50%] top-4 rounded-xl text-[13px] z-2000 bg-white/20"
          onClick={() => {
            setSelectOpen(!selectOpen);
          }}
        >
          <label
            className={`absolute top-[1px] h-full right-3 ${
              selectOpen ? "rotate-90" : "rotate-270"
            } text-white text-xl cursor-pointer`}
          >
            {"<"}
          </label>
          <label className="absolute flex w-full h-full right-[50%] translate-x-[50%] items-center justify-center font-semibold cursor-pointer">
            {selectedCollection}
          </label>
          {selectOpen && (
            <div className="absolute top-10 w-full max-h-35 overflow-y-auto border border-white/40 bg-white/25 font-semibold rounded-xl">
              <button
                className={`w-full h-9 rounded-t-xl border-b ${
                  0 !== userNftCollections?.length ? "border-none" : "border-b"
                }`}
                onClick={() => {
                  setSelectedCollection("None");
                }}
              >
                None
              </button>
              {userNftCollections?.map((value, idx) => (
                <button
                  className={`w-full h-9 border-white/40 ${
                    idx === userNftCollections.length - 1
                      ? "border-none"
                      : "border-b"
                  }`}
                  onClick={() => {
                    setSelectedCollection(
                      value.metadata.name ? value.metadata.name : "underfined"
                    );
                  }}
                >
                  {value.metadata.name ? value.metadata.name : "underfined"}
                </button>
              ))}
            </div>
          )}
        </button>
        <div className="absolute left-4 top-53">
          <textarea
            value={name}
            placeholder="Name"
            maxLength={35}
            className="bg-transparent w-78 h-15.5 pl-2 pr-2 min-h-15.5 max-h-15.5 rounded-xl border border-white/60 focus:outline-none focus:border-white"
            onChange={setNameFunc}
          />
        </div>

        <div className="absolute left-4 top-72">
          <textarea
            value={description}
            placeholder="Description"
            maxLength={80}
            className="bg-transparent w-85 h-29 pl-2 pr-2 min-h-29 max-h-29 rounded-xl border border-white/60 focus:outline-none focus:border-white"
            onChange={setDescriptionFunc}
          />
        </div>
        <div className="absolute top-130 w-full">
          <span className="absolute top-0 left-6 text-white/20 font-mono text-[13px]">
            {`Cost: ${fromNano(mintCost)} TON`}
          </span>
          <span
            className={`absolute top-4.5 left-6 ${
              userBalance
                ? userBalance - mintCost < 0
                  ? "text-red-500/60"
                  : "text-white/20"
                : "text-white/20"
            } font-mono text-[13px]`}
          >
            Balance after process: {""}
            {`${userBalance ? fromNano(userBalance - mintCost) : "--"} TON`}
          </span>
        </div>
        <button
          className="absolute bottom-5 left-5 w-[90%] h-15 bg-gradient-to-r from-sky-400 to-sky-700 rounded-2xl text-[20px] cursor-pointer hover:from-sky-400 hover:to-sky-600"
          onClick={() => {
            if (name && description && selectedCollection !== "Collection") {
              alert("NFT will deploy soon");
            } else {
              alert("Not all fields filled in");
            }
          }}
        >
          <b>Mint</b>
        </button>
      </div>
      <div
        className={`absolute left-0 top-0 w-full h-full bg-black transition-opacity duration-500 ease-in-out z-[3000] 
          ${isTransition ? "opacity-0" : "opacity-100"} 
          ${isTransitionEnded ? "hidden" : ""}`}
        onTransitionEnd={() => setIsTransitionEnded(true)}
      />
    </div>
  );
};

export default CreateNftPage;
