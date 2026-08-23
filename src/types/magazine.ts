export interface MagazineArticleItem {
  section: string;
  title: string;
  excerpt?: string;
}

export interface MagazineData {
  id: string;
  title: string;
  category: string;
  publishDate: string;
  path: string;
  thumbPath: string;
  articles: MagazineArticleItem[];
  isLocked?: boolean;
}

export interface MagazineCategoryGroup {
  category: string;
  totalCount: number;
  magazines: MagazineData[];
}

export interface MagazineCategoriesResponse {
  version: string;
  updatedAt: string;
  totalVolumes: number;
  categories: MagazineCategoryGroup[];
}

export interface FeaturedSpotlightArticle {
  volId: string;
  volTitle: string;
  section: string;
  title: string;
  category: string;
}
