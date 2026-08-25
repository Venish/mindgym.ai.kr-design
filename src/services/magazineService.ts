import {
  MagazineCategoriesResponse,
  MagazineData,
  MagazineCategoryGroup,
  FeaturedSpotlightArticle,
} from "@/types/magazine";
import { MAGAZINE_MASTER_DATA, getMagazineByVolId } from "@/data/magazineData";

function mapMasterToMagazineData(item: (typeof MAGAZINE_MASTER_DATA)[0]): MagazineData {
  const articles = (item.articles || []).map((art) => ({
    section: art.section || item.category,
    title: art.title || item.title,
    excerpt: art.excerpt || item.editorNote,
  }));

  return {
    id: item.volId,
    title: item.title,
    category: item.category,
    publishDate: item.publishedDate || "2026.01",
    path: `/uploads/magazines/${item.volId}`,
    thumbPath: item.coverImage || `/uploads/magazines/${item.volId}/thumb.png`,
    articles: articles.length > 0 ? articles : [
      {
        section: item.category,
        title: item.title,
        excerpt: item.editorNote,
      },
    ],
    isLocked: false,
  };
}

/**
 * 실제 20개 호 마스터 데이터에 기반한 진짜 카테고리 동적 매핑 (관계 & 소통, 스트레스 & 이완 등)
 */
export async function getMagazineCategories(): Promise<MagazineCategoriesResponse> {
  const allMagazines: MagazineData[] = MAGAZINE_MASTER_DATA.map(mapMasterToMagazineData);

  const categories: MagazineCategoryGroup[] = [];

  // 마스터 데이터에 존재하는 실제 고유 카테고리 순서대로 동적 집계 ('전체' 탭 제거)
  const uniqueCategoryNames = Array.from(
    new Set(allMagazines.map((m) => m.category).filter(Boolean))
  );

  uniqueCategoryNames.forEach((catName) => {
    const filtered = allMagazines.filter((m) => m.category === catName);
    categories.push({
      category: catName,
      totalCount: filtered.length,
      magazines: filtered,
    });
  });

  return {
    version: "1.0.0",
    updatedAt: "2026-08-25",
    totalVolumes: allMagazines.length,
    categories,
  };
}

/**
 * Get all magazines as a flat array (AWS 배포 안정 정적 동기반환)
 */
export async function getAllMagazinesFlat(): Promise<MagazineData[]> {
  return MAGAZINE_MASTER_DATA.map(mapMasterToMagazineData);
}

/**
 * Get magazine by vol ID (e.g. "vol-01")
 */
export async function getMagazineById(volId: string): Promise<MagazineData | null> {
  const item = getMagazineByVolId(volId);
  if (!item) return null;
  return mapMasterToMagazineData(item);
}

/**
 * content.txt 전체 텍스트에서 선택된 목차(articleTitle / articleSection)에 해당하는 
 * 1:1 전용 섹션 텍스트 파트만 정밀 추출 (===, ---, [...], # 4중 멀티 구분자 완벽 지원)
 */
function extractArticleSectionText(
  fullContent: string,
  articleTitle?: string,
  articleSection?: string
): string {
  if (!fullContent || !fullContent.trim()) {
    return "";
  }
  if (!articleTitle && !articleSection) {
    return fullContent;
  }

  const lines = fullContent.split(/\r?\n/);

  // 1. 원문 라인 단위 구분선 및 브래킷/마크다운 헤더 위치 경계 지점(Header Anchor) 동적 수집
  const headerIndices: number[] = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (
      /^[=]{3,}$/.test(line) ||
      /^[-]{3,}$/.test(line) ||
      /^[#]{1,4}\s+/.test(line) ||
      /^\[[^\]]+\]/.test(line)
    ) {
      headerIndices.push(i);
    }
  }

  // 2. 검색 대상 키워드 정제
  const tTitle = (articleTitle || "").trim().toLowerCase().replace(/[\s\-_&|.,'"`]/g, "");
  const tSec = (articleSection || "").trim().toLowerCase().replace(/[\s\-_&|.,'"`]/g, "");

  let matchedLineIdx = -1;

  // 1차 정밀 라인 탐색
  for (let i = 0; i < lines.length; i++) {
    const lineClean = lines[i].toLowerCase().replace(/[\s\-_&|.,'"`]/g, "");
    if (!lineClean) continue;

    if (
      (tTitle.length >= 2 && lineClean.includes(tTitle)) ||
      (tSec.length >= 2 && lineClean.includes(tSec))
    ) {
      matchedLineIdx = i;
      break;
    }
  }

  // 2차 유연 키워드 매칭 (제목의 주요 단어 2개 이상)
  if (matchedLineIdx === -1) {
    const keywords = (articleTitle || "")
      .split(/\s+/)
      .filter((w) => w.length >= 2);
    for (let i = 0; i < lines.length; i++) {
      const lineClean = lines[i].toLowerCase();
      const matchCount = keywords.filter((kw) =>
        lineClean.includes(kw.toLowerCase())
      ).length;
      if (keywords.length > 0 && matchCount >= Math.min(2, keywords.length)) {
        matchedLineIdx = i;
        break;
      }
    }
  }

  // 매칭 실패 시 통문장 전체 반환 차단 -> 첫번째 아티클 영역만 조절해서 반환
  if (matchedLineIdx === -1) {
    const firstEnd =
      headerIndices.find((idx) => idx > 25) || Math.min(lines.length, 60);
    return lines.slice(0, firstEnd).join("\n").trim();
  }

  // 3. 시작 위치 조정 (구분선 바로 아래부터 노출)
  let startLine = matchedLineIdx;
  if (
    startLine > 0 &&
    (/^[=]{3,}$/.test(lines[startLine - 1].trim()) ||
      /^[-]{3,}$/.test(lines[startLine - 1].trim()))
  ) {
    startLine = startLine - 1;
  }

  // 4. 다음 구분선/헤더 경계 지점 전까지 정확히 슬라이싱
  let endLineIdx = lines.length;
  for (let i = 0; i < headerIndices.length; i++) {
    const hIdx = headerIndices[i];
    if (hIdx > matchedLineIdx + 2) {
      endLineIdx = hIdx;
      break;
    }
  }

  const slicedLines = lines.slice(startLine, endLineIdx);
  return slicedLines.join("\n").trim();
}

/**
 * Fetch text content for an article (목차 제목에 맞춰 100% 정밀 분리 리턴)
 */
export async function getArticleTextContent(
  volFolder: string,
  articleTitle?: string,
  articleSection?: string
): Promise<string> {
  const item = getMagazineByVolId(volFolder);
  if (item) {
    return extractArticleSectionText(item.content, articleTitle, articleSection);
  }
  return `VOL.01 불안과 공존하는 법\n\n내 안의 감각에 귀 기울이고 다정하게 인사를 건네보세요.`;
}

// 앨리어스 호환성 유지
export const fetchArticleContentText = getArticleTextContent;

/**
 * Get featured spotlight articles
 */
export async function getFeaturedSpotlightArticles(): Promise<FeaturedSpotlightArticle[]> {
  return MAGAZINE_MASTER_DATA.slice(0, 4).map((item) => ({
    volId: item.volId,
    volTitle: item.title,
    section: item.category,
    title: item.title,
    category: item.category,
  }));
}
