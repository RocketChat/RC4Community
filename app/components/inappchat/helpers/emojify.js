// TODO: Use joypixels from NPM package rather than <Script />

export default function emojify(message) {
  return joypixels.toImage(message);
};
