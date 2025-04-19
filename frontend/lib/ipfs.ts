export const uploadToIPFS = async (data: File | string): Promise<string> => {
  try {
    // Dynamically import lighthouse to avoid SSR issues
    const { default: lighthouse } = await import('@lighthouse-web3/sdk');

    const apiKey = process.env.NEXT_PUBLIC_LIGHTHOUSE_API_KEY;
    if (!apiKey) {
      throw new Error('Lighthouse API key is missing in environment variables');
    }

    console.log('Lighthouse API Key:', apiKey); // Debug
    console.log('Lighthouse SDK:', lighthouse); // Debug

    let fileData: File;
    if (typeof data === 'string') {
      fileData = new File([data], 'content.txt', { type: 'text/plain' });
    } else {
      fileData = data;
    }

    console.log('Uploading to IPFS:', fileData.name, 'Size:', fileData.size); // Debug

    // Ensure lighthouse.upload is available
    if (!lighthouse.upload) {
      throw new Error('Lighthouse upload method is undefined');
    }

    // Pass fileData as an array to make it iterable
    const uploadResponse = await lighthouse.upload([fileData], apiKey);
    console.log('IPFS upload response:', uploadResponse.data); // Debug

    if (!uploadResponse.data.Hash) {
      throw new Error('No Hash returned from Lighthouse upload');
    }

    console.log('Successfully uploaded to IPFS:', uploadResponse.data.Hash);
    return uploadResponse.data.Hash;
  } catch (error: any) {
    console.error('IPFS upload error:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
    }); // Debug
    throw new Error(`Failed to upload to IPFS: ${error.message || 'Unknown error'}`);
  }
};

export const fetchFromIPFS = async (cid: string): Promise<string> => {
  try {
    const response = await fetch(`https://gateway.lighthouse.storage/ipfs/${cid}`);
    if (!response.ok) throw new Error('Failed to fetch from IPFS');
    return response.text();
  } catch (error: any) {
    console.error('IPFS fetch error:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
    }); // Debug
    throw new Error(`Failed to fetch from IPFS: ${error.message || 'Unknown error'}`);
  }
};