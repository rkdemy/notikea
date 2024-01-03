export const formatPrice = (price) => {
  const newPrice = Intl.NumberFormat("en-AU", {
    currency: "AUD",
    style: "currency",
  }).format(price / 100);

  return newPrice;
};

export const getUniqueValues = (data, type) => {
  let unique = data.map((item) => item[type]);
  return ["all", ...new Set(unique)];
};
