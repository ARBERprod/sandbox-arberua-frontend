export const nextTick = async () => new Promise((res) => {
  setTimeout(res, 0);
});
