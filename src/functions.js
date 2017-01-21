const isNumber = x => typeof x === 'number' &&
         !isNaN(x) &&
         x !== Infinity;

export const validate = (text) => {
  let data;
  try {
    data = JSON.parse(text);
    if (typeof data[0] === 'string' &&
        new Date(data[1]).toString() !== 'Invalid Date' &&
        isNumber(data[1]) && data[1] > 0 &&
        Array.isArray(data[2]) &&
        data[2].filter(item => !isNumber(item) || item <= 0).length === 0 &&
        isNumber(data[3]) &&
        isNumber(data[4]) && data[4] > 0
    ) {
      return true;
    }
  } catch (e) {
    console.error(`Invalidated psst: ${text}`);
    return false;
  }
  return false;
};

export const iterate = (text) => {
  const data = JSON.parse(text);
  return JSON.stringify(data);
};

export const normalize = (text) => {
  try {
    const data = JSON.parse(text);
    const newPsst = [
      data[0],
      data[1] === -1 ? new Date().getTime() : data[1],
      data[2],
      data[3] ? data[3] : 1,
      data[4] ? data[4] : 1,
    ];
    return JSON.stringify(newPsst);
  } catch (e) {
    console.error(e);
    return text;
  }
};
