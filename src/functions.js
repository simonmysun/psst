import notification from './notification';

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
    // console.error(`Invalidated psst: ${text}`);
    return false;
  }
  return false;
};

export const iterate = (text) => {
  /*
  (
    name,
    initTime,
    periods,
    proportion,
    count
  ) => (
    count >= 0 ? [
      name,
      initTime + periods.pop(),
      periods,
      proportion,
      count - 1
    ] : null);
  */
  const data = JSON.parse(text);
  return data[4] > 1 ? JSON.stringify(data[2].length > 1 ? [
    data[0],
    data[1] + data[2].pop(),
    data[2],
    data[3],
    data[4] - 1,
  ] : [
    data[0],
    data[1] + data[2][0],
    [
      data[2] * data[3],
    ],
    data[3],
    data[4] - 1,
  ]) : null;
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

notification.permissionRequest();

/*
   notify({
   title: '123',
   body: '456',
   icon: '789',
   });
 */
export const notify = (n) => {
  // Play sound
  notification.showNotification(n);
};
