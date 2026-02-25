import ImageKit from "imagekit";

let imagekit = null;

function initImageKit() {
  if (imagekit) return imagekit;
  const { IMAGEKIT_PUBLIC_KEY, IMAGEKIT_PRIVATE_KEY, IMAGEKIT_URL_ENDPOINT } =
    process.env;
  if (!IMAGEKIT_PRIVATE_KEY || !IMAGEKIT_PUBLIC_KEY || !IMAGEKIT_URL_ENDPOINT) {
    throw new Error(
      "Missing ImageKit config. Ensure IMAGEKIT_PRIVATE_KEY, IMAGEKIT_PUBLIC_KEY, and IMAGEKIT_URL_ENDPOINT are set.",
    );
  }
  imagekit = new ImageKit({
    publicKey: IMAGEKIT_PUBLIC_KEY,
    privateKey: IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: IMAGEKIT_URL_ENDPOINT,
  });
  return imagekit;
}

async function uploadFile(input) {
  const ik = initImageKit();
  let file;
  let fileName = "file";

  if (!input) throw new Error("No file provided");

  if (typeof input === "string") {
    file = input;
  } else if (input.file) {
    file = input.file;
    fileName = input.fileName || fileName;
  } else if (input.buffer) {
    file = input.buffer;
    fileName = input.name || fileName;
  } else {
    file = input;
  }

  const result = await ik.upload({
    file: file,
    fileName,
  });
  return result;
}

export default uploadFile;
