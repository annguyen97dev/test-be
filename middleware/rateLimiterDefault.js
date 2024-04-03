import rateLimit from "express-rate-limit";
import moment from "moment";

const limiterDefault = rateLimit({
  windowMs: 15 * 60 * 1000, // 24 hrs in milliseconds
  max: 500,
  message: "You have exceeded the 200 requests in 15 minutes limit!",
  standardHeaders: true,
  legacyHeaders: false,
});

const getMilliseconds = () => {
  const dateNow = moment.utc(new Date()).local().format("DD/MM/YYYY HH:mm");
  const endDay =
    moment.utc(new Date()).local().format("DD/MM/YYYY") + " " + "23:59";

  const duration = moment
    .utc(
      moment(endDay, "DD/MM/YYYY HH:mm").diff(
        moment(dateNow, "DD/MM/YYYY HH:mm")
      )
    )
    .format("HH:mm");

  const milliseconds =
    Number(duration.split(":")[0]) * 60 * 60 * 1000 +
    Number(duration.split(":")[1]) * 60 * 1000;

  return milliseconds;
};

const limiterGoalDailyRequest = rateLimit({
  windowMs: getMilliseconds(), // 24 hrs in milliseconds
  max: 1,
  message: "Too many requests",
  standardHeaders: true,
  legacyHeaders: false,
});

export { limiterDefault, limiterGoalDailyRequest };
