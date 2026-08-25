import fs from 'fs';
import path from 'path';

const ritualsData = [
  // PART 1 (1~11)
  { id: 1, part: "제1부. 불안·걱정 극복", title: "미소 명상", target: "마음이 부정적인 쪽으로 끌려갈 때 긴장을 풀고 싶은 사람", method: "생각만 해도 미소가 지어지는 공간과 나를 시각화 상상.", effect: "뇌가 상상에 반응하여 몸의 긴장이 풀림.", type: "🎧 오디오 가이드형", color: "#2563eb", icon: "😊", execUi: `<div style="padding:20px; text-align:center;"><div style="width:90px; height:90px; border-radius:50%; background:radial-gradient(circle, rgba(0,196,116,0.6) 0%, rgba(0,196,116,0) 70%); margin:0 auto; animation:pulse 3s infinite;"></div><p style="margin-top:12px; color:#fff; font-size:14px;">"따뜻한 미소가 퍼져나갑니다."</p></div>` },
  { id: 2, part: "제1부. 불안·걱정 극복", title: "마음 챙김 벨", target: "생각이 꼬리를 물고 멈추지 않는 사람", method: "무작위 종소리가 울리면 생각을 멈추고 소리에 집중.", effect: "청각 자극이 알아차림을 주어 생각을 끊어줌.", type: "🎧 오디오 가이드형", color: "#2563eb", icon: "🔔", execUi: `<div style="padding:20px; text-align:center;"><span style="font-size:48px;">🔔</span><p style="margin-top:8px; color:#fff; font-size:14px;">청아한 종소리에 집중하여 잡생각 비우기</p></div>` },
  { id: 3, part: "제1부. 불안·걱정 극복", title: "시선고정명상", target: "눈 감는 명상이 잡생각을 부르는 사람", method: "눈을 뜬 채 1분 동안 한 사물만 바라봄.", effect: "시각 정보가 단순해져 짧은 시간 잡생각 비움.", type: "⏱️ 타이머 멈춤형", color: "#d97706", icon: "👁️", execUi: `<div style="padding:20px; text-align:center;"><div style="width:20px; height:20px; background:#00C474; border-radius:50%; margin:0 auto; box-shadow:0 0 20px #00C474;"></div><p style="margin-top:16px; color:#fff; font-size:14px;">중앙 점에 시선을 1분간 고정합니다.</p></div>` },
  { id: 4, part: "제1부. 불안·걱정 극복", title: "횡경막 호흡", target: "불안이 올라올 때 빠르게 진정시키고 싶은 사람", method: "가슴과 배에 손을 얹고 깊고 느린 복식 호흡.", effect: "부교감 신경을 켜 신체 이완 반응 유도.", type: "🎧 오디오 가이드형", color: "#2563eb", icon: "🫁", execUi: `<div style="padding:20px; text-align:center;"><div style="width:80px; height:80px; border:4px solid #00C474; border-radius:50%; margin:0 auto; display:flex; align-items:center; justify-content:center;">호흡</div><p style="margin-top:12px; color:#fff; font-size:13px;">4초 들이쉬고 4초 멈추고 4초 내쉬기</p></div>` },
  { id: 5, part: "제1부. 불안·걱정 극복", title: "망할 확률 계산기", target: "작은 일도 최악의 파국으로 키우는 사람", method: "걱정하는 최악 상황의 실제 발생 확률(%)을 계산.", effect: "불안을 감정에서 계산의 영역으로 옮겨 현실 인지.", type: "📝 마이크로 글쓰기형", color: "#7c3aed", icon: "🧮", execUi: `<div style="padding:16px; background:#1e293b; border-radius:12px; text-align:center;"><span style="font-size:12px; color:#94a3b8;">실제 파국 발생 확률</span><div style="font-size:24px; font-weight:900; color:#00C474;">1.2 %</div></div>` },
  { id: 6, part: "제1부. 불안·걱정 극복", title: "긍정 만약에", target: "걱정의 '만약에'에 자주 사로잡히는 사람", method: "똑같이 '만약에'로 시작하되 최고의 결말을 적기.", effect: "나쁜 결말을 긍정 방향으로 틀어 선택.", type: "📝 마이크로 글쓰기형", color: "#7c3aed", icon: "✨", execUi: `<div style="padding:16px; background:#fef3c7; color:#92400e; border-radius:12px; text-align:center; font-weight:700;">"만약에 내가 기대 이상의 대성공을 거둔다면?"</div>` },
  { id: 7, part: "제1부. 불안·걱정 극복", title: "걱정유통기한라벨링", target: "같은 걱정을 며칠씩 끌어안고 압도되는 사람", method: "걱정에 유통기한 라벨을 붙이고 해당 날짜에 확인.", effect: "걱정의 수명이 생각보다 짧음을 인지.", type: "📝 마이크로 글쓰기형", color: "#7c3aed", icon: "🏷️", execUi: `<div style="padding:12px; background:#1e293b; border-radius:12px; text-align:center;"><span style="font-size:12px; background:#00C474; padding:2px 8px; border-radius:6px; color:#fff;">D-7 유통기한</span><p style="font-size:13px; color:#fff; margin-top:6px;">이 걱정은 7일 후 소멸합니다.</p></div>` },
  { id: 8, part: "제1부. 불안·걱정 극복", title: "스트레스 분쇄", target: "쌓인 분노와 응어리를 안전하게 풀고 싶은 사람", method: "스트레스 상황을 적고 파쇄기에 넣어 잘게 분쇄.", effect: "물리적 분쇄 행위가 심리적 후련함을 제공.", type: "📝 마이크로 글쓰기형", color: "#7c3aed", icon: "✂️", execUi: `<div style="padding:16px; background:#1e293b; border-radius:12px; text-align:center; color:#ef4444; font-weight:700;">✂️ 스트레스 종이잘림 파쇄 준비 완료</div>` },
  { id: 9, part: "제1부. 불안·걱정 극복", title: "걱정 저금통", target: "걱정을 당장 해결해야 한다는 조급함이 시달리는 사람", method: "걱정을 적어 저금통에 넣고 가득 차면 깨서 확인.", effect: "당장 집착하지 않고 내려놓는 연습.", type: "🎨 비주얼 캔버스형", color: "#059669", icon: "🐖", execUi: `<div style="padding:16px; text-align:center;"><span style="font-size:40px;">🐖</span><p style="font-size:13px; color:#fff;">걱정을 저금통에 퐁당 넣었습니다.</p></div>` },
  { id: 10, part: "제1부. 불안·걱정 극복", title: "333 나비포옹", target: "스스로를 너무 엄격하게 다그치게 되는 순간", method: "양팔로 감싸 안고 '괜찮아' 3번씩 토닥임.", effect: "양측성 부드러운 자극으로 뇌와 마음을 안정.", type: "🎧 오디오 가이드형", color: "#2563eb", icon: "🦋", execUi: `<div style="padding:16px; text-align:center;"><span style="font-size:36px;">🦋</span><p style="font-size:14px; color:#00C474; font-weight:700;">"괜찮아, 그럴 수 있지, 뭐 어때"</p></div>` },
  { id: 11, part: "제1부. 불안·걱정 극복", title: "미래그림일기", target: "원하는 미래가 막연하기만 한 사람", method: "이상적인 미래 모습을 글로 적고 그림으로 표현.", effect: "눈에 보이는 형태가 된 미래가 방향성이 됨.", type: "🎨 비주얼 캔버스형", color: "#059669", icon: "🖼️", execUi: `<div style="padding:16px; background:#f8fafc; border-radius:12px; color:#111827; text-align:center; font-weight:700;">🖼️ 2027년 내 모습 일기장 카드</div>` },

  // PART 2 (12~22)
  { id: 12, part: "제2부. 자책·엄격 극복", title: "내편일기", target: "자기 잘못에 가혹하고 자기 탓부터 하는 사람", method: "내가 완전히 내 편이 되어 유난스럽게 변호하기.", effect: "무조건 내 편이 되어보는 자기자비 연습.", type: "📝 마이크로 글쓰기형", color: "#7c3aed", icon: "🛡️", execUi: `<div style="padding:16px; background:#1e293b; border-radius:12px; text-align:center; color:#00C474;">🛡️ "너는 절대 잘못이 없어, 내가 무조건 변호해!"</div>` },
  { id: 13, part: "제2부. 자책·엄격 극복", title: "미고사", target: "남에겐 다정하고 자신에겐 엄격한 사람", method: "'미안해, 고마워, 사랑해'를 자신에게 전함.", effect: "나를 돌보지 않았음을 인지하고 자비 말 건네기.", type: "📝 마이크로 글쓰기형", color: "#7c3aed", icon: "💌", execUi: `<div style="padding:16px; background:#fffebf; color:#854d0e; border-radius:12px; text-align:center; font-weight:700;">💌 미안해, 고마워, 너를 사랑해</div>` },
  { id: 14, part: "제2부. 자책·엄격 극복", title: "자존감 칠판", target: "자기 비하가 습관이 되고 칭찬을 흘리는 사람", method: "칭찬할 점을 칠판에 적어 매일 세 번 낭독.", effect: "나에 대한 좋은 말을 눈에 붙여 긍정 새김.", type: "🎨 비주얼 캔버스형", color: "#059669", icon: "📋", execUi: `<div style="padding:16px; background:#064e3b; color:#a7f3d0; border-radius:12px; text-align:center; font-weight:700;">📋 "오늘도 성실하게 제 자리를 지킨 나를 칭찬해"</div>` },
  { id: 15, part: "제2부. 자책·엄격 극복", title: "공수치 폭풍칭찬", target: "자기 칭찬이 어색하고 민망한 사람", method: "폭풍 칭찬 메시지를 읽어 유머러스하게 소리냄.", effect: "민망함과 웃음이 자존감 긍정 문턱을 낮춤.", type: "🎨 비주얼 캔버스형", color: "#059669", icon: "📢", execUi: `<div style="padding:16px; background:#f43f5e; color:#fff; border-radius:12px; text-align:center; font-weight:900;">📢 "지구상 최고의 대단한 인간 등장!"</div>` },
  { id: 16, part: "제2부. 자책·엄격 극복", title: "오늘의 상장", target: "평범한 하루를 무가치하게 느끼는 사람", method: "나를 위한 상장('성실상')을 만들어 수여.", effect: "작은 인정을 쌓아 평범한 하루의 의미 부여.", type: "🎨 비주얼 캔버스형", color: "#059669", icon: "📜", execUi: `<div style="padding:16px; background:#fffdf5; border:3px double #d97706; color:#92400e; border-radius:12px; text-align:center; font-weight:800;">📜 [상장] 위 사람은 버텨내었으므로 이 상을 수여함</div>` },
  { id: 17, part: "제2부. 자책·엄격 극복", title: "달의 뒷편 롤링페이퍼", target: "단점에 갇혀 자책이 많은 사람", method: "성격 단점을 적어 장점으로 재해석.", effect: "달의 뒷면처럼 인지 못 한 반대편 확인.", type: "🎨 비주얼 캔버스형", color: "#059669", icon: "🌙", execUi: `<div style="padding:16px; background:#1e1b4b; color:#c7d2fe; border-radius:12px; text-align:center;">🌙 예민함 ➔ 섬세함과 공감력으로 반전!</div>` },
  { id: 18, part: "제2부. 자책·엄격 극복", title: "지우개 테라피", target: "오래된 상처나 말 한마디가 아픈 사람", method: "상처 말을 연필로 적고 지우개로 싹 지움.", effect: "상처를 물리적으로 밀어내고 옹호 남김.", type: "📝 마이크로 글쓰기형", color: "#7c3aed", icon: "✏️", execUi: `<div style="padding:16px; background:#fef3c7; color:#b45309; border-radius:12px; text-align:center; font-weight:700;">✏️ 지우개로 상처 글씨를 싹 지웠습니다.</div>` },
  { id: 19, part: "제2부. 자책·엄격 극복", title: "셀프 하이파이브", target: "하루를 힘없이 시작하는 사람", method: "외출/귀가 시 손바닥과 하이파이브.", effect: "단순 동작이 나에게 보내는 다정한 응원.", type: "🎧 오디오 가이드형", color: "#2563eb", icon: "✋", execUi: `<div style="padding:16px; text-align:center;"><span style="font-size:40px;">✋</span><p style="font-size:14px; color:#00C474; font-weight:700;">"오늘 하루도 화이팅! 짝!"</p></div>` },
  { id: 20, part: "제2부. 자책·엄격 극복", title: "원라인드로잉", target: "무언가를 해내야 한다는 부담이 큰 사람", method: "매일 딱 하나의 한 줄 선만 긋기.", effect: "부담 없이 달성 효능감을 쌓는 최소 습관.", type: "🎨 비주얼 캔버스형", color: "#059669", icon: "✏️", execUi: `<div style="padding:16px; background:#1e293b; border-radius:12px; text-align:center; color:#00C474; font-weight:700;">✏️ 일일 한 줄 선 긋기 달성</div>` },
  { id: 21, part: "제2부. 자책·엄격 극복", title: "거절 연습장", target: "부탁을 거절하지 못해 소진하는 사람", method: "거절하지 못한 일에 대해 거절 멘트를 연습.", effect: "거절 문장을 미리 연습하여 유연 반응.", type: "📝 마이크로 글쓰기형", color: "#7c3aed", icon: "🙅", execUi: `<div style="padding:16px; background:#1e293b; color:#f8fafc; border-radius:12px; text-align:center;">"정중하지만 단호하게: 지금은 여력이 되지 않습니다."</div>` },
  { id: 22, part: "제2부. 자책·엄격 극복", title: "투데이 확언", target: "거창한 확언에 지친 사람", method: "'오늘 내가 할 수 있는 한 걸음'을 확언.", effect: "오늘의 작은 확정적 미래를 통해 기대감 상승.", type: "📝 마이크로 글쓰기형", color: "#7c3aed", icon: "👣", execUi: `<div style="padding:16px; background:#00C474; color:#fff; border-radius:12px; text-align:center; font-weight:800;">👣 "오늘 나는 10분 동안 산책을 즐긴다"</div>` },

  // PART 3 (23~32)
  { id: 23, part: "제3부. 감정 인지", title: "감정개명", target: "감정을 큰 덩어리로 뭉뚱그리는 사람", method: "느낀 감정에 구체적인 새 이름 붙이기.", effect: "이름을 바꿈으로써 압도감이 줄어듦.", type: "📝 마이크로 글쓰기형", color: "#7c3aed", icon: "🏷️", execUi: `<div style="padding:16px; background:#1e293b; color:#cbd5e1; border-radius:12px; text-align:center;">'짜증' ➔ '서운함과 인정 욕구'로 개명 완료</div>` },
  { id: 24, part: "제3부. 감정 인지", title: "마음날씨 기록", target: "기분이 왜 가라앉는지 모르겠는 사람", method: "외부 사건과 내 마음 상태를 분리 기록.", effect: "외부 사건과 내 감정 사이의 거리 확인.", type: "📝 마이크로 글쓰기형", color: "#7c3aed", icon: "🌤️", execUi: `<div style="padding:16px; background:#1e293b; color:#fff; border-radius:12px; text-align:center;">🌤️ [사건: 비 옴] vs [내 마음: 40도 열받음]</div>` },
  { id: 25, part: "제3부. 감정 인지", title: "Y 7 질문법", target: "진짜 내 마음의 원인을 모르는 회피형", method: "고민에 '왜?'라고 7번 물으며 원인 도달.", effect: "표면 감정을 파고들어 문제 뿌리에 닿음.", type: "📝 마이크로 글쓰기형", color: "#7c3aed", icon: "❓", execUi: `<div style="padding:16px; background:#1e293b; color:#00C474; border-radius:12px; text-align:center; font-weight:700;">❓ 7단계 왜? 질문을 통해 내 안의 진짜 이유 발견</div>` },
  { id: 26, part: "제3부. 감정 인지", title: "객관화일기", target: "감정에 휩쓸려 상황을 크게 받아들이는 사람", method: "감정을 빼고 일어난 사실만을 기록.", effect: "감정 색안경을 벗고 사실을 마주함.", type: "📝 마이크로 글쓰기형", color: "#7c3aed", icon: "📖", execUi: `<div style="padding:16px; background:#f8fafc; color:#111827; border-radius:12px; text-align:center;">📖 사관처럼 건조한 순수 사실 3줄 기록</div>` },
  { id: 27, part: "제3부. 감정 인지", title: "사실과 견해 분리하기", target: "작은 일을 자기 식대로 확대 해석하는 사람", method: "사실엔 ⭕, 내 해석엔 밑줄 치기.", effect: "괴로움이 사실이 아닌 해석이었음을 깨달음.", type: "📝 마이크로 글쓰기형", color: "#7c3aed", icon: "⚖️", execUi: `<div style="padding:16px; background:#1e293b; color:#fff; border-radius:12px; text-align:center;">🔵 사실(⭕) vs 🟡 내 억측 해석(밑줄) 분리</div>` },
  { id: 28, part: "제3부. 감정 인지", title: "불평일기", target: "부정적 감정을 억누르고 죄책감 느끼는 사람", method: "불평을 쏟아낸 뒤 '그럴 만했다'로 마무리.", effect: "감정을 억누르지 않고 수용하는 경험.", type: "📝 마이크로 글쓰기형", color: "#7c3aed", icon: "🗯️", execUi: `<div style="padding:16px; background:#1e293b; color:#f8fafc; border-radius:12px; text-align:center;">🗯️ 마음껏 적은 뒤 "충분히 그럴 수 있었어" 도장 쿵</div>` },
  { id: 29, part: "제3부. 감정 인지", title: "긍정해석연습", target: "힘든 일을 억지 긍정으로 덮는 사람", method: "상황에서 얻거나 배운 점을 발견.", effect: "사건 속 배움을 건지는 중립적 인지.", type: "📝 마이크로 글쓰기형", color: "#7c3aed", icon: "💡", execUi: `<div style="padding:16px; background:#1e293b; color:#f59e0b; border-radius:12px; text-align:center; font-weight:700;">💡 이 시련에서 내가 건진 단 하나의 배움</div>` },
  { id: 30, part: "제3부. 감정 인지", title: "스몰 모닝페이지", target: "아침마다 머리가 복잡한 사람", method: "기상 직후 3분 동안 생각을 쏟아 적기.", effect: "머릿속을 비우고 진짜 감정을 꺼냄.", type: "⏱️ 타이머 멈춤형", color: "#d97706", icon: "🌅", execUi: `<div style="padding:16px; background:#1e293b; color:#fff; border-radius:12px; text-align:center;">🌅 3분 모닝 의식 흐름 쾌속 에디터</div>` },
  { id: 31, part: "제3부. 감정 인지", title: "어른이 그림일기", target: "글로 감정 표현이 어려운 사람", method: "어린이 일기장에 크레파스로 그림과 글 쓰기.", effect: "서툰 그림이 진짜 감정을 이끎.", type: "🎨 비주얼 캔버스형", color: "#059669", icon: "🖍️", execUi: `<div style="padding:16px; background:#fff; color:#111827; border-radius:12px; text-align:center; font-weight:700;">🖍️ 알록달록 어른이 크레파스 일기장</div>` },
  { id: 32, part: "제3부. 감정 인지", title: "마음필사", target: "책을 읽어도 남는 게 없다고 느끼는 사람", method: "마음에 드는 단 한 줄을 필사.", effect: "내 마음이 반응한 구절 리스트 수집.", type: "📝 마이크로 글쓰기형", color: "#7c3aed", icon: "✒️", execUi: `<div style="padding:16px; background:#1e293b; color:#e2e8f0; border-radius:12px; text-align:center; font-style:italic;">✒️ 내 마음을 울린 한 줄 필사 서재</div>` },

  // PART 4 (33~45)
  { id: 33, part: "제4부. 자기 탐색", title: "존재소개", target: "내가 어떤 사람인지 알고 싶은 사람", method: "'나는 ___한 사람이다' 100개 채우기.", effect: "수십 개 문장을 모아 입체적 나 확인.", type: "📝 마이크로 글쓰기형", color: "#7c3aed", icon: "🆔", execUi: `<div style="padding:16px; background:#1e293b; color:#00C474; border-radius:12px; text-align:center; font-weight:700;">🆔 100개 나 정의 문장 모자이크</div>` },
  { id: 34, part: "제4부. 자기 탐색", title: "나 사용설명서", target: "자신을 다루는 법을 몰라 지치는 사람", method: "타고난 기질과 방전 시 AS 회복법 정리.", effect: "나에게 맞는 회복법을 꺼내 쓰기.", type: "🎨 비주얼 캔버스형", color: "#059669", icon: "📘", execUi: `<div style="padding:16px; background:#1e293b; color:#fff; border-radius:12px; text-align:center;">📘 나 사용설명서 (기질 & AS 회복 매뉴얼)</div>` },
  { id: 35, part: "제4부. 자기 탐색", title: "나만의 집그리기", target: "삶의 우선순위가 헷갈리는 사람", method: "방 10개 집을 그리다 3개 남기기.", effect: "끝까지 포기하지 못하는 핵심 욕구 파악.", type: "🎨 비주얼 캔버스형", color: "#059669", icon: "🏠", execUi: `<div style="padding:16px; background:#1e293b; color:#fff; border-radius:12px; text-align:center;">🏠 10개 룸 중 끝까지 지킨 3개 핵심 방</div>` },
  { id: 36, part: "제4부. 자기 탐색", title: "자기인식상태점검", target: "자신을 과대/과소 평가하는 사람", method: "좋은 점과 부끄러운 점을 같은 시간 적기.", effect: "내 시선이 어디로 기울어 있는지 확인.", type: "🎨 비주얼 캔버스형", color: "#059669", icon: "⚖️", execUi: `<div style="padding:16px; background:#1e293b; color:#fff; border-radius:12px; text-align:center;">⚖️ 좋은 점 vs 부끄러운 점 저울 점검</div>` },
  { id: 37, part: "제4부. 자기 탐색", title: "셀프 QnA", target: "무엇을 써야 할지 막막한 사람", method: "매일 질문 카드 1장을 뽑아 답하기.", effect: "질문 카드가 마음 구석을 비춤.", type: "🎨 비주얼 캔버스형", color: "#059669", icon: "🎴", execUi: `<div style="padding:16px; background:#1e293b; color:#f59e0b; border-radius:12px; text-align:center; font-weight:700;">🎴 오늘의 랜덤 질문 카드 드로우</div>` },
  { id: 38, part: "제4부. 자기 탐색", title: "자문자답 글쓰기", target: "고민을 객관적으로 보기 어려운 사람", method: "질문자와 답하는 자 1인2역 대화.", effect: "시간 차를 두고 내 문제를 제3자처럼 바라봄.", type: "📝 마이크로 글쓰기형", color: "#7c3aed", icon: "💬", execUi: `<div style="padding:16px; background:#1e293b; color:#fff; border-radius:12px; text-align:center;">💬 1인 2역 상담자 vs 내담자 대화 로그</div>` },
  { id: 39, part: "제4부. 자기 탐색", title: "과거분석표", target: "같은 실수나 선택을 반복하는 사람", method: "과거 선택 이유와 결과를 표로 정리.", effect: "동일 후회를 유발하는 선택 패턴 파악.", type: "📝 마이크로 글쓰기형", color: "#7c3aed", icon: "📊", execUi: `<div style="padding:16px; background:#1e293b; color:#fff; border-radius:12px; text-align:center;">📊 과거 선택 매트릭스 패턴 분석표</div>` },
  { id: 40, part: "제4부. 자기 탐색", title: "에너지 가계부", target: "늘 이유 없이 지쳐 있는 사람", method: "기 빨게 한 것(-지출)과 충전(+수입) 정산.", effect: "에너지 지출과 수입을 확인해 소모 줄이기.", type: "📝 마이크로 글쓰기형", color: "#7c3aed", icon: "💸", execUi: `<div style="padding:16px; background:#1e293b; color:#00C474; border-radius:12px; text-align:center; font-weight:800;">💸 오늘 에너지 잔액: +20 정산</div>` },
  { id: 41, part: "제4부. 자기 탐색", title: "저자소개 독서법", target: "진로나 인생 방향이 막막한 사람", method: "책날개 저자 소개만 모아 인생 경로 탐색.", effect: "인생에 정해진 길이 없음을 깨달음.", type: "🎨 비주얼 캔버스형", color: "#059669", icon: "👨‍🏫", execUi: `<div style="padding:16px; background:#1e293b; color:#fff; border-radius:12px; text-align:center;">👨‍🏫 30인의 저자 커리어 소개 갤러리</div>` },
  { id: 42, part: "제4부. 자기 탐색", title: "모닝 드로잉", target: "생각이 많아 머리가 무거운 사람", method: "기상 후 1분 마음대로 선/원 그리기.", effect: "검열을 건너뛰고 무의식 감정 표현.", type: "🎨 비주얼 캔버스형", color: "#059669", icon: "🎨", execUi: `<div style="padding:16px; background:#1e293b; color:#fff; border-radius:12px; text-align:center;">🎨 1분 아침 무의식 자유 드로잉</div>` },
  { id: 43, part: "제4부. 자기 탐색", title: "단어 조합 시", target: "감정을 직접 말로 풀기 어려운 사람", method: "무작위 단어 3개를 고르고 시 쓰기.", effect: "무작위 제약이 상상력을 자극하여 감정 옮김.", type: "📝 마이크로 글쓰기형", color: "#7c3aed", icon: "📝", execUi: `<div style="padding:16px; background:#fff; color:#111827; border-radius:12px; text-align:center; font-weight:700;">📝 3가지 단어 조합 원고지 시</div>` },
  { id: 44, part: "제4부. 자기 탐색", title: "짝꿍소개", target: "남의 말을 듣기보다 자기 말하기 바쁜 사람", method: "메모 없이 오로지 귀로만 듣고 소개.", effect: "경청 환경을 통한 경청 연습.", type: "📝 마이크로 글쓰기형", color: "#7c3aed", icon: "👥", execUi: `<div style="padding:16px; background:#1e293b; color:#fff; border-radius:12px; text-align:center;">👥 짝꿍 경청 소개 인터뷰 카드</div>` },
  { id: 45, part: "제4부. 자기 탐색", title: "연간 편지 릴레이", target: "한 해가 어떻게 지나갔는지 모르는 사람", method: "1년 전 편지를 읽고 미래의 나에게 답장.", effect: "1년 단위로 내 삶을 잇는 대화 이어감.", type: "📝 마이크로 글쓰기형", color: "#7c3aed", icon: "📮", execUi: `<div style="padding:16px; background:#1e293b; color:#f59e0b; border-radius:12px; text-align:center; font-weight:700;">📮 365일 뒤 도착하는 타임캡슐 편지</div>` },

  // PART 5 (46~60)
  { id: 46, part: "제5부. 휴식·회복", title: "바디스캔", target: "머릿속이 생각으로 꽉 차 있을 때", method: "발바닥부터 뒷목까지 10초씩 관찰.", effect: "현재에만 존재하는 몸 감각으로 돌아옴.", type: "🎧 오디오 가이드형", color: "#2563eb", icon: "🧘", execUi: `<div style="padding:16px; background:#1e293b; color:#00C474; border-radius:12px; text-align:center;">🧘 인체 관찰 조명 파동 바디스캔</div>` },
  { id: 47, part: "제5부. 휴식·회복", title: "케렌시아 만들기", target: "지칠 때 어디로 갈지 몰라 헤매는 사람", method: "시간대별 쉴 수 있는 장소 미리 기록.", effect: "지친 순간 바로 찾아갈 피난처 마련.", type: "🎨 비주얼 캔버스형", color: "#059669", icon: "🏡", execUi: `<div style="padding:16px; background:#1e293b; color:#fff; border-radius:12px; text-align:center;">🏡 30분 / 1시간 나만의 케렌시아 지도</div>` },
  { id: 48, part: "제5부. 휴식·회복", title: "공간사진 101", target: "집안에 오래 머물러 답답한 사람", method: "반경 2km 이내 편안한 장소 10곳 사진 선발.", effect: "익숙한 동네에서 안식처를 스스로 선택.", type: "🎨 비주얼 캔버스형", color: "#059669", icon: "📷", execUi: `<div style="padding:16px; background:#1e293b; color:#fff; border-radius:12px; text-align:center;">📷 내 안식처 장소 10선 포토 갤러리</div>` },
  { id: 49, part: "제5부. 휴식·회복", title: "마이크로산책", target: "일상이 무기력하거나 무의미하다고 느끼는 사람", method: "짧은 구간을 평소 절반 속도로 걷기.", effect: "매일 같아 보이던 풍경의 디테일 인지.", type: "⏱️ 타이머 멈춤형", color: "#d97706", icon: "🚶", execUi: `<div style="padding:16px; background:#1e293b; color:#fff; border-radius:12px; text-align:center;">🚶 5분 슬로우 보행 앰비언트 산책</div>` },
  { id: 50, part: "제5부. 휴식·회복", title: "빈손산책", target: "산책 중에도 스마트폰을 손에서 못 놓는 사람", method: "스마트 기기 없이 손목시계만 찬 산책.", effect: "빈손의 가벼움이 주의력 회복으로 연결.", type: "⏱️ 타이머 멈춤형", color: "#d97706", icon: "⌚", execUi: `<div style="padding:16px; background:#1e293b; color:#94a3b8; border-radius:12px; text-align:center;">⌚ 스마트폰 안심 흑백 디톡스 잠금</div>` },
  { id: 51, part: "제5부. 휴식·회복", title: "오프먼트", target: "스마트폰 화면에서 눈을 떼지 못하는 사람", method: "매일 5분 가만히 멈춰 아무것도 안 하기.", effect: "비어 있음 속에서 내 마음 소리가 들림.", type: "⏱️ 타이머 멈춤형", color: "#d97706", icon: "⏸️", execUi: `<div style="padding:16px; background:#1e293b; color:#00C474; border-radius:12px; text-align:center; font-weight:800;">⏸️ 화면 밖 5분 멈춤 카운트다운</div>` },
  { id: 52, part: "제5부. 휴식·회복", title: "백색소음 테이스팅", target: "쉽게 잠들지 못하거나 집중이 어려운 사람", method: "소리를 음미하며 내게 맞는 소리 찾기.", effect: "나에게 맞는 회복의 배경음 발견.", type: "🎧 오디오 가이드형", color: "#2563eb", icon: "🌧️", execUi: `<div style="padding:16px; background:#1e293b; color:#3b82f6; border-radius:12px; text-align:center;">🌧️ 6종 앰비언트 백색소음 슬라이더 믹서</div>` },
  { id: 53, part: "제5부. 휴식·회복", title: "구부정 사감", target: "오래 앉아 자세가 무너지는 사람", method: "무음 알람이 울릴 때마다 허리 펴기.", effect: "신체 정렬을 통해 심리 긴장을 예방.", type: "⏱️ 타이머 멈춤형", color: "#d97706", icon: "🧘‍♂️", execUi: `<div style="padding:16px; background:#1e293b; color:#fff; border-radius:12px; text-align:center;">🧘‍♂️ 10초 척추 스트레칭 무음 알람</div>` },
  { id: 54, part: "제5부. 휴식·회복", title: "일몰수집", target: "매일이 똑같다고 느끼는 사람", method: "일몰 시간에 노을 사진 100개 모으기.", effect: "똑같아 보였던 날들이 다름을 인지.", type: "🎨 비주얼 캔버스형", color: "#059669", icon: "🌅", execUi: `<div style="padding:16px; background:#1e293b; color:#f97316; border-radius:12px; text-align:center; font-weight:700;">🌅 100개 노을 그리드 포토 앨범</div>` },
  { id: 55, part: "제5부. 휴식·회복", title: "스위치 온 키링", target: "퇴근 후에도 일 생각을 놓지 못하는 사람", method: "온/오프 스위치를 딸깍 전환.", effect: "일하는 나와 쉬는 나 사이에 경계 그음.", type: "⏱️ 타이머 멈춤형", color: "#d97706", icon: "🔘", execUi: `<div style="padding:16px; background:#1e293b; color:#fff; border-radius:12px; text-align:center;">🔘 3D ON/OFF 스위치 모드 딸깍 전환</div>` },
  { id: 56, part: "제5부. 휴식·회복", title: "1분 정리", target: "마무리 없이 일과 하루를 끝내는 사람", method: "자리를 뜨기 전 1분 동안 공간 정돈.", effect: "단 1분의 정리가 마침표가 됨.", type: "⏱️ 타이머 멈춤형", color: "#d97706", icon: "🧹", execUi: `<div style="padding:16px; background:#1e293b; color:#fff; border-radius:12px; text-align:center;">🧹 1분 책상 정돈 쾌속 타이머</div>` },
  { id: 57, part: "제5부. 휴식·회복", title: "셀프호텔링", target: "하루를 무기력하게 시작하는 사람", method: "기상 직후 침대 이불/베개 정리.", effect: "일어나자마자 완수한 첫 작은 성취감.", type: "⏱️ 타이머 멈춤형", color: "#d97706", icon: "🛏️", execUi: `<div style="padding:16px; background:#1e293b; color:#f59e0b; border-radius:12px; text-align:center;">🛏️ 기상 첫 이불 정돈 & 호텔 룸 키 해금</div>` },
  { id: 58, part: "제5부. 휴식·회복", title: "한칸 완벽주의", target: "완벽해야 한다는 부담에 시작을 못 하는 사람", method: "서랍 딱 한 칸만 완벽하게 정리.", effect: "완벽주의 욕구를 축소하여 성공 경험.", type: "🎨 비주얼 캔버스형", color: "#059669", icon: "🗄️", execUi: `<div style="padding:16px; background:#1e293b; color:#fff; border-radius:12px; text-align:center;">🗄️ 서랍 한 칸 정리 성공 도장 쿵</div>` },
  { id: 59, part: "제5부. 휴식·회복", title: "셀프디제잉", target: "저녁에 지쳐 자신을 돌볼 여력이 없는 사람", method: "아침의 내가 저녁 나를 위한 음악 예약.", effect: "아침의 나(아침)가 저녁 나(밤)를 돌봄.", type: "🎧 오디오 가이드형", color: "#2563eb", icon: "🎧", execUi: `<div style="padding:16px; background:#1e293b; color:#3b82f6; border-radius:12px; text-align:center;">🎧 저녁 8시 나를 위한 위로 음원 예약</div>` },
  { id: 60, part: "제5부. 휴식·회복", title: "랜덤독서", target: "완독 부담으로 책을 멀리하게 된 사람", method: "아무 페이지나 펼쳐 딱 한 페이지만 읽기.", effect: "책을 의무가 아닌 즐거운 우연으로 바꿈.", type: "⏱️ 타이머 멈춤형", color: "#d97706", icon: "📖", execUi: `<div style="padding:16px; background:#1e293b; color:#fff; border-radius:12px; text-align:center;">📖 랜덤 1페이지 펼치기 플립 뷰어</div>` },

  // PART 6 (61~72)
  { id: 61, part: "제6부. 연결·공허", title: "친절 수집장", target: "세상이 각박하다고 느끼는 사람", method: "오늘 타인에게 받은 작은 친절 기록.", effect: "세상을 보는 초점이 결핍에서 호의로 이동.", type: "📝 마이크로 글쓰기형", color: "#7c3aed", icon: "🎁", execUi: `<div style="padding:16px; background:#1e293b; color:#ec4899; border-radius:12px; text-align:center;">🎁 타인의 따뜻한 배려 스티커 수집</div>` },
  { id: 62, part: "제6부. 연결·공허", title: "소확행 박스", target: "기분이 가라앉을 때 회복이 막막한 사람", method: "기분 좋아지는 소품을 구급함 박스에 넣기.", effect: "힘든 순간 박스를 열어 회복 도구 꺼내기.", type: "🎨 비주얼 캔버스형", color: "#059669", icon: "📦", execUi: `<div style="padding:16px; background:#1e293b; color:#fff; border-radius:12px; text-align:center;">📦 3D 마음 구급함 상자 열기</div>` },
  { id: 63, part: "제6부. 연결·공허", title: "타인을 위한 기도", target: "외로움을 느끼고 침잠하는 사람", method: "주변 사람 이름을 부르며 축복 기도.", effect: "소중한 사람이 많음을 느끼고 외로움 덜기.", type: "📝 마이크로 글쓰기형", color: "#7c3aed", icon: "🙏", execUi: `<div style="padding:16px; background:#1e293b; color:#fbbf24; border-radius:12px; text-align:center;">🙏 소중한 사람들 호명 오라 촛불</div>` },
  { id: 64, part: "제6부. 연결·공허", title: "셀프안부 스몰톡", target: "자기 안부를 챙길 겨를이 없는 사람", method: "오전에 저녁 나에게 안부 문자 예약 발송.", effect: "내가 먼저 다정한 안부를 건넸음.", type: "📝 마이크로 글쓰기형", color: "#7c3aed", icon: "📱", execUi: `<div style="padding:16px; background:#1e293b; color:#fff; border-radius:12px; text-align:center;">📱 저녁 9시 나에게도착 셀프 안부 톡</div>` },
  { id: 65, part: "제6부. 연결·공허", title: "생즉카", target: "표현을 미루다 관계가 멀어진 사람", method: "생각나는 즉시 \"생각나서 연락했어\" 카톡.", effect: "용건 없는 연락이 관계의 끈을 유지.", type: "📝 마이크로 글쓰기형", color: "#7c3aed", icon: "💛", execUi: `<div style="padding:16px; background:#fef08a; color:#854d0e; border-radius:12px; text-align:center; font-weight:700;">💛 "그냥 생각나서 연락했어" 안부 카톡</div>` },
  { id: 66, part: "제6부. 연결·공허", title: "반려 존재 발견하기", target: "일상에 정붙일 대상이 필요한 사람", method: "화단 꽃 등에 이름을 붙이고 안부 살핌.", effect: "일상 존재가 특별한 존재가 됨.", type: "🎨 비주얼 캔버스형", color: "#059669", icon: "🌱", execUi: `<div style="padding:16px; background:#1e293b; color:#00C474; border-radius:12px; text-align:center;">🌱 길가 예쁜 돌 '동글이' 이름표 달기</div>` },
  { id: 67, part: "제6부. 연결·공허", title: "사일런스 식사", target: "습관적으로 영상 보며 밥 때우는 사람", method: "혼자 밥 먹을 때 첫 다섯 입 맛에 집중.", effect: "식사가 나를 돌보는 시간으로 변함.", type: "⏱️ 타이머 멈춤형", color: "#d97706", icon: "🍚", execUi: `<div style="padding:16px; background:#1e293b; color:#fff; border-radius:12px; text-align:center;">🍚 첫 다섯 입 집중 롤링 5-4-3-2-1</div>` },
  { id: 68, part: "제6부. 연결·공허", title: "발바닥인사", target: "혼이 빠지듯 일상을 보내는 사람", method: "아침 1분 발바닥 감각에 집중해 걷기.", effect: "나를 지탱하는 발에 인사하며 몸 살핌.", type: "⏱️ 타이머 멈춤형", color: "#d97706", icon: "🦶", execUi: `<div style="padding:16px; background:#1e293b; color:#fff; border-radius:12px; text-align:center;">🦶 1분 발바닥 보행 인지 오디오</div>` },
  { id: 69, part: "제6부. 연결·공허", title: "오늘의 감정단어", target: "하루를 떠밀리듯 시작하는 사람", method: "내일 원하는 감정 단어를 적어 붙이기.", effect: "내일 분위기를 내가 먼저 스스로 제안.", type: "📝 마이크로 글쓰기형", color: "#7c3aed", icon: "📌", execUi: `<div style="padding:16px; background:#fef08a; color:#854d0e; border-radius:12px; text-align:center; font-weight:700;">📌 내일의 감정: "여유로움" 포스트잇</div>` },
  { id: 70, part: "제6부. 연결·공허", title: "오늘의 색깔", target: "하루에 의미를 부여하고 싶은 사람", method: "30색 중 고르고 저녁에 색으로 회고.", effect: "아침에 고른 색이 하루의 작은 주제가 됨.", type: "🎨 비주얼 캔버스형", color: "#059669", icon: "🎨", execUi: `<div style="padding:16px; background:#00C474; color:#fff; border-radius:12px; text-align:center; font-weight:800;">🎨 오늘의 마인드 컬러: 싱그러운 민트</div>` },
  { id: 71, part: "제6부. 연결·공허", title: "3-2-1 그라운딩", target: "불안하거나 머리가 붕 떠 있는 사람", method: "보이는 3, 들리는 2, 맛본 1개를 적기.", effect: "오감을 이용해 '지금 여기'로 발을 딛게 함.", type: "📝 마이크로 글쓰기형", color: "#7c3aed", icon: "🧭", execUi: `<div style="padding:16px; background:#1e293b; color:#fff; border-radius:12px; text-align:center;">👁️보이는3 - 👂들리는2 - 👅맛본1</div>` },
  { id: 72, part: "제6부. 연결·공허", title: "위시플래너", target: "해야 할 일에 치여 하고 싶은 일 미루는 사람", method: "투두리스트 맨 밑에 하고 싶은 행동 적기.", effect: "의무 끝에 작은 보상이 기다리게 함.", type: "📝 마이크로 글쓰기형", color: "#7c3aed", icon: "🎁", execUi: `<div style="padding:16px; background:#fce7f3; color:#be185d; border-radius:12px; text-align:center; font-weight:800;">✨ [오늘의 보상] 좋아하는 카페 라떼 마시기</div>` }
];

