export const generateCode = (prefix, category) => {
  const rand = Math.floor(100 + Math.random() * 900);
  return `${prefix}-${category}-${rand}`;
};
