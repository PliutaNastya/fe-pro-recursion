/**
 * Принимает два объекта, должна вернуть или true или false, если объекты идентичны внутри, возвращает
 * true, если есть различие, false. То есть проверяет каждое свойство, вне зависимости от вложенности,
 * делаем через рекурсию(а других вариантов и нет)
 */
export const deepEqual = (obj, anotherObject) => {
  function deepValue(object) {
    return Object.values(object).reduce((accum, value) => {
      if (typeof value === 'object') {
        return [...accum, ...deepValue(value)].toString();
      }
      return [...accum, value].toString();
    }, [].toString());
  }

  return deepValue(obj) === deepValue(anotherObject);
};

/**
 * Принимает объект, возвращает его глубокую копию, то есть ни одно свойство
 * не является ссылочным у другого объекта, точно возвращает новое.
 * Если это массив, возвращает новый массив(map) и если элемент массива не простого типа,
 * то тогда в рекурсию. С объектом также. Поскольку массив при typeof возвращает object, чтобы
 * их различить берем метод Array.isArray и он на массивах вернет тру
 */
export const deepCopy = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map(deepCopy);
  }
  if (typeof obj !== 'object') {
    return obj;
  }
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [key, deepCopy(value)])
  );
};

/**
 * Мы передаем объект, и должны вернуть массив уникальных названий свойств
 * То есть если у нас объект { name: { bohdan: { name: 'test' } } } вернет ['name', 'bohdan']
 */
export const getAllObjectKeys = (obj) => {
  return Object.entries(obj).reduce((accum, [key, value]) => {
    if (typeof value === 'object') {
      accum.push(...[key, ...getAllObjectKeys(value)]);
    } else {
      accum.push(key);
    }
    return [...new Set(accum)];
  }, []);
};
