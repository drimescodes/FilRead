// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Blog {
    // Owner management
    address public owner;
    
    // Counter implementation
    struct Counter {
        uint256 _value;
    }
    
    function increment(Counter storage counter) internal {
        counter._value += 1;
    }
    
    function current(Counter storage counter) internal view returns (uint256) {
        return counter._value;
    }
    
    // Structs
    struct User {
        string username;
        string email;
        string bio;
        string profilePictureUrl;
        uint256 joinedDate;
        uint256 totalPosts;
        uint256 totalEngagements;
        uint256 rewardPoints;
        bool exists;
    }

    struct Post {
        uint256 authorId;
        string title;
        string content;
        string[] tags;
        uint256 createdAt;
        uint256 updatedAt;
        uint8 visibility; // 0: public, 1: private, 2: draft
        uint256 viewCount;
        uint256 likesCount;
        uint256 commentsCount;
        string onChainHash;
        bool exists;
    }

    struct Comment {
        uint256 userId;
        uint256 postId;
        string commentText;
        uint256 timestamp;
        uint256 likesCount;
        uint256 parentCommentId;
        bool exists;
    }

    struct Reward {
        uint256 userId;
        uint8 source; // 0: content_creation, 1: content_engagement, 2: content_read, 3: gifted
        uint256 pointsEarned;
        uint256 timestamp;
        string transactionHash;
    }

    struct ReadSession {
        uint256 userId;
        uint256 postId;
        uint256 timeSpentReading;
        uint256 scrollPercentage;
        string deviceInfo;
    }

    // Mappings
    mapping(address => uint256) public addressToUserId;
    mapping(uint256 => User) public users;
    mapping(uint256 => Post) public posts;
    mapping(uint256 => Comment) public comments;
    mapping(uint256 => Reward[]) public userRewards;
    mapping(uint256 => ReadSession[]) public readSessions;

    // Counters
    Counter private _userIdCounter;
    Counter private _postIdCounter;
    Counter private _commentIdCounter;

    // Events
    event UserRegistered(uint256 indexed userId, address indexed userAddress);
    event PostCreated(uint256 indexed postId, uint256 indexed authorId);
    event PostUpdated(uint256 indexed postId);
    event PostDeleted(uint256 indexed postId);
    event CommentAdded(uint256 indexed commentId, uint256 indexed postId);
    event PostLiked(uint256 indexed postId, uint256 indexed userId);
    event CommentLiked(uint256 indexed commentId, uint256 indexed userId);
    event RewardEarned(uint256 indexed userId, uint256 points, uint8 source);

    // Constants
    uint256 public constant POINTS_PER_POST = 100;
    uint256 public constant POINTS_PER_LIKE = 10;
    uint256 public constant POINTS_PER_COMMENT = 20;
    uint256 public constant POINTS_PER_READ = 5;

    // Modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    modifier nonReentrant() {
        require(!_reentrancyGuard, "Reentrant call");
        _reentrancyGuard = true;
        _;
        _reentrancyGuard = false;
    }

    // Reentrancy guard
    bool private _reentrancyGuard;

    constructor() {
        owner = msg.sender;
        increment(_userIdCounter); // Start from 1
    }

    // User Management Functions
    function registerUser(
        string memory username,
        string memory email,
        string memory bio,
        string memory profilePictureUrl
    ) external nonReentrant {
        require(addressToUserId[msg.sender] == 0, "User already registered");
        require(bytes(username).length > 0, "Username cannot be empty");

        uint256 userId = current(_userIdCounter);
        addressToUserId[msg.sender] = userId;

        users[userId] = User({
            username: username,
            email: email,
            bio: bio,
            profilePictureUrl: profilePictureUrl,
            joinedDate: block.timestamp,
            totalPosts: 0,
            totalEngagements: 0,
            rewardPoints: 0,
            exists: true
        });

        increment(_userIdCounter);
        emit UserRegistered(userId, msg.sender);
    }

    // Post Management Functions
    function createPost(
        string memory title,
        string memory content,
        string[] memory tags,
        uint8 visibility
    ) external nonReentrant {
        uint256 userId = addressToUserId[msg.sender];
        require(userId != 0, "User not registered");
        require(bytes(title).length > 0, "Title cannot be empty");
        require(visibility <= 2, "Invalid visibility setting");

        uint256 postId = current(_postIdCounter);
        posts[postId] = Post({
            authorId: userId,
            title: title,
            content: content,
            tags: tags,
            createdAt: block.timestamp,
            updatedAt: block.timestamp,
            visibility: visibility,
            viewCount: 0,
            likesCount: 0,
            commentsCount: 0,
            onChainHash: "",
            exists: true
        });

        users[userId].totalPosts++;
        increment(_postIdCounter);

        // Award points for content creation
        _awardPoints(userId, POINTS_PER_POST, 0);
        emit PostCreated(postId, userId);
    }

    function updatePost(
        uint256 postId,
        string memory title,
        string memory content,
        string[] memory tags,
        uint8 visibility
    ) external nonReentrant {
        require(posts[postId].exists, "Post does not exist");
        require(posts[postId].authorId == addressToUserId[msg.sender], "Not the author");
        require(visibility <= 2, "Invalid visibility setting");

        posts[postId].title = title;
        posts[postId].content = content;
        posts[postId].tags = tags;
        posts[postId].visibility = visibility;
        posts[postId].updatedAt = block.timestamp;

        emit PostUpdated(postId);
    }

    function deletePost(uint256 postId) external nonReentrant {
        require(posts[postId].exists, "Post does not exist");
        require(posts[postId].authorId == addressToUserId[msg.sender], "Not the author");

        posts[postId].exists = false;
        users[posts[postId].authorId].totalPosts--;

        emit PostDeleted(postId);
    }

    // Engagement Functions
    function addComment(uint256 postId, string memory commentText, uint256 parentCommentId) external nonReentrant {
        require(posts[postId].exists, "Post does not exist");
        uint256 userId = addressToUserId[msg.sender];
        require(userId != 0, "User not registered");

        uint256 commentId = current(_commentIdCounter);
        comments[commentId] = Comment({
            userId: userId,
            postId: postId,
            commentText: commentText,
            timestamp: block.timestamp,
            likesCount: 0,
            parentCommentId: parentCommentId,
            exists: true
        });

        posts[postId].commentsCount++;
        users[userId].totalEngagements++;
        increment(_commentIdCounter);

        // Award points for commenting
        _awardPoints(userId, POINTS_PER_COMMENT, 1);
        emit CommentAdded(commentId, postId);
    }

    function likePost(uint256 postId) external nonReentrant {
        require(posts[postId].exists, "Post does not exist");
        uint256 userId = addressToUserId[msg.sender];
        require(userId != 0, "User not registered");

        posts[postId].likesCount++;
        users[userId].totalEngagements++;

        // Award points for liking
        _awardPoints(userId, POINTS_PER_LIKE, 1);
        emit PostLiked(postId, userId);
    }

    function likeComment(uint256 commentId) external nonReentrant {
        require(comments[commentId].exists, "Comment does not exist");
        uint256 userId = addressToUserId[msg.sender];
        require(userId != 0, "User not registered");

        comments[commentId].likesCount++;
        users[userId].totalEngagements++;

        // Award points for liking
        _awardPoints(userId, POINTS_PER_LIKE, 1);
        emit CommentLiked(commentId, userId);
    }

    // Reading Session Functions
    function recordReadSession(
        uint256 postId,
        uint256 timeSpentReading,
        uint256 scrollPercentage,
        string memory deviceInfo
    ) external nonReentrant {
        require(posts[postId].exists, "Post does not exist");
        uint256 userId = addressToUserId[msg.sender];
        require(userId != 0, "User not registered");

        readSessions[postId].push(ReadSession({
            userId: userId,
            postId: postId,
            timeSpentReading: timeSpentReading,
            scrollPercentage: scrollPercentage,
            deviceInfo: deviceInfo
        }));

        posts[postId].viewCount++;

        // Award points for reading
        _awardPoints(userId, POINTS_PER_READ, 2);
    }

    // Internal Functions
    function _awardPoints(uint256 userId, uint256 points, uint8 source) internal {
        users[userId].rewardPoints += points;
        userRewards[userId].push(Reward({
            userId: userId,
            source: source,
            pointsEarned: points,
            timestamp: block.timestamp,
            transactionHash: ""
        }));
        emit RewardEarned(userId, points, source);
    }

    // View Functions
    function getUser(uint256 userId) external view returns (User memory) {
        return users[userId];
    }

    function getPost(uint256 postId) external view returns (Post memory) {
        return posts[postId];
    }

    function getComment(uint256 commentId) external view returns (Comment memory) {
        return comments[commentId];
    }

    function getUserRewards(uint256 userId) external view returns (Reward[] memory) {
        return userRewards[userId];
    }

    function getReadSessions(uint256 postId) external view returns (ReadSession[] memory) {
        return readSessions[postId];
    }
} 