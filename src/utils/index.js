import { getDateFromMilliseconds } from './common';

const formatDate = (milliseconds, split) => {
  const { year, month, day } = getDateFromMilliseconds(milliseconds);
  if(!split) {
    return `${year}年${month}月${day}日`;
  }
  return `${year}${split}${month}${split}${day}`;
}

const getDate = (milliseconds, type = ['year', 'month', 'day']) => {
  const date = getDateFromMilliseconds(milliseconds);
  let res = {};
  type.forEach(key => {
    res[key] = date[key];
  });
  return res
}

const throttle = (func, wait, immediate = true, context = this) => {
  let timer = null;
  return function(...args) {
    if(immediate) {
      func.apply(context, args);
      immediate = false;
    }
    if(!timer) {
      timer = setTimeout(function() {
        func.apply(context, args);
        timer = null;
      }, wait);
    }
  }
}

const countWord = (str) => {
  let len = str.length, count = 0;
  for(let i = 0; i < len; i++) {
    let charCode = str.charCodeAt(i);
    if(charCode >= 48 && charCode <= 57 
      || charCode >= 65 && charCode <= 90 
      || charCode >= 97 && charCode <= 122) {
      count++;
    } else {
      count += 2;
    }
  }
  return count;
}

export {
  formatDate,
  getDate,
  throttle,
  countWord
}