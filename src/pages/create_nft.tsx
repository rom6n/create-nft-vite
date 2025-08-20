import { useState } from "react";

type CreateNftPageProps = {
  setActivePage: React.Dispatch<React.SetStateAction<number>>;
};

const CreateNftPage = ({ setActivePage }: CreateNftPageProps) => {
  const [name, setName] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [image, setImage] = useState<string | null>();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(URL.createObjectURL(file));
    }
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
      <div className="absolute w-full h-[651px] overflow-y-hidden top-37 bg-[#2c2c2c] right-[50%] translate-x-[50%] rounded-t-3xl z-2">
        <div className="absolute w-45 h-45 left-4 top-4 rounded-xl">
          <span className="absolute left-47 top-0 text-[12px] text-red-500 cursor-default">
            *required
          </span>
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
        <div className="absolute left-4 top-53">
          <p className="absolute font-semibold left-1 text-2xl cursor-default">
            Name
          </p>
          <p className="absolute left-19 top-2 text-[12px] text-red-500 cursor-default">
            *required
          </p>
          <input
            placeholder="Sad Face #2451"
            className="absolute p-3 w-50 h-8 top-9 border-2 border-white/50 rounded-[10px] focus:outline-0 focus:border-white"
            onChange={(a) => {
              setName(a.target.value);
            }}
          />
        </div>

        <div className="absolute left-4 top-76">
          <p className="absolute font-semibold left-1 text-2xl cursor-default">
            Description
          </p>
          <p className="absolute left-34 top-2 text-[12px] text-red-500 cursor-default">
            *required
          </p>
          <input
            placeholder="Don't be sad, be happy"
            className="absolute p-3 w-50 h-8 top-9 border-2 border-white/50 rounded-[10px] focus:outline-0 focus:border-white"
            onChange={(a) => {
              setDescription(a.target.value);
            }}
          />
        </div>
        <button
          className="absolute bottom-5 left-5 w-[90%] h-15 bg-gradient-to-r from-sky-400 to-sky-700 rounded-2xl text-[20px] cursor-pointer hover:from-sky-400 hover:to-sky-600"
          onClick={() => {
            if (name && description) {
              alert("NFT will deploy soon");
            } else {
              alert("Not all fields filled in");
            }
          }}
        >
          <b>Mint</b>
        </button>
      </div>
    </div>
  );
};

export default CreateNftPage;
