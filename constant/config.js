import * as dotenv from "dotenv";
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const BSC_NETWORK_URL = process.env.BSC_NETWORK_URL || "";
const BSC_CHAIN_ID = process.env.BSC_CHAIN_ID || "";
const STAKING_HASH = process.env.STAKING_HASH || "";
const REFERRAL_HASH = process.env.REFERRAL_HASH || "";
const USDT_ADDRESS = process.env.USDT_ADDRESS || "";
const M2E_ADDRESS = process.env.M2E_ADDRESS || "";

export {
  BSC_NETWORK_URL,
  BSC_CHAIN_ID,
  STAKING_HASH,
  REFERRAL_HASH,
  M2E_ADDRESS,
  USDT_ADDRESS,
};
