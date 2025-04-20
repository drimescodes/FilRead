import { ethers, Contract } from 'ethers';
import BlogABI from '@/abis/BlogABI';
import { CustomError } from './errors';

type ContractMethodNames =
  | 'registerUser'
  | 'createPost'
  | 'updatePost'
  | 'deletePost'
  | 'addComment'
  | 'likePost'
  | 'likeComment'
  | 'recordReadSession'
  | 'updateLighthouseMetadata'
  | 'getUser'
  | 'getPost'
  | 'getComment'
  | 'getUserRewards'
  | 'getReadSessions'
  | 'addressToUserId';

const CONTRACT_ADDRESS = '0x24aEAE7fEF8714E9cF2946d4d1b6b698D3D73123';
const provider = new ethers.JsonRpcProvider('https://api.calibration.node.glif.io/rpc/v0');
const contract = new ethers.Contract(CONTRACT_ADDRESS, BlogABI, provider);

const FILECOIN_CALIBRATION_CHAIN_ID = 314159;
const GAS_BUFFER_MULTIPLIER = BigInt(120); // 120%

export const getAllBlogs = async (): Promise<any[]> => {
  try {
    // Assuming the contract has a `getPosts` method
    const posts = await contract.getPosts();
    return posts;
  } catch (e: unknown) {
    const error = e instanceof Error ? e : new Error(String(e));
    throw new CustomError('GET_ALL_BLOGS_FAILED', 'GET_ALL_BLOGS_FAILED', error);
  }
};


export const getContractWithSigner = async (): Promise<Contract> => {
  try {
    if (typeof window === 'undefined' || !window.ethereum) {
      throw new CustomError('No wallet provider found', 'NO_WALLET_PROVIDER');
    }
    const browserProvider = new ethers.BrowserProvider(window.ethereum);
    const signer = await browserProvider.getSigner();
    const network = await browserProvider.getNetwork();
    if (Number(network.chainId) !== FILECOIN_CALIBRATION_CHAIN_ID) {
      throw new CustomError('Wrong network. Please switch to Filecoin Calibration Testnet', 'WRONG_NETWORK');
    }
    const accounts = await browserProvider.listAccounts();
    if (!accounts?.length) {
      throw new CustomError('No account connected. Please connect your wallet', 'NO_ACCOUNT_CONNECTED');
    }
    return new ethers.Contract(CONTRACT_ADDRESS, BlogABI, signer);
  } catch (error: any) {
    console.error('Error getting contract with signer:', error);
    throw new CustomError(error.message || 'Failed to connect with signer',
      error.code || 'SIGNER_CONNECTION_FAILED', error);
  }
};

// READ
// READ FUNCTIONS
export const getUser = async (id: number) => {
  try {
    return await contract.getUser(id);
  } catch (e: unknown) {
    const error = e instanceof Error ? e : new Error(String(e));
    throw new CustomError('GET_USER_FAILED', 'GET_USER_FAILED', error);
  }
};

export const getPost = async (id: number) => {
  try {
    return await contract.getPost(id);
  } catch (e: unknown) {
    const error = e instanceof Error ? e : new Error(String(e));
    throw new CustomError('GET_POST_FAILED', 'GET_POST_FAILED', error);
  }
};

export const getComment = async (id: number) => {
  try {
    return await contract.getComment(id);
  } catch (e: unknown) {
    const error = e instanceof Error ? e : new Error(String(e));
    throw new CustomError('GET_COMMENT_FAILED', 'GET_COMMENT_FAILED', error);
  }
};

export const getUserRewards = async (id: number) => {
  try {
    return await contract.getUserRewards(id);
  } catch (e: unknown) {
    const error = e instanceof Error ? e : new Error(String(e));
    throw new CustomError('GET_USER_REWARDS_FAILED', 'GET_USER_REWARDS_FAILED', error);
  }
};

export const getReadSessions = async (id: number) => {
  try {
    return await contract.getReadSessions(id);
  } catch (e: unknown) {
    const error = e instanceof Error ? e : new Error(String(e));
    throw new CustomError('GET_READ_SESSIONS_FAILED', 'GET_READ_SESSIONS_FAILED', error);
  }
};

export const getUserIdByAddress = async (addr: string) => {
  try {
    return await contract.addressToUserId(addr);
  } catch (e: unknown) {
    const error = e instanceof Error ? e : new Error(String(e));
    throw new CustomError('GET_USER_ID_FAILED', 'GET_USER_ID_FAILED', error);
  }
};


// WRITE (gas‑optimized via any‑cast)
export const registerUser = async (
  username: string, email: string, bio: string, profilePictureUrl: string
): Promise<ethers.ContractTransaction> => {
  const c = await getContractWithSigner();
  try {
    const gasEstimate = await (c.estimateGas as any).registerUser(
      username, email, bio, profilePictureUrl
    );
    const gasLimit = (gasEstimate * GAS_BUFFER_MULTIPLIER) / BigInt(100);
    const tx = await c.registerUser(username, email, bio, profilePictureUrl, { gasLimit });
    await tx.wait();
    return tx;
  } catch (e: any) {
    throw new CustomError('REGISTER_USER_FAILED','REGISTER_USER_FAILED',e);
  }
};

