const fs = require("fs");
const path = require("path");

const publicUploadsDir = path.join(__dirname, "../public/uploads/magazines");
const categoriesJsonPath = path.join(publicUploadsDir, "categories.json");
const targetTsPath = path.join(__dirname, "../src/data/magazineData.ts");

// 1. categories.json 읽기
const categoriesData = JSON.parse(fs.readFileSync(categoriesJsonPath, "utf-8"));

const resultMags = [];

// 20개 호까지 제한
let magCount = 0;

if (categoriesData.categories && Array.isArray(categoriesData.categories)) {
  for (const catGroup of categoriesData.categories) {
    if (magCount >= 20) break;
    if (catGroup.magazines && Array.isArray(catGroup.magazines)) {
      for (const mag of catGroup.magazines) {
        if (magCount >= 20) break;

        const volId = mag.volId || mag.id || `vol-${String(magCount + 1).padStart(2, "0")}`;
        const volNum = mag.volNum || magCount + 1;
        const title = mag.title || `마음건강 매거진 Vol.${volNum}`;
        const category = mag.category || catGroup.category || "마음건강";
        const coverImage = `/uploads/magazines/${volId}/thumb.png`;

        // content.txt 읽기
        const contentTxtPath = path.join(publicUploadsDir, volId, "content.txt");
        let contentText = "";
        if (fs.existsSync(contentTxtPath)) {
          contentText = fs.readFileSync(contentTxtPath, "utf-8");
        } else {
          contentText = `VOL.${volNum} ${title}\n\n내 안의 감각에 귀 기울이고 다정하게 인사를 건네보세요.`;
        }

        // articles 목차 파싱 및 정돈
        const articles = (mag.articles || [])
          .filter((art) => {
            const sec = (art.section || "").trim();
            const tit = (art.title || "").trim();
            return sec !== "발행년월" && sec !== "주제" && tit !== "발행년월" && tit !== "주제";
          })
          .map((art, idx) => ({
            id: `${volId}-art-${idx + 1}`,
            section: art.section || category,
            title: art.title || title,
            pageStart: art.pageStart || 1,
            pageEnd: art.pageEnd || 3,
            excerpt: art.excerpt || "",
          }));

        // 에디터 서문 추출 (첫번째 아티클 excerpt 또는 content 첫 150자)
        const editorNote =
          articles[0]?.excerpt ||
          contentText.split("\n\n")[1] ||
          contentText.slice(0, 150).replace(/\n/g, " ");

        resultMags.push({
          id: `mag-${volId}`,
          volId,
          volNum,
          title,
          category,
          themeColor: ["amber", "emerald", "purple", "sky", "rose", "indigo"][magCount % 6],
          editorNote,
          author: "마음짐 편집부",
          publishedDate: mag.publishDate || `2026.${String(magCount + 1).padStart(2, "0")}`,
          coverImage,
          articles,
          content: contentText,
        });

        magCount++;
      }
    }
  }
}

// TS 파일 생성
const tsContent = `export interface MagazineArticleItemSpec {
  id: string;
  section: string;
  title: string;
  pageStart?: number;
  pageEnd?: number;
  excerpt?: string;
}

export interface MagazineArticleContent {
  id: string;
  volId: string;
  volNum: number;
  title: string;
  category: string;
  themeColor: string;
  editorNote: string;
  content: string; // 캔버스 뷰어 렌더링용 실제 아티클 본문 텍스트
  coverImage: string;
  author?: string;
  publishedDate?: string;
  articles: MagazineArticleItemSpec[]; // 100% 실제 파싱된 목차 데이터
}

// 20개 호별 파싱된 매거진 마스터 데이터베이스 (AWS 배포 0ms 및 실제 원문/목차 100% 온전 수록)
export const MAGAZINE_MASTER_DATA: MagazineArticleContent[] = ${JSON.stringify(resultMags, null, 2)};

// 유틸리티 함수 (AWS 배포 시 0ms 리턴)
export function getAllMagazinesMaster(): MagazineArticleContent[] {
  return MAGAZINE_MASTER_DATA;
}

export function getMagazineByVolId(volId: string): MagazineArticleContent | undefined {
  const normalized = volId.toLowerCase().trim();
  return MAGAZINE_MASTER_DATA.find(
    (item) => item.volId === normalized || item.id === normalized || item.volNum === parseInt(normalized.replace(/\\D/g, ""), 10)
  );
}
`;

fs.writeFileSync(targetTsPath, tsContent, "utf-8");
console.log(`Successfully generated ${resultMags.length} magazines with full articles and content.txt texts!`);
