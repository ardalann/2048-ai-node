// @flow

// eslint-disable-next-line no-magic-numbers
const generateTile = () => (Math.random() >= 0.9 ? 4 : 2);

module.exports = generateTile;
