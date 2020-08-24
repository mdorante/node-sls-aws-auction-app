const randomNum = () => Math.floor(Math.random() * 100);

const uuid = () =>
  `${randomNum()}${randomNum()}-${randomNum()}${randomNum()}-${randomNum()}${randomNum()}`;

//export const s3Id = uuid;
module.exports.s3Id = uuid;