const { ethers } = require("hardhat");

async function main() {
    // Get signer
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    // Get the contract factory
    const Blog = await ethers.getContractFactory("Blog");
    
    // Deploy the contract
    console.log("Deploying Blog contract...");
    const blog = await Blog.deploy();
    
    // Wait for deployment to complete
    await blog.waitForDeployment();
    
    const blogAddress = await blog.getAddress();
    console.log("Blog contract deployed to:", blogAddress);
    
    // Log important contract information
    console.log("\nContract Information:");
    console.log("-------------------");
    console.log("Contract Address:", blogAddress);
    console.log("Owner Address:", await blog.owner());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });