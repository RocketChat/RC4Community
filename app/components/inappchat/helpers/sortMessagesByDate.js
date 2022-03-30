export default function messagesSortedByDate(messagesArray) {
  return messagesArray?.sort(function (a, b) {
    return a.ts < b.ts ? -1 : a.ts > b.ts ? 1 : 0;
  });
};
