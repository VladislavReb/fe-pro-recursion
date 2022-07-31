/**
 * Принимает два объекта, должна вернуть или true или false, если объекты идентичны внутри, возвращает
 * true, если есть различие, false. То есть проверяет каждое свойство, вне зависимости от вложенности,
 * делаем через рекурсию(а других вариантов и нет)
 */
export const deepEqual = (obj, anotherObject) => {
  if (typeof obj === 'object' && typeof anotherObject === 'object') {
    for (let [key, value] of Object.entries(obj)) {
      for (let [key2, value2] of Object.entries(anotherObject)) {
        if (typeof value === 'object' || typeof value2 === 'object') {
          return deepEqual([key, value], [key2, value2]);
        } else if (key === key2 && value === value2) {
          return true;
        } else {
          return false;
        }
      }
    }
  } else {
    return obj === anotherObject;
  }
};

/**
 * Принимает объект, возвращает его глубокую копию, то есть ни одно свойство
 * не является ссылочным у другого объекта, точно возвращает новое.
 * Если это массив, возвращает новый массив(map) и если элемент массива не простого типа,
 * то тогда в рекурсию. С объектом также. Поскольку массив при typeof возвращает object, чтобы
 * их различить берем метод Array.isArray и он на массивах вернет тру
 */
export const deepCopy = (obj) => {
  if (typeof obj !== 'object' && !Array.isArray(obj)) {
    return obj;
  } else if (Array.isArray(obj)) {
    return obj.map((value) => {
      return deepCopy(value);
    });
  } else if (typeof obj === 'object') {
    let result = {};
    for (let x in obj) {
      result[x] = deepCopy(obj[x]);
    }
    return result;
  }
};

/**
 * Мы передаем объект, и должны вернуть массив уникальных названий свойств
 * То есть если у нас объект { name: { bohdan: { name: 'test' } } } вернет ['name', 'bohdan']
 */
export const getAllObjectKeys = (obj) => {
  return Object.entries(obj).reduce((accum, item) => {
    let result = '';
    if (typeof item[1] === 'object') {
      result = [...accum, item[0], ...getAllObjectKeys(item[1])];
      return [...new Set(result)];
    } else {
      result = [...accum, item[0]];
      return [...new Set(result)];
    }
  }, []);
};
