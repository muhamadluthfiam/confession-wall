export const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
export const abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address"
      },
      {
        indexed: false,
        internalType: "string",
        name: "message",
        type: "string"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256"
      }
    ],
    name: "NewConfession",
    type: "event"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    name: "confessions",
    outputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address"
      },
      {
        internalType: "string",
        name: "message",
        type: "string"
      },
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "getAllConfessions",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "sender",
            type: "address"
          },
          {
            internalType: "string",
            name: "message",
            type: "string"
          },
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256"
          }
        ],
        internalType: "struct ConfessionWall.Confession[]",
        name: "",
        type: "tuple[]"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_message",
        type: "string"
      }
    ],
    name: "submitConfession",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    stateMutability: "view",
    type: "function"
  }
]
