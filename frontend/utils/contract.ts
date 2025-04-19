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

// Contract address
const CONTRACT_ADDRESS = '0x24aEAE7fEF8714E9cF2946d4d1b6b698D3D73123';

// Initialize provider for Filecoin Calibration Testnet
const provider = new ethers.JsonRpcProvider('https://api.calibration.node.glif.io/rpc/v0');

// Contract instance (read-only)
const contract = new ethers.Contract(CONTRACT_ADDRESS, BlogABI, provider);

// Constants
const FILECOIN_CALIBRATION_CHAIN_ID = 314159;
const GAS_BUFFER_MULTIPLIER = 120n; // 120% of estimated gas

// Connect with signer (for write operations, browser-only)
export const getContractWithSigner = async (): Promise<Contract> => {
  try {
    if (typeof window === 'undefined' || !window.ethereum) {
      throw new CustomError('No wallet provider found', 'NO_WALLET_PROVIDER');
    }

    const browserProvider = new ethers.BrowserProvider(window.ethereum);
    const signer = await browserProvider.getSigner();
    
    // Check network connection
    const network = await browserProvider.getNetwork();
    if (Number(network.chainId) !== FILECOIN_CALIBRATION_CHAIN_ID) {
      throw new CustomError(
        'Wrong network. Please switch to Filecoin Calibration Testnet',
        'WRONG_NETWORK'
      );
    }

    // Check if account is connected
    const accounts = await browserProvider.listAccounts();
    if (!accounts || accounts.length === 0) {
      throw new CustomError(
        'No account connected. Please connect your wallet',
        'NO_ACCOUNT_CONNECTED'
      );
    }

    return new ethers.Contract(CONTRACT_ADDRESS, BlogABI, signer);
  } catch (error: any) {
    console.error('Error getting contract with signer:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    throw new CustomError(
      error.message || 'Failed to connect with signer',
      error.code || 'SIGNER_CONNECTION_FAILED',
      error
    );
  }
};

// Read Functions
export const getUser = async (userId: number) => {
  try {
    return await contract.getUser(userId);
  } catch (error: any) {
    console.error('Error in getUser:', error);
    throw new CustomError('Failed to fetch user', 'GET_USER_FAILED', error);
  }
};

export const getPost = async (postId: number) => {
  try {
    return await contract.getPost(postId);
  } catch (error: any) {
    console.error('Error in getPost:', error);
    throw new CustomError('Failed to fetch post', 'GET_POST_FAILED', error);
  }
};

export const getComment = async (commentId: number) => {
  try {
    return await contract.getComment(commentId);
  } catch (error: any) {
    console.error('Error in getComment:', error);
    throw new CustomError('Failed to fetch comment', 'GET_COMMENT_FAILED', error);
  }
};

export const getUserRewards = async (userId: number) => {
  try {
    return await contract.getUserRewards(userId);
  } catch (error: any) {
    console.error('Error in getUserRewards:', error);
    throw new CustomError('Failed to fetch user rewards', 'GET_USER_REWARDS_FAILED', error);
  }
};

export const getReadSessions = async (postId: number) => {
  try {
    return await contract.getReadSessions(postId);
  } catch (error: any) {
    console.error('Error in getReadSessions:', error);
    throw new CustomError('Failed to fetch read sessions', 'GET_READ_SESSIONS_FAILED', error);
  }
};

export const getUserIdByAddress = async (address: string) => {
  try {
    return await contract.addressToUserId(address);
  } catch (error: any) {
    console.error('Error in getUserIdByAddress:', error);
    throw new CustomError('Failed to fetch user ID', 'GET_USER_ID_FAILED', error);
  }
};

// Write Functions (Gas Optimized)
export const registerUser = async (
  username: string,
  email: string,
  bio: string,
  profilePictureUrl: string
): Promise<ethers.ContractTransaction> => {
  try {
    const contractWithSigner = await getContractWithSigner();
    const gasEstimate = await contractWithSigner.estimateGas.registerUser(
      username,
      email,
      bio,
      profilePictureUrl
    );

    const gasLimit = (gasEstimate * GAS_BUFFER_MULTIPLIER) / 100n;
    const tx = await contractWithSigner.registerUser(
      username,
      email,
      bio,
      profilePictureUrl,
      { gasLimit }
    );

    await tx.wait();
    console.log('User registered, tx:', tx.hash); // Debug
    return tx;
  } catch (error: any) {
    console.error('Error in registerUser:', error);
    throw new CustomError(
      error.message || 'Failed to register user',
      error.code || 'REGISTER_USER_FAILED',
      error
    );
  }
};

export const createPost = async (
  postData: {
    title: string;
    content: string;
    tags: string[];
    visibility: number;
    imageCid: string;
    lighthouseMetadata: string;
  }
): Promise<ethers.ContractTransaction> => {
  try {
    const contractWithSigner = await getContractWithSigner();
    const gasEstimate = await contractWithSigner.estimateGas.createPost(postData);
    const gasLimit = (gasEstimate * GAS_BUFFER_MULTIPLIER) / 100n;

    const tx = await contractWithSigner.createPost(postData, { gasLimit });
    await tx.wait();
    console.log('Post created, tx:', tx.hash); // Debug
    return tx;
  } catch (error: any) {
    console.error('Error in createPost:', error);
    throw new CustomError(
      error.message || 'Failed to create post',
      error.code || 'CREATE_POST_FAILED',
      error
    );
  }
};

