import { WebUploader } from "@irys/web-upload";
import WebEthereum from "@irys/web-upload-ethereum";

export interface NftItemMetadata {
  name: string;
  image: string;
  attributes: Attribute[];
  description: string;
  external_url: string;
}

export interface Attribute {
  trait_type: string;
  value: string;
}

const getIrysUploader = async () => {
  const irysUploader = await WebUploader(WebEthereum);
  return irysUploader;
};

export async function mintNft(
  image: File,
  name: string,
  description: string,
  attributes: Attribute[]
  //collectionAddress?: string | undefined
) {
  let uploadedImageURL: string;
  let uploadedMetadataURL: string;
  const irys = await getIrysUploader();
  try {
    const tags = [{ name: "Content-Type", value: "image/*" }];
    const receipt = await irys.upload(Buffer.from(await image.arrayBuffer()), {
      tags: tags,
    });
    uploadedImageURL = `https://gateway.irys.xyz/${receipt.id}`;

    console.log(`Data uploaded ==> https://gateway.irys.xyz/${receipt.id}`);
  } catch (e) {
    console.log("Error uploading image ", e);
    return "Error";
  }

  const metadata = JSON.stringify({
    name: name,
    image: uploadedImageURL,
    attributes: attributes,
    description: description,
    external_url: "",
  });

  try {
    const tags = [{ name: "Content-Type", value: "application/json" }];
    const receipt = await irys.upload(metadata, { tags: tags });
    uploadedMetadataURL = `https://gateway.irys.xyz/${receipt.id}`;

    console.log(`Data uploaded ==> https://gateway.irys.xyz/${receipt.id}`);
  } catch (e) {
    console.log("Error uploading metadata ", e);
    return "Error";
  }

  const res = await fetch(
    `https://create-nft-go.onrender.com/api/nft-item/mint?owner-wallet=0QDU46qYz4rHAJhszrW9w6imF8p4Cw5dS1GpPTcJ9vqNSmnf&owner-id=5003727541&content=${uploadedMetadataURL}&forward-amount=10000000&forward-message=Mint&nft-collection-address=kQB253d_QpJsEgBszsjTZlhh8mZi9XX4nKq1H9I5iVWDzz6j&is-testnet=true`,
    {
      method: "GET",
    }
  );

  const contentType = res.headers.get("content-type");

  if (!contentType?.includes("application/json")) {
    console.log(`error minting NFT: ${await res.text}`);
    return "Error";
  }

  return "OK";
}
