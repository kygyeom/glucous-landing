# GlucoUS - 정밀 혈당 관리 앱 프로토타입

> **"사진 한 장으로 시작하는 초정밀 혈당 관리"**

GlucoUS는 손 크기를 기준점으로 활용하여 음식의 실제 양을 정확하게 측정하고, AI 기반 혈당 예측을 제공하는 당뇨 관리 웹 애플리케이션 프로토타입입니다.

---

## 📋 목차

- [프로젝트 개요](#프로젝트-개요)
- [주요 기능](#주요-기능)
- [사용자 흐름](#사용자-흐름)
- [기술 스택](#기술-스택)
- [화면별 상세 설명](#화면별-상세-설명)
- [AI 적용 로직](#ai-적용-로직)
- [데이터 구조](#데이터-구조)
- [설치 및 실행](#설치-및-실행)
- [프로젝트 구조](#프로젝트-구조)

---

## 🎯 프로젝트 개요

GlucoUS는 기존 사진 기반 음식 측정 방식의 한계(약 40-50% 오차)를 해결하기 위해, 사용자의 손 크기를 기준점(Anchor)으로 활용하여 음식의 부피를 정확하게 측정(약 10-15% 오차)하고, 이를 바탕으로 AI가 혈당 스파이크를 예측하는 혁신적인 당뇨 관리 솔루션입니다.

### 핵심 가치

- **정확한 양 측정**: 손 크기 기준점을 통한 부피 기반 측정
- **AI 기반 혈당 예측**: 개인 맞춤형 식후 혈당 스파이크 예측
- **직관적인 UX**: 인스타그램 스타일의 기록 관리 및 시각화
- **과학적 근거**: 선행 연구(Gibson et al., 2016 등) 기반 검증 모델

---

## ✨ 주요 기능

### 1. 온보딩 및 사용자 설정
- 사용자 기본 정보 입력 (닉네임, 나이, 키, 몸무게)
- 당뇨 유형 선택 (1형, 2형, 임신성, 전단계 등)
- 알레르기 및 제한 음식 등록
- **손 크기 측정** (XS, S, M, L, XL) - 핵심 기능

### 2. 식사 기록
- 카메라 촬영 또는 텍스트/음성 입력
- AI 기반 음식 식별 및 분류
- 손 크기 기준 부피 측정
- 슬라이더를 통한 섭취량 조절
- 실시간 탄수화물 및 예상 혈당 계산

### 3. 기록 관리
- 일일 타임라인 뷰
- 갤러리 및 달력 연동
- 주간 리포트 및 통계 분석
- 상세 영양 성분 분석

### 4. 개인화
- 사용자 프로필 관리
- AI 모델 개인화 파라미터 업데이트

---

## 🗺️ 사용자 흐름

```
┌─────────────────┐
│ Screen_Loading  │ (스플래시)
└────────┬────────┘
         │
         ▼
┌─────────────────┐      ┌──────────────┐
│ Screen_init_info│◄────►│ Screen_hand  │ (손 크기 설명 및 측정)
│  (온보딩)       │      │  (브릿지)    │
└────────┬────────┘      └──────┬───────┘
         │                       │
         └───────────┬───────────┘
                     │
                     ▼
        ┌────────────────────┐
        │   ScreenA (촬영)   │
        └──────────┬─────────┘
                   │
                   ▼
        ┌────────────────────┐
        │ ScreenB (분석 중)  │
        └──────────┬─────────┘
                   │
                   ▼
        ┌────────────────────┐
        │ ScreenC (음식 선택)│
        └──────────┬─────────┘
                   │
                   ▼
        ┌────────────────────┐
        │ ScreenD (양 조절)  │ ⭐ 핵심 기능
        └──────────┬─────────┘
                   │
                   ▼
        ┌────────────────────┐      ┌───────────────┐
        │  ScreenE (히스토리)│◄────►│ ScreenF (상세)│
        └──────────┬─────────┘      └───────────────┘
                   │
                   ▼
        ┌────────────────────┐
        │ Screen_userpage    │
        └────────────────────┘
```

---

## 🛠️ 기술 스택

### Frontend
- **HTML5**: 시맨틱 마크업
- **CSS3**: 
  - Tailwind CSS (유틸리티 퍼스트 스타일링)
  - 커스텀 애니메이션 (fade-in, slide-up, scan line 등)
  - Glassmorphism 효과
- **JavaScript (Vanilla)**:
  - DOM 조작 및 이벤트 핸들링
  - localStorage 기반 데이터 관리
  - 동적 UI 업데이트

### 디자인 시스템
- **폰트**: Inter (Google Fonts)
- **아이콘**: Font Awesome 6.4.0
- **컬러 팔레트**:
  - Primary: `#18D9C2` (Teal)
  - Warning: `#F6C343` (Yellow)
  - Danger: `#FF5C5C` (Red)
  - Background: `#0B0F12` (Dark)

---

## 📱 화면별 상세 설명

### 온보딩 (Onboarding)

#### Screen_Loading
- **기능**: 앱 로고 노출 및 페이드인 애니메이션
- **자동 전환**: 4초 후 다음 화면으로 이동

#### Screen_init_info
- **기능**: 사용자 기본 정보 수집
  - Step 1: 닉네임, 나이, 성별
  - Step 2: 키, 몸무게
  - Step 3: 당뇨 유형 선택
  - Step 4: 알레르기 및 제한 음식
- **이동**: Step 4 완료 후 → `Screen_hand.html`

#### Screen_hand
- **기능**: 
  - 손 크기 측정의 중요성 설명 (선행 연구 기반)
  - 양 추정 오차율 비교 그래프 (일반 사진 ±45% vs GlucoUS ±10%)
  - 손 크기 선택 (XS, S, M, L, XL)
- **플로우**: 
  - 1단계: 설명 확인 → "다음으로" 클릭
  - 2단계: 손 크기 선택 → "완료" 클릭
- **이동**: 완료 후 → `ScreenA.html`

### 메인 기능 (Main Routine)

#### ScreenA (Camera)
- **기능**:
  - 뷰파인더 (비율 조절: 4:3, 1:1, FULL)
  - 플래시, 그리드, 줌 컨트롤 (1x, 2x, 3x)
  - 탭 투 포커스
  - 텍스트/음성 입력 모드
- **이동**: 촬영 또는 입력 완료 → `ScreenB.html`

#### ScreenB (Analyzing)
- **기능**:
  - 스캔 애니메이션
  - 분석 단계 표시 (식별 → 매칭 → 측정)
- **자동 전환**: 약 5초 후 → `ScreenC.html`

#### ScreenC (Selection)
- **기능**:
  - AI 분석 음식 후보 제시
  - 1순위 자동 선택 타이머 (4초)
  - 카드 선택 및 확정
- **이동**: 확정 시 → `ScreenD.html`

#### ScreenD (Volume & Predict) ⭐ 핵심
- **기능**:
  - 손 이미지(기준)와 그릇(가변) 비교 UI
  - 슬라이더로 섭취량 조절 (0.1 ~ 2.0 인분)
  - 실시간 탄수화물 및 예상 혈당 계산
  - 시각적 피드백 (Teal: 안전, Yellow: 주의, Red: 위험)
- **AI 로직**: 부피 측정 → 밀도 적용 → 중량 변환 → 혈당 예측
- **이동**: 완료 시 → `ScreenE.html`

### 관리 및 피드백 (Management)

#### ScreenE (History)
- **기능**:
  - 탭 구조:
    - **오늘**: 타임라인 뷰
    - **갤러리**: 그리드 뷰 (달력 연동)
    - **리포트**: 주간 통계
  - 기록 상세보기
- **이동**: 
  - 기록 클릭 → `ScreenF.html`
  - 유저 아이콘 → `Screen_userpage.html`
  - "식사 기록하기" → `ScreenA.html`

#### ScreenF (Detail)
- **기능**:
  - 영양 성분 상세 (탄수화물, 단백질, 지방, 식이섬유, 나트륨)
  - 실제 식후 혈당 입력 (향후 기능)
  - 메모 기능 (향후 기능)
- **이동**: 뒤로가기 → `ScreenE.html`

#### Screen_userpage
- **기능**:
  - 사용자 정보 조회 및 수정
  - localStorage 데이터 로드/저장
- **이동**: 수정 완료 → `ScreenA.html`

---

## 🤖 AI 적용 로직

### 1. 음식 식별 (Food Recognition)
- **모델**: EfficientNet 기반 이미지 분류 (예정)
- **입력**: 촬영된 음식 이미지
- **출력**: 음식 종류 및 확률값 (Confidence Score)
- **적용 화면**: ScreenB → ScreenC

### 2. 부피 측정 (Volume Estimation)
- **기준점**: 사용자 손 크기 (`handSizeMm`)
- **계산식**: 
  ```
  그릇_직경 / 손_크기 = 비율
  부피 = π × (비율 × 손_크기 / 2)² × 깊이_계수
  ```
- **적용 화면**: ScreenD

### 3. 밀도 적용 (Density Map)
- **데이터**: 음식별 물리적 밀도 (g/cm³)
- **계산식**:
  ```
  중량(g) = 부피(cm³) × 밀도(g/cm³)
  ```
- **적용 화면**: ScreenD

### 4. 혈당 예측 (Glucose Prediction)
- **입력 변수**:
  - 탄수화물 중량 (g)
  - 사용자 당뇨 유형
  - 사용자 BMI
  - 과거 식사 패턴 (향후)
- **모델**: 개인화된 선형/비선형 회귀 모델 (예정)
- **출력**: 식후 2시간 예상 혈당 증가량
- **적용 화면**: ScreenD

### 5. 추천 엔진 (Recommendation Engine)
- **로직**: 
  - 이미지 확률값
  - 사용자 과거 식사 패턴
  - 시간대별 선호도
- **적용 화면**: ScreenC

### 6. 트렌드 분석 (Trend Analysis)
- **기능**: 주간 혈당 변동성, 영양 섭취 비율 통계
- **적용 화면**: ScreenE (리포트 탭)

### 7. 피드백 루프 (Feedback Loop)
- **목적**: 강화학습을 통한 예측 정확도 향상
- **데이터**: 실제 혈당 vs 예상 혈당 차이
- **적용 화면**: ScreenF → ScreenD (향후)

---

## 💾 데이터 구조

### localStorage: `glucoUser`
```javascript
{
  name: string,              // 닉네임
  age: number,               // 나이
  gender: 'M' | 'F',         // 성별
  height: number,            // 키 (cm)
  weight: number,            // 몸무게 (kg)
  diabetesType: string,      // 당뇨 유형
  allergies: string,         // 알레르기/제한 음식
  handSize: 'XS' | 'S' | 'M' | 'L' | 'XL',  // 손 크기
  handSizeMm: number         // 손 크기 (mm) - 핵심 데이터
}
```

### 손 크기 매핑
| 사이즈 | mm | 설명 |
|--------|----|----|
| XS | 140 | 손이 작은 여성 |
| S | 155 | 대한민국 여성 평균 |
| M | 170 | 평균 손 크기 |
| L | 185 | 대한민국 남성 평균 (기본값) |
| XL | 195 | 손이 큰 남성 |

---

## 🚀 설치 및 실행

### 요구사항
- 웹 브라우저 (Chrome, Safari, Firefox 최신 버전 권장)
- 로컬 웹 서버 (선택사항, localStorage 사용을 위해 권장)

### 실행 방법

#### 방법 1: 직접 실행
```bash
# 프로젝트 폴더 열기
cd Glucous_main_app

# 브라우저에서 Screen_Loading.html 열기
# 또는 첫 화면인 Screen_init_info.html 열기
```

#### 방법 2: 로컬 서버 실행 (권장)
```bash
# Python 3 사용 시
python -m http.server 8000

# Node.js 사용 시 (http-server 필요)
npx http-server -p 8000

# 브라우저에서 http://localhost:8000 접속
```

### 시작 화면
- **온보딩 미완료**: `Screen_init_info.html` 또는 `Screen_Loading.html`
- **온보딩 완료**: `ScreenA.html`

---

## 📁 프로젝트 구조

```
Glucous_main_app/
│
├── README.md                    # 프로젝트 문서
│
├── Screen_Loading.html          # 스플래시 화면
├── Screen_init_info.html        # 온보딩 (기본 정보)
├── Screen_hand.html             # 손 크기 설명 및 측정
│
├── ScreenA.html                 # 카메라 (촬영)
├── ScreenB.html                 # 분석 중
├── ScreenC.html                 # 음식 선택
├── ScreenD.html                 # 양 조절 (핵심)
│
├── ScreenE.html                 # 히스토리/리포트
├── ScreenF.html                 # 상세 분석
├── Screen_userpage.html         # 사용자 프로필
│
├── GlucoUS_logo.png             # 앱 로고
├── GlucoUS_test_logo.png        # 테스트 로고
├── hand_image.png               # 손 이미지
├── hand_scale_image.svg         # 손 크기 측정 이미지
├── hand_measure.png             # 손 측정 이미지
└── mainfood_9_19.jpeg           # 배경 이미지
```

---

## 📚 참고 문헌 (References)

본 프로젝트는 다음 선행 연구를 참고하여 개발되었습니다:

1. Smart, C. E., et al. (2010). Errors in estimation of carbohydrate... *Diabetic Medicine*.
2. Pouladzadeh, P., et al. (2014). Measuring Calorie and Nutrition... *IEEE*.
3. **Gibson, A. A., et al. (2016). Accuracy of hand-based estimates... *Nutrition & Dietetics*.** ⭐ 핵심 참고
4. Xu, Y., et al. (2021). Volume Estimation... Using a Reference Object. *Nutrients*.
5. Grau, I., et al. (2022). Nutrient Estimation... using Density-Based Methods. *J. Food Eng*.

---

## 🎨 UX 디테일

### 시각적 피드백
- **ScreenD**: 붉은색(위험) / 노란색(주의) / 초록색(안전) 색상으로 직관적 경고
- **ScreenE**: 인스타그램 스타일 그리드 및 달력 연동
- **ScreenA**: 네이티브 카메라 앱과 유사한 인터페이스 (줌, 포커스, 그리드)

### 애니메이션
- 페이드인/아웃
- 슬라이드 업
- 스캔 라인
- 카운트다운
- 바운스 효과

---

## 🔮 향후 개발 계획

- [ ] 실제 AI 모델 통합 (음식 식별, 혈당 예측)
- [ ] 백엔드 API 연동
- [ ] 사용자 인증 및 클라우드 동기화
- [ ] 실제 혈당 데이터 입력 및 피드백 루프 구현
- [ ] 모바일 앱 (React Native / Flutter) 개발
- [ ] 실시간 음식 추천 기능
- [ ] 소셜 기능 (공유, 커뮤니티)

---

## 📄 라이선스

이 프로젝트는 MVP 검증용 프로토타입입니다.

---

## 👥 기여

프로젝트 개선을 위한 제안과 피드백을 환영합니다!

---

**GlucoUS** - 정확한 측정으로 시작하는 건강한 혈당 관리 🩺

