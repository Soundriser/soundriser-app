export const apiFetcher = (...args) => fetch(...args).then((res) => res.json());
