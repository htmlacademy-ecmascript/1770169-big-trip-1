const toCapitalize = (word) => {
  const lower = word.toLowerCase();
  return lower[0].toUpperCase() + lower.slice(1);
};

const getDestinationNames = (destinations) => [...new Set(destinations.map((destination) => destination.name))];

const getPriceSum = (points) => points.map((point) => point.basePrice).reduce((accumulator, value) => accumulator + value, 0);

export {toCapitalize, getDestinationNames, getPriceSum};
