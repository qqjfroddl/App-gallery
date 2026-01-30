
export const DEFAULT_CATEGORIES = {
  ALL: '전체',
  SIDE_PROJECT: '사이드 프로젝트',
  CLIENT_WORK: '클라이언트 외주',
  LABS: '실험실',
} as const;

export interface Project {
  id: string;
  name: string;
  url: string;
  categories: string[]; // 다중 카테고리 지원을 위해 배열로 변경
  imageUrl: string;
  description?: string;
  addedAt: Date;
}

export interface PortfolioStats {
  activeApps: number;
  totalUsageRate: number;
}
