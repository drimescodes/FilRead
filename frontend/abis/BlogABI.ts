const BlogABI = [
  {
    "type": "constructor",
    "inputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "name": "CommentAdded",
    "type": "event",
    "inputs": [
      {
        "name": "commentId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "postId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "name": "CommentLiked",
    "type": "event",
    "inputs": [
      {
        "name": "commentId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "userId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "name": "LighthouseCIDAdded",
    "type": "event",
    "inputs": [
      {
        "name": "postId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "cid",
        "type": "string",
        "indexed": true,
        "internalType": "string"
      }
    ],
    "anonymous": false
  },
  {
    "name": "LighthouseMetadataUpdated",
    "type": "event",
    "inputs": [
      {
        "name": "postId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "metadata",
        "type": "string",
        "indexed": false,
        "internalType": "string"
      }
    ],
    "anonymous": false
  },
  {
    "name": "PostCreated",
    "type": "event",
    "inputs": [
      {
        "name": "postId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "authorId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "name": "PostDeleted",
    "type": "event",
    "inputs": [
      {
        "name": "postId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "name": "PostLiked",
    "type": "event",
    "inputs": [
      {
        "name": "postId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "userId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "name": "PostUpdated",
    "type": "event",
    "inputs": [
      {
        "name": "postId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "name": "RewardEarned",
    "type": "event",
    "inputs": [
      {
        "name": "userId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "points",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      },
      {
        "name": "source",
        "type": "uint8",
        "indexed": false,
        "internalType": "uint8"
      }
    ],
    "anonymous": false
  },
  {
    "name": "UserRegistered",
    "type": "event",
    "inputs": [
      {
        "name": "userId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "userAddress",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "name": "POINTS_PER_COMMENT",
    "type": "function",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "POINTS_PER_LIKE",
    "type": "function",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "POINTS_PER_POST",
    "type": "function",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "POINTS_PER_READ",
    "type": "function",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "addComment",
    "type": "function",
    "inputs": [
      {
        "name": "postId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "commentText",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "parentCommentId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "name": "addressToUserId",
    "type": "function",
    "inputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "comments",
    "type": "function",
    "inputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "userId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "postId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "commentText",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "timestamp",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "likesCount",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "parentCommentId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "exists",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "createPost",
    "type": "function",
    "inputs": [
      {
        "name": "postData",
        "type": "tuple",
        "components": [
          {
            "name": "title",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "content",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "tags",
            "type": "string[]",
            "internalType": "string[]"
          },
          {
            "name": "visibility",
            "type": "uint8",
            "internalType": "uint8"
          },
          {
            "name": "imageCid",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "lighthouseMetadata",
            "type": "string",
            "internalType": "string"
          }
        ],
        "internalType": "struct Blog.PostData"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "name": "deletePost",
    "type": "function",
    "inputs": [
      {
        "name": "postId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "name": "getComment",
    "type": "function",
    "inputs": [
      {
        "name": "commentId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "tuple",
        "components": [
          {
            "name": "userId",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "postId",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "commentText",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "timestamp",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "likesCount",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "parentCommentId",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "exists",
            "type": "bool",
            "internalType": "bool"
          }
        ],
        "internalType": "struct Blog.Comment"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "getPost",
    "type": "function",
    "inputs": [
      {
        "name": "postId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "tuple",
        "components": [
          {
            "name": "authorId",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "title",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "content",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "tags",
            "type": "string[]",
            "internalType": "string[]"
          },
          {
            "name": "createdAt",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "updatedAt",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "visibility",
            "type": "uint8",
            "internalType": "uint8"
          },
          {
            "name": "viewCount",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "likesCount",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "commentsCount",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "onChainHash",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "imageCid",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "lighthouseMetadata",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "exists",
            "type": "bool",
            "internalType": "bool"
          }
        ],
        "internalType": "struct Blog.Post"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "getReadSessions",
    "type": "function",
    "inputs": [
      {
        "name": "postId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "tuple[]",
        "components": [
          {
            "name": "userId",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "postId",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "timeSpentReading",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "scrollPercentage",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "deviceInfo",
            "type": "string",
            "internalType": "string"
          }
        ],
        "internalType": "struct Blog.ReadSession[]"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "getUser",
    "type": "function",
    "inputs": [
      {
        "name": "userId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "tuple",
        "components": [
          {
            "name": "username",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "email",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "bio",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "profilePictureUrl",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "joinedDate",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "totalPosts",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "totalEngagements",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "rewardPoints",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "exists",
            "type": "bool",
            "internalType": "bool"
          }
        ],
        "internalType": "struct Blog.User"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "getUserRewards",
    "type": "function",
    "inputs": [
      {
        "name": "userId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "tuple[]",
        "components": [
          {
            "name": "userId",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "source",
            "type": "uint8",
            "internalType": "uint8"
          },
          {
            "name": "pointsEarned",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "timestamp",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "transactionHash",
            "type": "string",
            "internalType": "string"
          }
        ],
        "internalType": "struct Blog.Reward[]"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "likeComment",
    "type": "function",
    "inputs": [
      {
        "name": "commentId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "name": "likePost",
    "type": "function",
    "inputs": [
      {
        "name": "postId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "name": "owner",
    "type": "function",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "posts",
    "type": "function",
    "inputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "authorId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "title",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "content",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "createdAt",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "updatedAt",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "visibility",
        "type": "uint8",
        "internalType": "uint8"
      },
      {
        "name": "viewCount",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "likesCount",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "commentsCount",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "onChainHash",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "imageCid",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "lighthouseMetadata",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "exists",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "readSessions",
    "type": "function",
    "inputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "userId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "postId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "timeSpentReading",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "scrollPercentage",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "deviceInfo",
        "type": "string",
        "internalType": "string"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "recordReadSession",
    "type": "function",
    "inputs": [
      {
        "name": "postId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "timeSpentReading",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "scrollPercentage",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "deviceInfo",
        "type": "string",
        "internalType": "string"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "name": "registerUser",
    "type": "function",
    "inputs": [
      {
        "name": "username",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "email",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "bio",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "profilePictureUrl",
        "type": "string",
        "internalType": "string"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "name": "updateLighthouseMetadata",
    "type": "function",
    "inputs": [
      {
        "name": "postId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "metadata",
        "type": "string",
        "internalType": "string"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "name": "updatePost",
    "type": "function",
    "inputs": [
      {
        "name": "postId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "postData",
        "type": "tuple",
        "components": [
          {
            "name": "title",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "content",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "tags",
            "type": "string[]",
            "internalType": "string[]"
          },
          {
            "name": "visibility",
            "type": "uint8",
            "internalType": "uint8"
          },
          {
            "name": "imageCid",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "lighthouseMetadata",
            "type": "string",
            "internalType": "string"
          }
        ],
        "internalType": "struct Blog.PostData"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "name": "userRewards",
    "type": "function",
    "inputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "userId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "source",
        "type": "uint8",
        "internalType": "uint8"
      },
      {
        "name": "pointsEarned",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "timestamp",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "transactionHash",
        "type": "string",
        "internalType": "string"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "users",
    "type": "function",
    "inputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "username",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "email",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "bio",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "profilePictureUrl",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "joinedDate",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "totalPosts",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "totalEngagements",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "rewardPoints",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "exists",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "stateMutability": "view"
  },
  {
    "name": "validateLighthouseCID",
    "type": "function",
    "inputs": [
      {
        "name": "cid",
        "type": "string",
        "internalType": "string"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "stateMutability": "pure"
  }
];

export default BlogABI;