import { ethers, Contract, Signer, BigNumberish } from 'ethers';
import BlogABI from '@/abis/BlogABI';
import { CustomError } from './errors';

type ContractMethodNames = 'registerUser' | 'createPost' | 'updatePost' | 'deletePost' | 'addComment' | 'likePost' | 'likeComment' | 'recordReadSession';

type ContractMethod<T extends ContractMethodNames> = T extends keyof Contract
  ? Contract[T]
  : never;

// Contract address
const CONTRACT_ADDRESS = '0x00A74258A69f8843f7263Fa231B319daDe8E094b';

// Initialize provider for Filecoin Calibration Testnet
const provider = new ethers.JsonRpcProvider('https://api.calibration.node.glif.io/rpc/v0');

// Contract instance (read-only)
const contract = new ethers.Contract(CONTRACT_ADDRESS, BlogABI, provider);

// Constants
const FILECOIN_CALIBRATION_CHAIN_ID = 314159;
const GAS_BUFFER_PERCENTAGE = 1.2;

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

    return new ethers.Contract(CONTRACT_ADDRESS, BlogABI, signer);
  } catch (error) {
    console.error('Error getting contract with signer:', error);
    throw error;
  }
};

// Read Functions
export const getUser = async (userId: number) => {
  return contract.getUser(userId);
};

export const getPost = async (postId: number) => {
  return contract.getPost(postId);
};

export const getComment = async (commentId: number) => {
  return contract.getComment(commentId);
};

export const getUserRewards = async (userId: number) => {
  return contract.getUserRewards(userId);
};

export const getReadSessions = async (postId: number) => {
  return contract.getReadSessions(postId);
};

export const getUserIdByAddress = async (address: string) => {
  return contract.addressToUserId(address);
};

// Write Functions (Gas Optimized)
export const registerUser = async (
  username: string,
  email: string,
  bio: string,
  profilePictureUrl: string
): Promise<any> => {
  try {
    const contractWithSigner = await getContractWithSigner();
    const gasEstimate = await contractWithSigner.estimateGas.registerUser(
      username,
      email,
      bio,
      profilePictureUrl
    );

    const tx = await contractWithSigner.registerUser(
      username,
      email,
      bio,
      profilePictureUrl,
      { gasLimit: Number(ethers.parseUnits(gasEstimate.toString())) * 1.2 }
    );

    await tx.wait();
    return tx;
  } catch (error) {
    console.error('Error in registerUser:', error);
    throw new CustomError(
      'Failed to register user',
      'REGISTER_USER_FAILED',
      error
    );
  }
};

export const createPost = async (
  title: string,
  content: string,
  tags: string[],
  visibility: number
) => {
  const contractWithSigner = await getContractWithSigner();
  const gasEstimate = await contractWithSigner.estimateGas.createPost(
    title,
    content,
    tags,
    visibility
  );
  return contractWithSigner.createPost(title, content, tags, visibility, {
    gasLimit: gasEstimate * 120n / 100n,
  });
};

export const updatePost = async (
  postId: number,
  title: string,
  content: string,
  tags: string[],
  visibility: number
) => {
  const contractWithSigner = await getContractWithSigner();
  const gasEstimate = await (contractWithSigner as any).estimateGas.updatePost(
    postId,
    title,
    content,
    tags,
    visibility
  );
  return (contractWithSigner as any).updatePost(postId, title, content, tags, visibility, {
    gasLimit: ethers.parseUnits(String(Number(gasEstimate) * 1.2))
  });
};

export const deletePost = async (postId: number) => {
  const contractWithSigner = await getContractWithSigner();
  const gasEstimate = await (contractWithSigner as any).estimateGas.deletePost(postId);
  return (contractWithSigner as any).deletePost(postId, { gasLimit: BigInt(gasEstimate.toString()) * BigInt(GAS_BUFFER_PERCENTAGE * 100) / BigInt(100) });
};

export const addComment = async (postId: number, commentText: string, parentCommentId: number) => {
  const contractWithSigner = await getContractWithSigner();
  const gasEstimate = await (contractWithSigner as any).estimateGas.addComment(
    postId,
    commentText,
    parentCommentId
  );
  return (contractWithSigner as any).addComment(postId, commentText, parentCommentId, {
    gasLimit: ethers.parseUnits(String(Number(gasEstimate) * 1.2))
  });
};

export const likePost = async (postId: number) => {
  const contractWithSigner = await getContractWithSigner();
  const gasEstimate = await (contractWithSigner as any).estimateGas.likePost(postId);
  return (contractWithSigner as any).likePost(postId, { gasLimit: BigInt(gasEstimate.toString()) * BigInt(GAS_BUFFER_PERCENTAGE * 100) / BigInt(100) });
};

export const likeComment = async (commentId: number) => {
  const contractWithSigner = await getContractWithSigner();
  const gasEstimate = await (contractWithSigner as any).estimateGas.likeComment(commentId);
  return (contractWithSigner as any).likeComment(commentId, { gasLimit: BigInt(gasEstimate.toString()) * BigInt(GAS_BUFFER_PERCENTAGE * 100) / BigInt(100) });
};

export const recordReadSession = async (
  postId: number,
  timeSpentReading: number,
  scrollPercentage: number,
  deviceInfo: string
) => {
  const contractWithSigner = await getContractWithSigner();
  const gasEstimate = await (contractWithSigner as any).estimateGas.recordReadSession(
    postId,
    timeSpentReading,
    scrollPercentage,
    deviceInfo
  );
  return (contractWithSigner as any).recordReadSession(
    postId,
    timeSpentReading,
    scrollPercentage,
    deviceInfo,
    { gasLimit: BigInt(gasEstimate.toString()) * BigInt(GAS_BUFFER_PERCENTAGE * 100) / BigInt(100) }
  );
};