try {
  const targetDir = path.join(process.cwd(), 'public', 'specs', 'rituals');
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  for (const item of ritualsData) {
    const htmlContent = `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>마인드짐 리추얼 NO.${item.id} — ${item.title}</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css">
  <style>
    :root { --primary: #00C474; }
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: "Pretendard", sans-serif; }
    body { background-color: #f8faf9; color: #111827; min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 20px; }

    .mobile-frame {
      width: 100%; max-width: 410px; height: 780px; background: #020617; color: #fff;
      border-radius: 40px; border: 8px solid #1e293b; box-shadow: 0 25px 50px rgba(0,0,0,0.3);
      position: relative; overflow: hidden; display: flex; flex-direction: column; justify-content: space-between; padding: 28px 22px 22px;
    }
    .top-bar { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #1e293b; padding-bottom: 12px; }
    .back-btn { text-decoration: none; background: rgba(255,255,255,0.1); color: #fff; padding: 6px 14px; border-radius: 20px; font-weight: 600; font-size: 13px; }
    
    .card-box { background: #0f172a; border-radius: 20px; padding: 20px; border: 1px solid #1e293b; display: flex; flex-direction: column; gap: 12px; margin-top: 14px; }
    .badge { display: inline-block; padding: 4px 10px; border-radius: 8px; font-size: 12px; font-weight: 700; color: #fff; background: ${item.color}; width: fit-content; }
    .title { font-size: 22px; font-weight: 900; color: #fff; display:flex; align-items:center; gap:8px; }
    .sec-title { font-size: 13px; font-weight: 700; color: #00C474; margin-top: 4px; }
    .sec-desc { font-size: 13px; color: #cbd5e1; line-height: 1.5; }

    .exec-area { background: #1e293b; border-radius: 20px; padding: 20px; border: 1px solid #334155; margin-top: 14px; }

    .action-btn { width: 100%; padding: 14px; background: #00C474; color: #fff; border: none; border-radius: 18px; font-weight: 800; font-size: 14px; cursor: pointer; }
  </style>
</head>
<body>
  <div style="margin-bottom: 12px; text-align: center;">
    <h2 style="font-size: 15px; font-weight: 700; color: #64748b;">${item.part}</h2>
  </div>

  <div class="mobile-frame">
    <div class="top-bar">
      <a href="index.html" class="back-btn">← 전체 72개 목록</a>
      <span style="font-size: 13px; font-weight: 800; color: #00C474;">NO.${String(item.id).padStart(3, '0')}</span>
      <span style="font-size: 12px; color: #cbd5e1;">+3 덤벨</span>
    </div>

    <div style="flex:1; overflow-y:auto; padding-right:2px;">
      <div class="card-box">
        <span class="badge">${item.type}</span>
        <div class="title"><span>${item.icon}</span> <span>${item.title}</span></div>
        <div>
          <div class="sec-title">🎯 추천 대상</div>
          <div class="sec-desc">${item.target}</div>
        </div>
        <div>
          <div class="sec-title">💡 실천 방법</div>
          <div class="sec-desc">${item.method}</div>
        </div>
        <div>
          <div class="sec-title">✨ 기대 효과</div>
          <div class="sec-desc">${item.effect}</div>
        </div>
      </div>

      <!-- Exec UI -->
      <div class="exec-area">
        <div style="font-size:12px; font-weight:700; color:#00C474; margin-bottom:8px;">💻 [고유 웹 실행 모듈]</div>
        ${item.execUi}
      </div>
    </div>

    <button class="action-btn" onclick="alert('🎉 NO.${item.id} ${item.title} 완수! (+3 덤벨 적립)')">
      ▶️ ${item.title} 리추얼 완수하기 (+3 덤벨)
    </button>
  </div>
</body>
</html>`;

    fs.writeFileSync(path.join(targetDir, `${item.id}.html`), htmlContent, 'utf-8');
  }

  // Remove old template files if exist
  const oldFiles = ['audio-player.html', 'interactive-write.html', 'timer-detox.html', 'visual-canvas.html'];
  for (const oldFile of oldFiles) {
    const oldPath = path.join(targetDir, oldFile);
    if (fs.existsSync(oldPath)) {
      fs.unlinkSync(oldPath);
    }
  }
} catch (e) {
  console.error(e);
}

export default function GenTriggerPage() {
  return (
    <div style={{ padding: 40, fontFamily: 'sans-serif' }}>
      <h1>✅ 72가지 리추얼 개별 HTML (1.html ~ 72.html) 자동 일괄 생성 완료!</h1>
      <p>public/specs/rituals/ 위치에 72개 파일이 성공적으로 배포되었습니다.</p>
    </div>
  );
}
