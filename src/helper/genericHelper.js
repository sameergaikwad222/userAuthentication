const validateFilter = function (filter = "") {
  if (!filter || filter == "") {
    return undefined;
  }

  try {
    filter = JSON.parse(filter);
    return filter;
  } catch (error) {
    return undefined;
  }
};

module.exports = { validateFilter };
