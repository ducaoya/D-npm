import fs from "fs";

/**
 * get file extension
 * @param {string} imgPath - The path to the image file.
 * @return {string} Returns the file extension.
 */
function getFileExtension(imgPath) {
  return imgPath.split(".").pop();
}

/**
 * return buffer
 * @param {string|Buffer} img - The image to be compressed.
 * @return {Buffer} - Returns the image data.
 */

function returnBuffer(img) {
  if (typeof img === "string") {
    return readImgByPath(img);
  }

  if (typeof img === "buffer") {
    return img;
  }

  throw new Error(`${img} tranfrom to buffer is not supported.`);
}

/**
 * Reads an image from the specified path.
 *
 * @param {string} imgPath - The path to the image file.
 * @return {unknown} Returns the image data.
 */
export function readImgByPath(imgPath) {
  if (getFileExtension(imgPath).match(/png|jpg|jpeg|webp/)) {
    return fs.readFileSync(imgPath);
  } else {
    throw new Error(`${imgPath} is not an image.`);
  }
}

/**
 * Compresses an image.
 *
 * @param {string|Buffer} img - The image to be compressed.
 * @return {undefined} - This function does not return a value.
 */
export function compressImg(img) {
  const buf = returnBuffer(img);

  console.log("buf", buf);

  return buf;
}
