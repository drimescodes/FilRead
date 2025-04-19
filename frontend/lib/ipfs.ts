import lighthouse from '@lighthouse-web3/sdk';

const API_KEY = process.env.NEXT_PUBLIC_LIGHTHOUSE_API_KEY || '';

export const uploadToIPFS = async (content: string | File | FormData) => {
  try {
    // Convert File to FormData if it's a File
    let uploadContent = content;
    if (content instanceof File) {
      const formData = new FormData();
      formData.append('file', content);
      uploadContent = formData;
    }

    const response = await lighthouse.upload(uploadContent, API_KEY);
    return response.data.Hash; // Return CID
  } catch (error) {
    console.error('IPFS upload failed:', error);
    throw new Error('Failed to upload to IPFS');
  }
};

export const fetchFromIPFS = async (cid: string) => {
  try {
    const response = await fetch(`https://gateway.lighthouse.storage/ipfs/${cid}`);
    if (!response.ok) throw new Error('IPFS fetch failed');
    return response.text(); // Or response.json() for JSON content
  } catch (error) {
    console.error('IPFS fetch failed:', error);
    throw new Error('Failed to fetch from IPFS');
  }
};