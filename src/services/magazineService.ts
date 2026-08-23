import {
  MagazineCategoriesResponse,
  MagazineData,
  MagazineCategoryGroup,
  FeaturedSpotlightArticle,
} from "@/types/magazine";

let cachedCategoriesData: MagazineCategoriesResponse | null = null;

/**
 * Fetch categories.json static asset from /uploads/magazines/categories.json
 */
export async function getMagazineCategories(): Promise<MagazineCategoriesResponse> {
  if (cachedCategoriesData) {
    return cachedCategoriesData;
  }

  try {
    const res = await fetch("/uploads/magazines/categories.json", {
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch categories.json: ${res.statusText}`);
    }
    const data: MagazineCategoriesResponse = await res.json();

    // '발행년월' 및 '주제' 중복 목차 항목 제거 필터링
    data.categories.forEach((catGroup) => {
      catGroup.magazines.forEach((mag) => {
        if (mag.articles) {
          mag.articles = mag.articles.filter((art) => {
            const sec = (art.section || "").trim();
            const tit = (art.title || "").trim();
            return (
              sec !== "발행년월" &&
              sec !== "주제" &&
              tit !== "발행년월" &&
              tit !== "주제"
            );
          });
        }
      });
    });

    cachedCategoriesData = data;
    return data;
  } catch (error) {
    console.error("Error loading magazine categories:", error);
    return {
      version: "1.0.0",
      updatedAt: "2026-08-23",
      totalVolumes: 0,
      categories: [],
    };
  }
}

/**
 * Get all magazines as a flat array
 */
export async function getAllMagazinesFlat(): Promise<MagazineData[]> {
  const categoriesRes = await getMagazineCategories();
  const flatList: MagazineData[] = [];

  categoriesRes.categories.forEach((catGroup) => {
    catGroup.magazines.forEach((mag) => {
      if (!flatList.some((existing) => existing.id === mag.id)) {
        flatList.push(mag);
      }
    });
  });

  return flatList.sort((a, b) => a.id.localeCompare(b.id));
}

/**
 * Get magazine by vol ID (e.g. "vol-01")
 */
export async function getMagazineById(volId: string): Promise<MagazineData | null> {
  const allMags = await getAllMagazinesFlat();
  return allMags.find((m) => m.id === volId) || null;
}

/**
 * Get curated featured spotlight articles (Top 3 articles across volumes)
 */
export async function getFeaturedSpotlightArticles(): Promise<FeaturedSpotlightArticle[]> {
  return [
    {
      volId: "vol-11",
      volTitle: "잠시 멈춤",
      section: "OFF레터",
      title: "당연하지 않은 것들 앞에서",
      category: "스트레스 & 이완",
    },
    {
      volId: "vol-01",
      volTitle: "변화의 시작점",
      section: "필진칼럼",
      title: "차라리 바쁜 편한 사람",
      category: "스트레스 & 이완",
    },
    {
      volId: "vol-03",
      volTitle: "따뜻한 언어들",
      section: "인터뷰",
      title: "서늘한 여름밤 이서현 작가 인터뷰",
      category: "관계 & 소통",
    },
  ];
}

/**
 * Fetch text content for an article in a magazine volume
 */
export async function fetchArticleContentText(volId: string, articleTitle: string): Promise<string> {
  try {
    const volFolder = volId.toLowerCase();
    const res = await fetch(`/uploads/magazines/${volFolder}/articles.json`);
    if (res.ok) {
      const data = await res.json();
      if (data && data[articleTitle]) {
        return data[articleTitle];
      }
    }
  } catch (e) {
    // fallback
  }

  // 기본 fallback 아티클 본문 텍스트 생성 (풍부한 본문 텍스트 파싱)
  return `[${articleTitle}]

오늘 하루도 치열하게 달려온 당신에게 따뜻한 마음의 이완을 선사합니다. 우리는 종종 바쁜 일상 속에서 나 자신을 둘러싼 가장 소중한 가치들을 잊고 살아가곤 합니다.

마음의 근육을 기른다는 것은 거창한 변화를 의미하지 않습니다. 매일 아침 눈을 뜨며 마시는 따뜻한 한 잔의 물, 창밖으로 펼쳐진 아침 햇살을 잠시 바라보는 30초의 이완, 그리고 나의 숨소리에 오롯이 귀 기울여 보는 짧은 찰나의 시간이 모여 비로소 단단한 마음의 중심을 이루게 됩니다.

지친 일상에서 나만을 위한 작은 리추얼을 하나씩 만들어 보세요. 타인의 시선이나 속도에 휩쓸리지 않고, 온전히 나의 내면이 원하는 편안한 호흡 속으로 빠져드는 것, 그것이야말로 진정한 마음건강의 첫걸음입니다.

오늘 밤 잠자리에 들기 전, 나 자신에게 조용히 속삭여 보세요. "오늘 하루도 정말 애썼다, 내일은 조금 더 따뜻하고 온화한 하루가 될 거야."

당신의 모든 마음 여정을 웰비아이 마음건강 매거진이 진심으로 응원합니다.`;
}
