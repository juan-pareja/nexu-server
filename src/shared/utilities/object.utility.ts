export const sortObject = (input: unknown): unknown => {
  if (Object.prototype.toString.call(input) !== '[object Object]') {
    return input;
  }

  if (Object.prototype.toString.call(input) === '[object Array]') {
    return (input as Array<unknown>).map(sortObject);
  }

  return Object.keys(input as Record<string, unknown>)
    .sort()
    .reduce((acc: Record<string, unknown>, key: string) => {
      acc[key] = sortObject((input as Record<string, unknown>)[key]);

      return acc;
    }, {} as unknown);
};

export const compareObjects = (a: unknown, b: unknown): boolean => {
  const sortedA = sortObject(a);
  const sortedB = sortObject(b);

  return JSON.stringify(sortedA) === JSON.stringify(sortedB);
};
