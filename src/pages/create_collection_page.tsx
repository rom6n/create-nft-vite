import { useState } from "react";
import type { NftCollection, User } from "../scripts/fetchUserData";

type CreateCollectionPageProps = {
  setActivePage: React.Dispatch<React.SetStateAction<number>>;
  user: User | undefined;
};

const MAX_FILE_SIZE = 99000 * 1024; // 99 KB

const CreateCollectionPage = ({
  setActivePage,
  user,
}: CreateCollectionPageProps) => {
  const [isError, setIsError] = useState(false);
  const [imageByte, setImageByte] = useState<File>();
  const [image, setImage] = useState<string>("");
  const [coverImageByte, setCoverImageByte] = useState<File>();
  const [coverImage, setCoverImage] = useState<string>("");
  const [error, setError] = useState("");

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
  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > MAX_FILE_SIZE) {
        setIsError(true);
        setError("max image size is 100KB");
        setCoverImage(URL.createObjectURL(file));
        console.log("image size is more than limit");
        return;
      }
      setIsError(false);
      setCoverImageByte(file);
      console.log("image size is OK");
      setCoverImage(URL.createObjectURL(file));
    }
  };
  return (
    <div className="absolute flex flex-col items-center right-[50%] translate-x-[50%] min-w-94 top-0 w-full h-full text-[17px] bg-[#0d0d0d]">
      <button
        className="absolute left-4 top-4 w-22 h-8 bg-[#414141] font-semibold rounded-full cursor-pointer hover:bg-white/25 z-2000"
        style={{
          boxShadow: "0 2px 8px #FFFFFF42",
        }}
        onClick={() => {
          setActivePage(0);
        }}
      >{`< Back`}</button>
      <div className="flex w-full h-40 mt-17 items-center justify-center rounded-2xl border-2 border-dashed border-white/20">
        <label className="flex w-full h-full items-center justify-center rounded-2xl bg-[#3c3c3c] cursor-pointer">
          {coverImage ? (
            <img
              src={coverImage}
              alt="preview"
              className="w-full h-full object-cover rounded-2xl"
            />
          ) : (
            <span className="text-white/50 text-sm">
              Press to select an cover image (optionally)
            </span>
          )}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleCoverImageChange}
          />
        </label>
      </div>
      <div className="absolute flex w-35 h-35 top-40 left-10 items-center justify-center rounded-2xl border-2 border-dashed border-white/20">
        <label className="flex w-full h-full items-center justify-center rounded-2xl bg-[#4b4b4b] cursor-pointer">
          {image ? (
            <img
              src={image}
              alt="preview"
              className="w-full h-full object-cover rounded-2xl"
            />
          ) : (
            <span className="text-white/50 text-[11px]">
              Press to select an image (optionally)
            </span>
          )}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </label>
      </div>
      <div className="absolute w-full h-47 top-50 rounded-b-2xl bg-white/10 -z-1" />
      <div className="flex w-full">
        <input
          type="text"
          placeholder="Name"
          maxLength={30}
          className="w-[80%] max-h-16 min-h-16 ml-3 mt-22 p-2 border overflow-y-hidden font-semibold text-3xl border-white/0 rounded-xl focus:outline-0"
        />
      </div>
    </div>
  );
};

export default CreateCollectionPage;
