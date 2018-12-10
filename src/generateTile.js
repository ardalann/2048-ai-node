// @flow

const { CHANCE_OF_4 } = require("./config");

// eslint-disable-next-line no-magic-numbers
const generateTile = () => (Math.random() < CHANCE_OF_4 ? 4 : 2);

module.exports = generateTile;
