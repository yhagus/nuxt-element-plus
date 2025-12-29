/**
 * Converts a Blob object to a File object.
 *
 * @param blob The Blob object to convert.
 * @param fileName The desired name for the file (e.g., "image.png").
 * @returns A new File object.
 */
export function blobToFile(blob: Blob, fileName: string): File {
  // Options for the File constructor.
  // We'll preserve the original MIME type from the blob
  // and set the lastModified date to the current time.
  const options: FilePropertyBag = {
    type: blob.type,
    lastModified: Date.now(),
  };

  // Create and return a new File object.
  // The first argument to the File constructor is an array of BlobParts.
  return new File([blob], fileName, options);
}
/**
 * Converts a Blob object to an object URL.
 *
 * @param blob The Blob object to convert.
 * @returns A string representing the object URL for the Blob.
 * Returns null if the input blob is null or undefined.
 */
export function blobToURL(blob: Blob | null | undefined): string | null {
  if (!blob) {
    console.warn('blobToURL: Input blob is null or undefined.');
    return null;
  }
  return URL.createObjectURL(blob);
}
