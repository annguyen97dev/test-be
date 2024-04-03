import { BSC_NETWORK_URL } from "../constant/config.js";
import Web3 from "web3";

import moment from "moment";
import { ethers } from "ethers";

const useWeb3 = (networkUrl) => {
  return new Web3(
    new Web3.providers.HttpProvider(networkUrl ? networkUrl : BSC_NETWORK_URL)
  );
};

const useTryCatch = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

const createRefCode = (length) => {
  const onCreateCode = () => {
    let result = "";
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  };

  let refCode = "";

  const checkIsExistCode = async (refCode) => {
    let check = await User.findOne({ refCode, isRegister: true });
    return check;
  };

  for (let i = 0; i < 10; i++) {
    refCode = onCreateCode();
    let check = checkIsExistCode(refCode);
    if (!check) {
      break;
    }
  }

  return refCode;
};

const convertToDayArr = (dayString) => {
  let arr = dayString.split("/").map(function (item) {
    return parseInt(item);
  });

  let newArr = [...arr];
  newArr[0] = arr[2];
  newArr[2] = arr[0];
  return newArr;
};

const getDifBetweenDay = (newDay, oldDay) => {
  if (!newDay || !oldDay) {
    return 0;
  }

  let oldDayDif = moment(convertToDayArr(oldDay));
  let newDayDif = moment(convertToDayArr(newDay));

  const diffResult = newDayDif.diff(oldDayDif, "days");
  return diffResult;
};

const getCurrentQuarter = () => {
  const startDayString = process.env.START_DAY;
  const currentDayString = moment().format("DD/MM/YYYY");

  let activeQuarter = getDifBetweenDay(currentDayString, startDayString);

  if (activeQuarter < 100) {
    return 1;
  }

  let guestQuarter = Math.floor(activeQuarter / 100);
  activeQuarter = parseFloat(activeQuarter / 100);
  if (activeQuarter > guestQuarter) {
    return guestQuarter;
  }
  return guestQuarter - 1;
};

const signMessage = async (privateKey, message) => {
  const signer = new ethers.Wallet(privateKey);

  return signer.signMessage(message);
};

const getRandomHunter = () => {};

const returnBadRequest = (err, req, res, next) => {
  res.status(err.status || 500).send({ success: false, message: err.message });
};

export {
  useWeb3,
  createRefCode,
  convertToDayArr,
  getDifBetweenDay,
  getCurrentQuarter,
  signMessage,
  useTryCatch,
  returnBadRequest,
};
