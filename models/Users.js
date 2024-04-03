import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
  idTest: String,
  enable: {
    type: Boolean,
    default: true,
  },
  userAddress: {
    type: String,
    required: true,
  },
  referrals: {
    type: [String],
    default: [],
  },
  enableAr: {
    type: Boolean,
    default: false,
  },
  referralBy: {
    type: String,
    default: "",
  },
  totalIncome: {
    amountToken: {
      type: Number,
      default: 0,
    },
    amountUSDT: {
      type: Number,
      default: 0,
    },
  },
  totalStaked: {
    amountToken: {
      type: Number,
      default: 0,
    },
    amountUSDT: {
      type: Number,
      default: 0,
    },
  },
  totalClaim: {
    amountToken: {
      type: Number,
      default: 0,
    },
    amountUSDT: {
      type: Number,
      default: 0,
    },
  },
  totalRefBonous: {
    amountToken: {
      type: Number,
      default: 0,
    },
    amountUSDT: {
      type: Number,
      default: 0,
    },
  },
  nonce: {
    luckyMoney: {
      type: Number,
      default: 0,
    },
  },
  rewardGameClaimed: {
    luckyMoney: {
      type: Number,
      default: 0,
    },
  },
  rewardGameRemaining: {
    luckyMoney: {
      type: Number,
      default: 0,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const HistoryClaimGameSchema = new mongoose.Schema({
  transactionHash: { type: String, required: true },
  userAddress: { type: String },
  tokenPaymentAddress: { type: String },
  type: { type: Number }, // type 0 is game, 1 mining
  nonce: { type: Number, default: 0 },
  amountWithdraw: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const Users = mongoose.model("users", UsersSchema);
const HistoryClaimGames = mongoose.model(
  "historyClaimGames",
  HistoryClaimGameSchema
);

export { Users, HistoryClaimGames };
