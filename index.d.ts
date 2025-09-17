export interface ThemeSlot {
  time: string;
  slotId: string;
  buttonText: string;
}

export interface Theme {
  themeId: string;
  themeName: string;
  description: string;
  imageUrl: string | null;
  availableSlots: ThemeSlot[];
  unavailableSlots: ThemeSlot[];
  totalSlots: number;
  branch: string;
  branchId: string;
  reservationUrl?: string;
  company?: string;
  companyName?: string;
  difficulty?: number;
  themeInfoNum?: number;
}

export interface BranchCrawlSuccess {
  success: true;
  branch: string;
  branchId: string;
  themes: Theme[];
  totalThemes: number;
  extractedAt: string;
  processingTimeMs?: number;
  method?: string;
  [key: string]: unknown;
}

export interface BranchCrawlFailure {
  success: false;
  branch?: string;
  branchId: string;
  error: string;
  themes: Theme[];
  [key: string]: unknown;
}

export type BranchCrawlResult = BranchCrawlSuccess | BranchCrawlFailure;

export interface SiteCrawlResult {
  success: boolean;
  company: string;
  companyName: string;
  totalBranches: number;
  successfulBranches: number;
  branches: Record<string, BranchCrawlResult>;
  extractedAt: string;
  method?: string;
  message?: string;
  [key: string]: unknown;
}

export interface CompanyInfo {
  company: string;
  name: string;
  description?: string;
  mainUrl?: string;
  logoUrl?: string;
  thumbnailUrl?: string;
}

export interface BranchSummary {
  id: string;
  name: string;
  fullName?: string;
  branchNumber?: number;
  regionCode?: string;
  [key: string]: unknown;
}

export interface SiteConfig {
  name: string;
  company: string;
  mainUrl?: string;
  baseUrl?: string;
  reservationUrl?: string;
  branches: BranchSummary[];
  excludedBranches?: string[];
  isCrawl?: boolean;
  [key: string]: unknown;
}

export const API_ROUTES: {
  sites: () => string;
  siteBranches: (siteKey: string) => string;
  crawlAll: () => string;
  crawlSite: (siteKey: string) => string;
};

export interface CrawlQueryOptions {
  available?: boolean;
  date?: string | null;
  region?: string | null;
  branch?: string | null;
}

export function buildQueryString(params?: Record<string, string | number | boolean | null | undefined>): string;
export function buildCrawlQueryString(options?: CrawlQueryOptions): string;
export function createApiUrl(baseUrl: string, path: string, queryParams?: string): string;

export const DEFAULT_CRAWL_PARAMS: Required<Pick<CrawlQueryOptions, 'available'>> & Omit<CrawlQueryOptions, 'available'>;
