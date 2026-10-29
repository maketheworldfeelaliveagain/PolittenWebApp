import mockData from './politten.json';

export const parties = mockData.parties;
export const statuses = mockData.statuses;
export const promises = mockData.promises;
export const categories = [...new Set(promises.map((promise) => promise.category))].sort((a, b) => a.localeCompare(b, 'lt'));

export type PromiseItem = (typeof promises)[number];
