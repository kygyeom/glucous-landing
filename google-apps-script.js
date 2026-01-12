/**
 * Google Apps Script 코드
 * 
 * 사용 방법:
 * 1. Google Drive에서 새 Google Sheets를 만듭니다
 * 2. 확장 프로그램 > Apps Script 메뉴를 클릭합니다
 * 3. 아래 코드를 복사하여 붙여넣습니다
 * 4. 첫 번째 행에 헤더를 추가합니다: 타임스탬프, 이름, 이메일, 카테고리, 제목, 내용
 * 5. 저장 후 배포 > 새 배포를 클릭합니다
 * 6. 유형 선택 > 웹 앱을 선택합니다
 * 7. 다음 앱 실행: 나를 선택합니다
 * 8. 앱에 액세스할 수 있는 사용자: 모든 사용자를 선택합니다
 * 9. 배포 버튼을 클릭합니다
 * 10. 보안 경고가 나타나면 "Advanced"를 클릭한 후 "Go to [프로젝트 이름] (unsafe)"를 클릭합니다
 * 11. 웹 앱 URL을 복사하여 feedback.html의 GOOGLE_SCRIPT_URL에 붙여넣습니다
 */

function doPost(e) {
  try {
    // 현재 스프레드시트 사용 (스크립트가 연결된 시트)
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // URLSearchParams로 전송된 데이터는 e.parameter로 받아짐
    const data = e.parameter || {};
    
    // 타임스탬프 생성 (한국 시간)
    const timestamp = new Date();
    const koreaTime = Utilities.formatDate(timestamp, Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss');
    
    // 시트에 데이터 추가 (e.parameter에서 직접 가져옴)
    sheet.appendRow([
      koreaTime,
      data.name || '',
      data.email || '',
      data.category || '',
      data.subject || '',
      data.message || ''
    ]);
    
    // 성공 응답
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'success',
        'message': '피드백이 성공적으로 저장되었습니다.'
      }))
      .setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // 에러 응답
    Logger.log('Error: ' + error.toString());
    Logger.log('Parameters: ' + JSON.stringify(e.parameter));
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'error',
        'message': error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * GET 요청 테스트용 함수
 */
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      'status': 'ok',
      'message': 'Google Apps Script is working!'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * apply.html용 doPost 함수 (베타 테스터 신청)
 * 
 * 사용 방법:
 * 1. Google Drive에서 새 Google Sheets를 만듭니다
 * 2. 시트 이름을 '시트1'로 설정합니다
 * 3. 첫 번째 행에 헤더를 추가합니다: 타임스탬프, 이름, 연락처, 이메일, 결제방식
 * 4. 아래 코드를 복사하여 Apps Script에 붙여넣습니다
 * 5. 저장 후 배포 > 새 배포를 클릭합니다
 * 6. 유형 선택 > 웹 앱을 선택합니다
 * 7. 다음 앱 실행: 나를 선택합니다
 * 8. 앱에 액세스할 수 있는 사용자: 모든 사용자를 선택합니다
 * 9. 배포 버튼을 클릭합니다
 * 10. 웹 앱 URL을 복사하여 apply.html의 GOOGLE_SCRIPT_URL에 붙여넣습니다
 */

// 1. 여기에 시트 이름을 정확히 적어주세요 (보통 '시트1' 또는 'Sheet1')
var SHEET_NAME = '시트1'; 

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = doc.getSheetByName(SHEET_NAME);
    
    // 시트가 없을 경우 에러 처리
    if (!sheet) {
      throw new Error('시트를 찾을 수 없습니다: ' + SHEET_NAME);
    }

    // 2. 폼에서 넘어온 데이터를 변수에 담습니다.
    // (HTML의 name 속성과 일치해야 합니다)
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    // 타임스탬프를 한국 시간 형식으로 포맷
    var timestamp = new Date();
    var koreaTime = Utilities.formatDate(timestamp, Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss');
    
    var nextRow = headers.map(function(header) {
      if(header === '타임스탬프') {
        return koreaTime; // 한국 시간 형식으로 반환
      }
      return e.parameter[header] || ''; // 값이 없으면 빈 문자열
    });

    sheet.appendRow(nextRow);
    
    // 로깅 (디버깅용)
    Logger.log('데이터 저장 완료: ' + JSON.stringify(nextRow));

    return ContentService
      .createTextOutput(JSON.stringify({ 
        "result": "success", 
        "row": nextRow 
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // 에러 로깅
    Logger.log('Error: ' + error.toString());
    Logger.log('Parameters: ' + JSON.stringify(e.parameter));
    
    // 에러 객체를 직접 stringify하면 순환 참조 문제가 있을 수 있으므로 메시지만 전달
    return ContentService
      .createTextOutput(JSON.stringify({ 
        "result": "error", 
        "error": error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

/**
 * GET 요청 테스트용 함수 (웹 앱 배포 시 필수)
 */
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      'status': 'ok',
      'message': 'Google Apps Script is working!',
      'sheet': SHEET_NAME
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
  
   