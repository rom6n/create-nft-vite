import { useEffect, useState } from "react";
import type { NftCollection, User } from "../scripts/fetchUserData";
import { fromNano } from "@ton/ton";
import { mintNft } from "../scripts/mintNft";
import { type Attribute } from "../scripts/mintNft";
import LoadingIcon from "../assets/loadingIcon";

type CreateNftPageProps = {
  setActivePage: React.Dispatch<React.SetStateAction<number>>;
  userNftCollections: NftCollection[] | undefined;
  user: User | undefined;
};

const MAX_FILE_SIZE = 99 * 1024; // 99 KB

const CreateNftPage = ({
  setActivePage,
  userNftCollections,
  user,
}: CreateNftPageProps) => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [fwdMsg, setFwdMsg] = useState<string>("");
  const [selectOpen, setSelectOpen] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState("Collection");
  const [selectedCollectionAddress, setSelectedCollectionAddress] = useState<
    string | undefined
  >();
  const [isTransition, setIsTransition] = useState(false);
  const [isTransitionEnded, setIsTransitionEnded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [imageByte, setImageByte] = useState<File>();
  const [isSuccess, setIsSuccess] = useState(0);
  const [isMinting, setIsMinting] = useState(false);
  const [error, setError] = useState("");
  const [attributeInputs, setAttributeInputs] = useState<Attribute[]>([
    {
      trait_type: "",
      value: "",
    },
  ]);

  const addAttributeInput = () => {
    if (attributeInputs.length >= 20) {
      return;
    }
    setAttributeInputs([...attributeInputs, { trait_type: "", value: "" }]);
  };
  const removeAttributeInput = () => {
    if (attributeInputs.length === 1) {
      return;
    }
    setAttributeInputs(attributeInputs.slice(0, attributeInputs.length - 1));
  };

  const updateAttributeInput = (index: number, value: string) => {
    const newInputs = [...attributeInputs];
    newInputs[index].trait_type = value;
    setAttributeInputs(newInputs);
  };

  const updateValueInput = (index: number, value: string) => {
    const newInputs = [...attributeInputs];
    newInputs[index].value = value;
    setAttributeInputs(newInputs);
  };

  const mintCost = 85000000;

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

  const handleFwdMsgChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const msg = e.target.value;
    setFwdMsg(msg);
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > MAX_FILE_SIZE) {
        setIsError(true);
        setError("max image size is 100KB");
        setImage(URL.createObjectURL(file));
        console.log("image size is more than limit");
        return;
      }
      setIsError(false);
      setImageByte(file);
      console.log("image size is OK");
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
    <div className="absolute right-[50%] translate-x-[50%] min-w-94 top-0 w-full h-full text-[17px] bg-black">
      <button
        className="absolute left-4 top-4 w-22 h-8 bg-[#414141] font-semibold rounded-full cursor-pointer hover:bg-white/25 z-2000"
        style={{
          boxShadow: "0 2px 8px #FFFFFF42",
        }}
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
      <div className="absolute block w-full pb-4 top-37 bg-[#2c2c2c] right-[50%] translate-x-[50%] rounded-t-3xl z-2">
        <div className="w-45 h-45 left-4 top-4 rounded-xl">
          <label className="relative w-full h-full mt-4 ml-4 block cursor-pointer">
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
          className="absolute flex justify-center w-[43%] h-8 right-[25%] translate-x-[50%] top-4 rounded-xl text-[13px] z-2000 bg-white/20"
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
          <span className="absolute flex w-[80%] h-full pl-4 pr-4 truncate right-[50%] translate-x-[40%] items-center justify-center font-semibold cursor-pointer overflow-hidden">
            {selectedCollection.slice(0, 15)}
            {selectedCollection.length > 15 && "..."}
          </span>
          {selectOpen && (
            <div className="absolute top-10 w-full max-h-35 overflow-y-auto border border-white/40 bg-white/25 font-semibold rounded-xl overflow-clip">
              <button
                className={`w-full h-9 rounded-t-xl border-white/40 ${
                  userNftCollections
                    ? userNftCollections.length === 0
                      ? "border-none"
                      : "border-b"
                    : "border-none"
                }`}
                onClick={() => {
                  setSelectedCollection("None");
                }}
              >
                None
              </button>
              {userNftCollections?.map((value, idx) => (
                <button
                  className={`w-full h-9 truncate border-white/40 ${
                    idx === userNftCollections.length - 1
                      ? "border-none"
                      : "border-b"
                  }`}
                  onClick={() => {
                    setSelectedCollection(
                      value.metadata.name ? value.metadata.name : "underfined"
                    );
                    setSelectedCollectionAddress(value.address);
                  }}
                >
                  <span className="pl-2 pr-2">
                    {value.metadata.name ? value.metadata.name : "underfined"}
                  </span>
                </button>
              ))}
            </div>
          )}
        </button>
        <div className="flex ml-4 mt-5 top-53">
          <textarea
            value={name}
            placeholder="Name "
            maxLength={35}
            className="bg-transparent w-78 h-15.5 pl-2 pr-2 min-h-15.5 max-h-15.5 rounded-xl border border-white/60 focus:outline-none focus:border-white"
            onChange={setNameFunc}
          />
        </div>

        <div className="flex ml-4 mt-3">
          <textarea
            value={description}
            placeholder="Description "
            maxLength={80}
            className="bg-transparent w-85 h-29 pl-2 pr-2 min-h-29 max-h-29 rounded-xl border border-white/60 focus:outline-none focus:border-white"
            onChange={setDescriptionFunc}
          />
        </div>
        <div className="relative flex flex-col space-y-2 ml-4 mt-7 rounded-xl w-85">
          {attributeInputs.map((attribute, idx) => (
            <div className="flex gap-2 focus:outline-none">
              <textarea
                key={idx}
                value={attribute.trait_type}
                maxLength={25}
                onChange={(e) => updateAttributeInput(idx, e.target.value)}
                className="p-1.5 border border-white/60 rounded-lg max-h-10 min-h-10 w-[51%] focus:outline-none focus:border-white"
                placeholder={`Attribute `}
              />
              <textarea
                key={idx}
                value={attribute.value}
                maxLength={25}
                onChange={(e) => updateValueInput(idx, e.target.value)}
                className="p-1.5 border border-white/60 rounded-lg max-h-10 min-h-10 w-[51%] focus:outline-none focus:border-white"
                placeholder={`Value `}
              />
            </div>
          ))}
          <div className="left-55 bg-white/9 top-12">
            <button
              onClick={removeAttributeInput}
              className="absolute p-2 left-10 h-8 w-8 bg-red-400/30 font-semibold text-white rounded-lg hover:bg-white/20 transition"
            >
              <span className="absolute -top-0.5 left-2.5 text-2xl">-</span>
            </button>
            <button
              onClick={addAttributeInput}
              className="absolute p-2 left-0 h-8 w-8 bg-green-400/30 text-white rounded-lg hover:bg-white/20 transition"
            >
              <span className="absolute top-0 left-2 text-2xl">+</span>
            </button>
          </div>
        </div>
        <div className="relative flex ml-4 mt-15">
          <textarea
            maxLength={50}
            placeholder="Mint message "
            onChange={handleFwdMsgChange}
            className="border p-1.5 w-85 border-white/60 rounded-xl max-h-17 min-h-17 focus:outline-none"
          ></textarea>
        </div>
        <div className="relative mt-15 w-full">
          <span className="absolute top-0 left-6 text-white/20 font-mono text-[13px]">
            {`Cost: ${fromNano(mintCost)} TON`}
          </span>
          <span
            className={`absolute top-4.5 left-6 ${
              user?.nano_ton || user?.nano_ton === 0
                ? user.nano_ton - mintCost < 0
                  ? "text-red-500/60"
                  : "text-white/20"
                : "text-white/20"
            } font-mono text-[13px]`}
          >
            Balance after process: {""}
            {`${
              user?.nano_ton || user?.nano_ton === 0
                ? fromNano(user.nano_ton - mintCost)
                : "--"
            } TON`}
          </span>
        </div>
        <div className="w-full flex items-center justify-center">
          <button
            className={`relative flex items-center transition-colors duration-200 justify-center mt-11 mb-1 w-[90%] min-h-15 ${
              isError
                ? "bg-red-600/70"
                : isSuccess === 1
                ? "bg-green-600/90"
                : isSuccess === 2
                ? "bg-red-600/70"
                : user?.nano_ton || user?.nano_ton === 0
                ? user.nano_ton - mintCost < 0
                  ? "bg-red-600/70"
                  : "bg-gradient-to-r from-sky-400 to-sky-700 hover:from-sky-400 hover:to-sky-600"
                : "bg-gradient-to-r from-sky-400 to-sky-700 hover:from-sky-400 hover:to-sky-600"
            } rounded-2xl text-[20px] cursor-pointer`}
            onClick={async () => {
              console.log("selected collection: ", selectedCollectionAddress);
              if (!isMinting) {
                if (
                  user?.nano_ton || user?.nano_ton === 0
                    ? user.nano_ton > mintCost
                    : false
                ) {
                  if (!isError) {
                    setIsMinting(true);
                    const res = await mintNft(
                      imageByte,
                      name,
                      description,
                      attributeInputs,
                      fwdMsg,
                      selectedCollectionAddress,
                      user?.id
                    );
                    setIsMinting(false);
                    if (res !== "OK") {
                      setError(res);
                      setIsSuccess(2);
                      return;
                    }
                    setIsSuccess(1);
                  }
                }
              }
            }}
          >
            <b>
              {isMinting ? (
                <div className="w-10 h-10">
                  <LoadingIcon />
                </div>
              ) : isError ? (
                <span className="text-2xl font-semibold">
                  Max image size is 100KB
                </span>
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
              ) : user?.nano_ton || user?.nano_ton === 0 ? (
                user.nano_ton - mintCost < 0 ? (
                  <span className="text-2xl font-semibold">Not enough TON</span>
                ) : (
                  <span className="text-2xl font-semibold">Mint</span>
                )
              ) : (
                <span className="text-2xl font-semibold">Mint</span>
              )}
            </b>
          </button>
        </div>
      </div>
      <div
        className={`absolute left-0 top-0 w-full h-full bg-black transition-opacity duration-400 ease-in-out z-[3000] 
          ${isTransition ? "opacity-0" : "opacity-100"} 
          ${isTransitionEnded ? "hidden" : ""}`}
        onTransitionEnd={() => setIsTransitionEnded(true)}
      />
    </div>
  );
};

export default CreateNftPage;