export const createPost = async (postData: {
  title: string; content: string; tags: string[];
  visibility: number; imageCid: string; lighthouseMetadata: string;
}): Promise<ethers.ContractTransaction> => {
  const c = await getContractWithSigner();
  try {
    const gasEstimate = await (c.estimateGas as any).createPost(postData);
    const gasLimit = (gasEstimate * GAS_BUFFER_MULTIPLIER) / BigInt(100);
    const tx = await c.createPost(postData, { gasLimit });
    await tx.wait();
    return tx;
  } catch (e: any) {
    throw new CustomError('CREATE_POST_FAILED','CREATE_POST_FAILED',e);
  }
};

export const updatePost = async (
  postId: number, postData: {
    title: string; content: string; tags: string[];
    visibility: number; imageCid: string; lighthouseMetadata: string;
  }
): Promise<ethers.ContractTransaction> => {
  const c = await getContractWithSigner();
  try {
    const gasEstimate = await (c.estimateGas as any).updatePost(postId, postData);
    const gasLimit = (gasEstimate * GAS_BUFFER_MULTIPLIER) / BigInt(100);
    const tx = await c.updatePost(postId, postData, { gasLimit });
    await tx.wait();
    return tx;
  } catch (e: any) {
    throw new CustomError('UPDATE_POST_FAILED','UPDATE_POST_FAILED',e);
  }
};

export const deletePost = async (postId: number): Promise<ethers.ContractTransaction> => {
  const c = await getContractWithSigner();
  try {
    const gasEstimate = await (c.estimateGas as any).deletePost(postId);
    const gasLimit = (gasEstimate * GAS_BUFFER_MULTIPLIER) / BigInt(100);
    const tx = await c.deletePost(postId, { gasLimit });
    await tx.wait();
    return tx;
  } catch (e: any) {
    throw new CustomError('DELETE_POST_FAILED','DELETE_POST_FAILED',e);
  }
};

export const addComment = async (
  postId: number, commentText: string, parentCommentId: number
): Promise<ethers.ContractTransaction> => {
  const c = await getContractWithSigner();
  try {
    const gasEstimate = await (c.estimateGas as any).addComment(postId, commentText, parentCommentId);
    const gasLimit = (gasEstimate * GAS_BUFFER_MULTIPLIER) / BigInt(100);
    const tx = await c.addComment(postId, commentText, parentCommentId, { gasLimit });
    await tx.wait();
    return tx;
  } catch (e: any) {
    throw new CustomError('ADD_COMMENT_FAILED','ADD_COMMENT_FAILED',e);
  }
};

export const likePost = async (postId: number): Promise<ethers.ContractTransaction> => {
  const c = await getContractWithSigner();
  try {
    const gasEstimate = await (c.estimateGas as any).likePost(postId);
    const gasLimit = (gasEstimate * GAS_BUFFER_MULTIPLIER) / BigInt(100);
    const tx = await c.likePost(postId, { gasLimit });
    await tx.wait();
    return tx;
  } catch (e: any) {
    throw new CustomError('LIKE_POST_FAILED','LIKE_POST_FAILED',e);
  }
};

export const likeComment = async (commentId: number): Promise<ethers.ContractTransaction> => {
  const c = await getContractWithSigner();
  try {
    const gasEstimate = await (c.estimateGas as any).likeComment(commentId);
    const gasLimit = (gasEstimate * GAS_BUFFER_MULTIPLIER) / BigInt(100);
    const tx = await c.likeComment(commentId, { gasLimit });
    await tx.wait();
    return tx;
  } catch (e: any) {
    throw new CustomError('LIKE_COMMENT_FAILED','LIKE_COMMENT_FAILED',e);
  }
};

export const recordReadSession = async (
  postId: number, timeSpentReading: number, scrollPercentage: number, deviceInfo: string
): Promise<ethers.ContractTransaction> => {
  const c = await getContractWithSigner();
  try {
    const gasEstimate = await (c.estimateGas as any).recordReadSession(
      postId, timeSpentReading, scrollPercentage, deviceInfo
    );
    const gasLimit = (gasEstimate * GAS_BUFFER_MULTIPLIER) / BigInt(100);
    const tx = await c.recordReadSession(postId, timeSpentReading, scrollPercentage, deviceInfo, { gasLimit });
    await tx.wait();
    return tx;
  } catch (e: any) {
    throw new CustomError('RECORD_READ_SESSION_FAILED','RECORD_READ_SESSION_FAILED',e);
  }
};

export const updateLighthouseMetadata = async (
  postId: number, metadata: string
): Promise<ethers.ContractTransaction> => {
  const c = await getContractWithSigner();
  try {
    const gasEstimate = await (c.estimateGas as any).updateLighthouseMetadata(postId, metadata);
    const gasLimit = (gasEstimate * GAS_BUFFER_MULTIPLIER) / BigInt(100);
    const tx = await c.updateLighthouseMetadata(postId, metadata, { gasLimit });
    await tx.wait();
    return tx;
  } catch (e: any) {
    throw new CustomError('UPDATE_LIGHTHOUSE_METADATA_FAILED','UPDATE_LIGHTHOUSE_METADATA_FAILED',e);
  }
};
