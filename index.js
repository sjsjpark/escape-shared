const DEFAULT_CRAWL_PARAMS = {
  available: true,
  date: null,
  region: null,
  branch: null
};

const API_ROUTES = {
  sites: () => '/api/sites',
  siteBranches: (siteKey) => `/api/sites/${siteKey}/branches`,
  crawlAll: () => '/api/crawl-all',
  crawlSite: (siteKey) => `/api/crawl/${siteKey}`
};

function buildQueryString(params = {}) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') {
      return;
    }
    query.set(key, String(value));
  });
  const result = query.toString();
  return result ? `?${result}` : '';
}

function buildCrawlQueryString(overrides = {}) {
  const params = {
    ...DEFAULT_CRAWL_PARAMS,
    ...overrides
  };

  return buildQueryString({
    date: params.date,
    available: params.available === true ? 'true' : params.available === false ? 'false' : undefined,
    region: params.region,
    branch: params.branch
  });
}

function createApiUrl(baseUrl = '', path = '', queryParams) {
  const trimmedBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  const fullPath = path.startsWith('/') ? path : `/${path}`;
  return `${trimmedBase}${fullPath}${queryParams || ''}`;
}

export {
  API_ROUTES,
  buildQueryString,
  buildCrawlQueryString,
  createApiUrl,
  DEFAULT_CRAWL_PARAMS
};
