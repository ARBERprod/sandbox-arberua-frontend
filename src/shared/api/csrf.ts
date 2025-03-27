export const csrf = async () => {
  await fetch(`${process.env.NEXT_PUBLIC_API_URL_BASE}/sanctum/csrf-cookie`);
};
