const info = (item) => {
  return (
    !item.title ||
    !item.description ||
    !item.price ||
    !item.thumbnail ||
    !item.code ||
    !item.stock ||
    !item.category
  );
};

module.exports = { info };
