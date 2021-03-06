import moment from 'moment-timezone';

export const sort = (data, key) => {
  var swapped = false;
  do {
    swapped = false;
    for (let i = 0; i < data.length-1; i++) {
      const val1 = data[i]
      const val2 = data[i+1]
      if (needsSwap(val1[key], val2[key]) > 0) {
        data[i] = val2;
        data[i+1] = val1;
        swapped = true;
      }
    }
  } while (swapped);

  return data;
}

const needsSwap = (first, second) => {
  if (typeof(first) === 'string') {
    return first.localeCompare(second) > 0;
  } else if (first instanceof moment) {
    return second.isAfter(first);
  } else throw 'unknown type ' + first
}

