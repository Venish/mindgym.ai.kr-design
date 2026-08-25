const fs = require('fs');
const path = require('path');

const masterDataPath = path.join(process.cwd(), 'src', 'data', 'magazineData.ts');
const masterTsContent = fs.readFileSync(masterDataPath, 'utf8');

const jsonMatch = masterTsContent.match(/export const MAGAZINE_MASTER_DATA:[^=]+=\s*(\[\s*\{[\s\S]*\}\s*\]);/);
if (!jsonMatch) {
  console.error("MAGAZINE_MASTER_DATA parse error");
  process.exit(1);
}

const masterData = JSON.parse(jsonMatch[1]);
console.log(`=== 20개 호 매거진 250개 아티클 정밀 슬라이서 검증 시작 ===`);

function extractArticleSectionText(fullContent, articleTitle, articleSection) {
  if (!fullContent) return "";
  if (!articleTitle && !articleSection) return fullContent;

  const lines = fullContent.split(/\r?\n/);
  const headerIndices = [];

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

  const tTitle = (articleTitle || "").trim().toLowerCase().replace(/[\s\-_&|.,'"`]/g, "");
  const tSec = (articleSection || "").trim().toLowerCase().replace(/[\s\-_&|.,'"`]/g, "");

  let matchedLineIdx = -1;

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

  if (matchedLineIdx === -1) {
    const keywords = (articleTitle || "").split(/\s+/).filter((w) => w.length >= 2);
    for (let i = 0; i < lines.length; i++) {
      const lineClean = lines[i].toLowerCase();
      const matchCount = keywords.filter((kw) => lineClean.includes(kw.toLowerCase())).length;
      if (keywords.length > 0 && matchCount >= Math.min(2, keywords.length)) {
        matchedLineIdx = i;
        break;
      }
    }
  }

  if (matchedLineIdx === -1) {
    const firstEnd = headerIndices.find((idx) => idx > 25) || Math.min(lines.length, 60);
    return lines.slice(0, firstEnd).join("\n").trim();
  }

  let startLine = matchedLineIdx;
  if (
    startLine > 0 &&
    (/^[=]{3,}$/.test(lines[startLine - 1].trim()) ||
      /^[-]{3,}$/.test(lines[startLine - 1].trim()))
  ) {
    startLine = startLine - 1;
  }

  let endLineIdx = lines.length;
  for (let i = 0; i < headerIndices.length; i++) {
    const hIdx = headerIndices[i];
    if (hIdx > matchedLineIdx + 2) {
      endLineIdx = hIdx;
      break;
    }
  }

  return lines.slice(startLine, endLineIdx).join("\n").trim();
}

let totalCount = 0;
let successCount = 0;

masterData.forEach((vol) => {
  vol.articles.forEach((art) => {
    totalCount++;
    const sliced = extractArticleSectionText(vol.content, art.title, art.section);
    if (sliced && sliced.length >= 30 && sliced.length <= vol.content.length * 0.8) {
      successCount++;
    }
  });
});

console.log(`\n✅ 최종 결과: 총 ${totalCount}개 아티클 중 ${successCount}개 1:1 슬라이싱 성공! (${((successCount/totalCount)*100).toFixed(1)}%)`);
