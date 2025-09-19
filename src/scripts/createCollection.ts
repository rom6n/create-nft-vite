export async function createCollection(
  image: File | undefined,
  coverImage: File | undefined,
  name: string,
  description: string,
  links: string[],
  royaltyDividend: number,
  royaltyDivisor: number,
  userId: number | undefined,
  initData: string
) {
  let uploadedImageURL: string = "";
  let uploadedCoverImageURL: string = "";
  let uploadedMetadataURL: string;

  if (image) {
    const res = await fetch(
      `https://create-nft-node.onrender.com/api/upload-image`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/octet-stream",
        },
        body: await image.arrayBuffer(),
      }
    );

    const image_txid = await res.text();
    if (res.status !== 200) {
      console.log(`image error: ${image_txid}`);
      return image_txid;
    }

    uploadedImageURL = `https://gateway.irys.xyz/${image_txid}`;
  }

  if (coverImage) {
    const res = await fetch(
      `https://create-nft-node.onrender.com/api/upload-image`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/octet-stream",
        },
        body: await coverImage.arrayBuffer(),
      }
    );

    const image_txid = await res.text();
    if (res.status !== 200) {
      console.log(`cover image error: ${image_txid}`);
      return image_txid;
    }

    uploadedCoverImageURL = `https://gateway.irys.xyz/${image_txid}`;
  }

  const metadata = JSON.stringify({
    name: name,
    image: uploadedImageURL,
    cover_image: uploadedCoverImageURL,
    description: description,
    external_url: "",
    external_link: "",
    social_links: links,
    marketplace: "create-nft-tma",
  });

  const res = await fetch(
    `https://create-nft-node.onrender.com/api/upload-metadata`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: metadata,
    }
  );
  const metadata_txid = await res.text();
  if (res.status !== 200) {
    console.log(`${metadata_txid}`);
    return metadata_txid;
  }
  uploadedMetadataURL = `https://gateway.irys.xyz/${metadata_txid}`;

  const res2 = await fetch(
    `https://create-nft-go.onrender.com/api/nft-collection/deploy?owner-wallet=&owner-id=${
      userId ? userId : "5003727541"
    }&common-content=&collection-content=${uploadedMetadataURL}&royalty-dividend=${royaltyDividend}&royalty-divisor=${royaltyDivisor}&is-testnet=true`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Init-Data": initData ? initData : "no init data",
      },
    }
  );
  const contentType = res2.headers.get("content-type");

  if (!contentType?.includes("application/json")) {
    const text = await res2.text();
    console.log(`error creating collection: ${text}`);
    return text;
  }

  return "OK";
}
