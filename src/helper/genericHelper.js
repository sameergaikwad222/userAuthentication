const validateFilter = function (filter = "") {
  if (!filter || filter == "") {
    return undefined;
  }

  try {
    filter = JSON.parse(filter);
    const isInvalidFilter = Object.keys(filter).some((key) => {
      return ![
        "firstName",
        "lastName",
        "age",
        "contactDetails",
        "locationDetails",
        "statusId",
      ].includes(key);
    });
    if (isInvalidFilter) {
      return undefined;
    }
    return filter;
  } catch (error) {
    return undefined;
  }
};

module.exports = { validateFilter };
