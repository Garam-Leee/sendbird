/* eslint-disable func-names */
export const filterUndefinedAndEmptyStringValues = (obj = {}) => {
  return Object.entries(obj).reduce(
    (acc, [key, value]) =>
      value !== undefined && value !== '' ? { ...acc, [key]: value } : acc,
    {},
  );
};

export const convertJsonToQueryString = ({ isEscape = undefined, ...obj }) => {
  const filteredJson = filterUndefinedAndEmptyStringValues(obj);
  if (Object.keys(filteredJson).length === 0) {
    return '';
  }
  return `?${Object.entries(filteredJson)
    .map(([key, value]) => {
      if (isEscape && typeof value === 'string') {
        return `${isEscape ? escape(key) : key}=${
          isEscape ? escape(value) : value
        }`;
      }
      return `${key}=${value}`;
    })
    .join('&')}`;
};

// export const template = <
// 	T extends { [key: string]: string | number | boolean },
// >(
// 	strings: TemplateStringsArray,
// 	...keys: Array<string>
// ) => {
// 	return function (...values: Array<T>) {
// 		const dict = values[values.length - 1] || {};
// 		const result = [strings[0]];
// 		keys.forEach(function (key, i) {
// 			result.push(`${dict[key]}`, strings[i + 1]);
// 		});
// 		return result.join('');
// 	};
// };

export const template = (strings, ...keys) => {
  return function (...values) {
    const dict = values[values.length - 1] || {};
    const result = [strings[0]];
    keys.forEach(function (key, i) {
      const value = Number.isInteger(key) ? values[key] : dict[key];
      result.push(value, strings[i + 1]);
    });
    return result.join('');
  };
};
