# Supply Chain Management System with Blockchain Integration

This project aims to address the existing issues in supply chain management by applying blockchain technology and smart contracts. The primary focus is on securing data, reducing the need for intermediaries, and overcoming geographical barriers in business operations.

## 🎯 **Project Objectives**

With the current challenges and existing problems in the real-world supply chain, our project aims to achieve the following goals:

- **Data Security and Integrity:** Prevent data tampering, fraud, or unauthorized changes for personal gain.
- **Geographical Optimization:** Allow people from different locations worldwide to communicate and participate in a contract.
- **Dispute Resolution:** Minimize the role of intermediaries and efficiently resolve contract disputes.

To accomplish these objectives, we propose the following solution:

### 🚀 **Solution: Blockchain and Smart Contracts**

We implement blockchain and smart contracts to resolve issues related to contract data protection, minimize the role of intermediaries, reduce costs, and eliminate geographical barriers in supply chain management system operations.

## 📦 **Supply Chain Overview**

### **What is a Supply Chain?**

The supply chain, also known as the chain of supply, encompasses a series of activities and processes related to producing, transporting, and distributing products from suppliers to the final customers. This process covers everything from sourcing raw materials to delivering the finished product to the customer.

### **Key Operations**

In the supply chain, multiple operations are interconnected, including sales, production, promotion, payment, and distribution. In this project, we focus on two critical operations: **Sales** and **Payment**.

## 💻 **Technology Stack**

### **Frontend:**
- **Framework:** Next.js
- **UI Library:** ShadcnUI, TailwindCSS
- **Programming Language:** TypeScript
- **Blockchain Integration:** Web3.js
- **Real-time Communication:** WebSocket

### **Backend:**
- **Smart Contracts:** Solidity, Hardhat
- **Framework:** NestJS
- **Database:** PostgreSQL (with Prisma ORM)
- **Caching:** Redis
- **Containerization:** Docker
- **Package Manager:** Yarn

## ⚙️ **System Workflow**

### **Contract Creation:**
- Users create a contract, inviting relevant individuals such as corporate lawyers, secretaries, and accountants with specific roles and permissions.
- Once a blank contract is created, an invitation is sent to involved users via email.

### **Contract Development:**
- Participants collaboratively edit and finalize the contract.
- The contract is then deployed on a blockchain network using Solidity smart contracts via Hardhat.
- Both parties sign the contract using digital signatures.

### **Payment and Contract Execution:**
- The buyer transfers tokens to the contract based on the agreed value.
- If the buyer does not transfer the payment within the specified time, the contract is terminated unconditionally.
- Once the payment is made, the involved parties fulfill their obligations according to the contract.
- The seller confirms the completion of their contractual obligations.

### **Dispute Resolution:**
- The system, built with NestJS, requests confirmation from the buyer.
- If the buyer agrees, the contract automatically enables the withdrawal feature based on the agreement.
- If the buyer disagrees, a dispute contract is initiated, involving a third party.
- An economic arbitrator will assess the situation and decide based on a 49-51 voting mechanism.
- The third-party decision is final, and tokens are unlocked according to the regulations.

## 🔄 **Key Differences from Existing Products**

Compared to other products on the market, such as VNPT's eContract, our project addresses several shortcomings:

- **Data Integrity:** Contracts are stored as images and hashed, which makes it impossible to automatically compare data if there are changes in the database.
- **Automation:** Our system supports automatic payment processing and reduces the role of third parties.

## 🎉 **Achieved Results**

- **Blockchain and Smart Contracts:** Successful implementation in the system to resolve existing issues.
- **Automation:** Automating contract execution and payment processes.
- **Risk Reduction:** Minimizing fraud, risks, and reliance on third parties.
- **Cost Efficiency:** Addressing issues related to costs and geographical barriers.
- **Environmental Protection:** Reducing paper usage and enhancing idea communication efficiency.

## 🛠 **Pending Challenges**

- **Time Constraints:** Lack of time to complete a comprehensive system.
- **Supply Chain Operations:** Not all supply chain operations have been applied.
- **KYC Integration:** KYC has yet to be implemented in the system.
- **Intermediary Role in Disputes:** In cases of disputes, the role of intermediaries still exists, and further research is needed to minimize dependence on them.

## 📄 **How to Get Started**

### **Frontend:**

1. **Clone the repository:**
   ```bash
   git clone https://github.com/auroraphtgrp01/FE_NCKH_2024.git
Install dependencies:

bash
Copy code
cd your-frontend-project
npm install
Start the development server:

bash
Copy code
npm run dev
Deploy the smart contracts:

Ensure you have a blockchain network running (e.g., Ganache or any testnet).
Deploy your smart contracts using the Web3.js library.
Connect the frontend with the blockchain network:

Integrate the Web3.js configuration in your Next.js application.
Backend:
Clone the repository:

bash
Copy code
git clone https://github.com/your-backend-repo.git
Install dependencies:

bash
Copy code
cd your-backend-project
yarn install
Set up Docker containers:

Ensure Docker is installed and running on your system.
Run the following command to start your containers:
bash
Copy code
docker-compose up -d
Database setup with Prisma:

Run the following command to migrate your database:
bash
Copy code
yarn prisma migrate dev
Deploy the smart contracts:

Ensure you have Hardhat configured with your project.
Deploy your Solidity smart contracts using Hardhat:
bash
Copy code
yarn hardhat run scripts/deploy.js --network <your-network>
Run the backend server:

bash
Copy code
yarn start:dev
📝 Contributing
We welcome contributions from the community. Please read our contributing guidelines for more information on how to get involved.

📜 License
This project is licensed under the MIT License.
