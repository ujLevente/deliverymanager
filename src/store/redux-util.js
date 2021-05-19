export const isPending =
  (prefix = '') =>
  (action) =>
    action.type.startsWith(prefix) && action.type.endsWith('pending');

export const isFulfilled =
  (prefix = '') =>
  (action) =>
    action.type.startsWith(prefix) && action.type.endsWith('fulfilled');

export const isRejected =
  (prefix = '') =>
  (action) =>
    action.type.startsWith(prefix) && action.type.endsWith('rejected');
