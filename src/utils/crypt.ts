import CryptoJS from "crypto-js";

const SECRET_KEY = import.meta.env.VITE_ENCRYPTION_KEY;

// Function to encrypt data
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function encryptData(data: Record<string, any>) {
  if (data) {
    return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
  }

  return "";
}

// Function to decrypt data
export function decryptData(ciphertext: string | null | undefined) {
  if (
    ciphertext !== "null" &&
    ciphertext !== null &&
    ciphertext !== "undefined" &&
    ciphertext !== undefined
  ) {
    const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  }

  return null;
}