export const updatePost = async (
  postId: number,
  postData: {
    title: string;
    content: string;
    tags: string[];
    visibility: number;
    imageCid: string;
    lighthouseMetadata: string;
  }
): Promise<ethers.ContractTransaction> => {
  try {
    const contractWithSigner = await getContractWithSigner();
    const gasEstimate = await contractWithSigner.estimateGas.updatePost(postId, postData);
    const gasLimit = (gasEstimate * GAS_BUFFER_MULTIPLIER) / 100n;

    const tx = await contractWithSigner.updatePost(postId, postData, { gasLimit });
    await tx.wait();
    console.log('Post updated, tx:', tx.hash); // Debug
    return tx;
  } catch (error: any) {
    console.error('Error in updatePost:', error);
    throw new CustomError(
      error.message || 'Failed to update post',
      error.code || 'UPDATE_POST_FAILED',
      error
    );
  }
};

export const deletePost = async (postId: number): Promise<ethers.ContractTransaction> => {
  try {
    const contractWithSigner = await getContractWithSigner();
    const gasEstimate = await contractWithSigner.estimateGas.deletePost(postId);
    const gasLimit = (gasEstimate * GAS_BUFFER_MULTIPLIER) / 100n;

    const tx = await contractWithSigner.deletePost(postId, { gasLimit });
    await tx.wait();
    console.log('Post deleted, tx:', tx.hash); // Debug
    return tx;
  } catch (error: any) {
    console.error('Error in deletePost:', error);
    throw new CustomError(
      error.message || 'Failed to delete post',
      error.code || 'DELETE_POST_FAILED',
      error
    );
  }
};

export const addComment = async (
  postId: number,
  commentText: string,
  parentCommentId: number
): Promise<ethers.ContractTransaction> => {
  try {
    const contractWithSigner = await getContractWithSigner();
    const gasEstimate = await contractWithSigner.estimateGas.addComment(
      postId,
      commentText,
      parentCommentId
    );
    const gasLimit = (gasEstimate * GAS_BUFFER_MULTIPLIER) / 100n;

    const tx = await contractWithSigner.addComment(postId, commentText, parentCommentId, {
      gasLimit,
    });
    await tx.wait();
    console.log('Comment added, tx:', tx.hash); // Debug
    return tx;
  } catch (error: any) {
    console.error('Error in addComment:', error);
    throw new CustomError(
      error.message || 'Failed to add comment',
      error.code || 'ADD_COMMENT_FAILED',
      error
    );
  }
};

export const likePost = async (postId: number): Promise<ethers.ContractTransaction> => {
  try {
    const contractWithSigner = await getContractWithSigner();
    const gasEstimate = await contractWithSigner.estimateGas.likePost(postId);
    const gasLimit = (gasEstimate * GAS_BUFFER_MULTIPLIER) / 100n;

    const tx = await contractWithSigner.likePost(postId, { gasLimit });
    await tx.wait();
    console.log('Post liked, tx:', tx.hash); // Debug
    return tx;
  } catch (error: any) {
    console.error('Error in likePost:', error);
    throw new CustomError(
      error.message || 'Failed to like post',
      error.code || 'LIKE_POST_FAILED',
      error
    );
  }
};

export const likeComment = async (commentId: number): Promise<ethers.ContractTransaction> => {
  try {
    const contractWithSigner = await getContractWithSigner();
    const gasEstimate = await contractWithSigner.estimateGas.likeComment(commentId);
    const gasLimit = (gasEstimate * GAS_BUFFER_MULTIPLIER) / 100n;

    const tx = await contractWithSigner.likeComment(commentId, { gasLimit });
    await tx.wait();
    console.log('Comment liked, tx:', tx.hash); // Debug
    return tx;
  } catch (error: any) {
    console.error('Error in likeComment:', error);
    throw new CustomError(
      error.message || 'Failed to like comment',
      error.code || 'LIKE_COMMENT_FAILED',
      error
    );
  }
};

export const recordReadSession = async (
  postId: number,
  timeSpentReading: number,
  scrollPercentage: number,
  deviceInfo: string
): Promise<ethers.ContractTransaction> => {
  try {
    const contractWithSigner = await getContractWithSigner();
    const gasEstimate = await contractWithSigner.estimateGas.recordReadSession(
      postId,
      timeSpentReading,
      scrollPercentage,
      deviceInfo
    );
    const gasLimit = (gasEstimate * GAS_BUFFER_MULTIPLIER) / 100n;

    const tx = await contractWithSigner.recordReadSession(
      postId,
      timeSpentReading,
      scrollPercentage,
      deviceInfo,
      { gasLimit }
    );
    await tx.wait();
    console.log('Read session recorded, tx:', tx.hash); // Debug
    return tx;
  } catch (error: any) {
    console.error('Error in recordReadSession:', error);
    throw new CustomError(
      error.message || 'Failed to record read session',
      error.code || 'RECORD_READ_SESSION_FAILED',
      error
    );
  }
};

export const updateLighthouseMetadata = async (
  postId: number,
  metadata: string
): Promise<ethers.ContractTransaction> => {
  try {
    const contractWithSigner = await getContractWithSigner();
    const gasEstimate = await contractWithSigner.estimateGas.updateLighthouseMetadata(postId, metadata);
    const gasLimit = (gasEstimate * GAS_BUFFER_MULTIPLIER) / 100n;

    const tx = await contractWithSigner.updateLighthouseMetadata(postId, metadata, { gasLimit });
    await tx.wait();
    console.log('Lighthouse metadata updated, tx:', tx.hash); // Debug
    return tx;
  } catch (error: any) {
    console.error('Error in updateLighthouseMetadata:', error);
    throw new CustomError(
      error.message || 'Failed to update lighthouse metadata',
      error.code || 'UPDATE_LIGHTHOUSE_METADATA_FAILED',
      error
    );
  }
};