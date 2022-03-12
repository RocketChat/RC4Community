import EmojiOne from 'emoji-toolkit';

export default function emojify(message) {
  return EmojiOne.toImage(message);
};
