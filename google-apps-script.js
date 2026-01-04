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
    
    // 데이터 파싱 (JSON 또는 파라미터)
    let data;
    if (e.postData && e.postData.contents) {
      // JSON 형식
      data = JSON.parse(e.postData.contents);
    } else {
      // 파라미터 형식
      data = e.parameter;
    }
    
    // 타임스탬프 생성 (한국 시간)
    const timestamp = new Date();
    const koreaTime = Utilities.formatDate(timestamp, Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss');
    
    // 시트에 데이터 추가
    sheet.appendRow([
      data.timestamp || koreaTime,
      data.name || '',
      data.email || '',
      data.category || '',
      data.subject || '',
      data.message || ''
    ]);
    
    // 성공 응답 (CORS 헤더 추가)
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'success',
        'message': '피드백이 성공적으로 저장되었습니다.'
      }))
      .setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // 에러 응답
    Logger.log('Error: ' + error.toString());
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
  
  