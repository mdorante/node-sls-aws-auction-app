const randomNum = () => Math.floor(Math.random() * 100);

const uuid = () =>
  `${randomNum()}${randomNum()}-${randomNum()}${randomNum()}-${randomNum()}${randomNum()}`;

module.exports.s3Id = uuid;
