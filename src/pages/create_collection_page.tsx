import { useState } from "react";
import type { User } from "../scripts/fetchUserData";
import UploadImageIcon from "../component/uploadImage";

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
  const [name, setName] = useState("My Collection");
  const [description, setDescription] = useState("My decentralized collection");
  const [error, setError] = useState("");
  const [links, setLinks] = useState<string[]>(["https://", "fe"]);

  // To delete errors
  console.log(isError, imageByte, coverImageByte, error, user);

  const HandleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const HandleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
  };

  const HandleLinksChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    const newLinks = [...links];
    newLinks[idx] = e.target.value;
    setLinks(newLinks);
  };

  const addLinks = () => {
    setLinks([...links, ""]);
  };

  const removeLinks = () => {
    if (links.length === 1) {
      return;
    }
    setLinks(links.slice(0, links.length - 1));
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
    <div className="absolute flex flex-col items-center right-[50%] translate-x-[50%] min-w-94 top-0 w-full text-[17px] bg-[#101010]">
      <button
        className="absolute left-4 top-4 w-22 h-8 bg-[#414141] font-semibold rounded-full cursor-pointer hover:bg-white/25 z-2000"
        style={{
          boxShadow: "0 2px 8px #FFFFFF42",
        }}
        onClick={() => {
          setActivePage(0);
        }}
      >{`< Back`}</button>
      <div className="flex w-[93%] h-40 mt-17 items-center justify-center rounded-2xl border-2 border-[#636363]">
        <label className="flex w-full h-full items-center justify-center rounded-2xl bg-[#3c3c3c] cursor-pointer">
          {coverImage ? (
            <img
              src={coverImage}
              alt="preview"
              className="w-full h-full object-cover rounded-2xl"
            />
          ) : (
            <div className="w-20 h-20">
              <UploadImageIcon />
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleCoverImageChange}
          />
        </label>
      </div>
      <div className="absolute flex w-35 h-35 top-40 left-10 items-center justify-center rounded-2xl border-2 border-[#636363]">
        <label className="flex w-full h-full items-center justify-center rounded-2xl bg-[#4b4b4b] cursor-pointer">
          {image ? (
            <img
              src={image}
              alt="preview"
              className="w-full h-full object-cover rounded-2xl"
            />
          ) : (
            <div className="w-12 h-12">
              <UploadImageIcon />
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
      <div className="flex flex-col w-full text-start">
        <span className="ml-5 mt-22 font-semibold text-sm text-white/40">
          Name
        </span>
        <input
          type="text"
          value={name}
          onChange={HandleNameChange}
          maxLength={150}
          className="w-[70%] ml-3 mt-1 p-1.5 border bg-white/20 font-semibold text-xl border-white/0 rounded-xl focus:outline-0"
        />
      </div>
      <div className="flex flex-col w-full text-start">
        <span className="ml-5 mt-5 font-semibold text-sm text-white/40">
          Description
        </span>
        <textarea
          value={description}
          rows={3}
          onChange={HandleDescriptionChange}
          maxLength={600}
          className="w-[70%] ml-3 mt-1 p-1.5 border bg-white/20 resize-none font-semibold text-lg border-white/0 rounded-xl focus:outline-0"
        />
      </div>
      <div className="flex flex-col w-full mt-5 font-semibold">
        <span className="ml-5 font-semibold text-sm text-start text-white/40">
          Links
        </span>
        <div className="flex flex-col w-full mt-1 gap-3 font-semibold">
          {links.map((value, idx) => (
            <div className="flex gap-1 ml-3">
              <input
                type="text"
                value={value}
                key={idx}
                maxLength={300}
                onChange={(e) => {
                  HandleLinksChange(e, idx);
                }}
                className="w-[72%] p-1.5 bg-white/20 rounded-xl text-lg focus:outline-none"
              />
              {links.length - 1 === idx && (
                <button
                  className="w-10 h-10 bg-white/20 rounded-xl text-2xl font-semibold"
                  onClick={() => {
                    addLinks();
                  }}
                >
                  +
                </button>
              )}
              {links.length - 1 === idx && links.length > 1 && (
                <button
                  className="w-10 h-10 bg-white/20 rounded-xl text-2xl font-semibold"
                  onClick={() => {
                    removeLinks();
                  }}
                >
                  -
                </button>
              )}
            </div>
          ))}
        </div>
        <div className="w-full mt-10 pb-3">
          <button className="w-[93%] h-16 bg-sky-600 rounded-full text-2xl font-semibold">
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateCollectionPage;
