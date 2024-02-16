package com.khit.media.controller;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/data")
@Controller
public class DataController {
    @GetMapping("/data")
    public String data() {
        return "/data/data";
    }

    @GetMapping("/data2")
    public String data2(Model model) {
        try {
            // JSON 데이터를 가져올 URL
            URL url = new URL("https://www.safetydata.go.kr//openApi/%EC%82%B0%EB%A6%BC%EC%B2%AD_%EA%B8%B0%EA%B4%80%EC%9A%A9_%EA%B8%88%EC%9D%BC%EC%82%B0%EB%B6%88%EB%B0%9C%EC%83%9D%ED%98%84%ED%99%A9?serviceKey=99B550AQ7I5U4H06&returnType=json&pageNum=1&numRowsPerPage=5");

            // HTTP 연결 설정
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("GET");

            // 응답 읽기
            BufferedReader reader = new BufferedReader(new InputStreamReader(con.getInputStream()));
            StringBuilder response = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                response.append(line);
            }
            reader.close();

            // JSON 파싱
            JSONObject jsonObject = new JSONObject(response.toString());

            // responseData가 null이 아닌지 확인
            if (jsonObject.has("responseData")) {
                JSONObject responseData = jsonObject.getJSONObject("responseData");

                // data가 null이 아닌지 확인
                if (responseData.has("data")) {
                    JSONArray data = responseData.getJSONArray("data");

                    List<Map<String, String>> dataList = new ArrayList<>();

                    for (int i = 0; i < data.length(); i++) {
                        JSONObject item = data.getJSONObject(i);
                        // 필요한 다른 필드도 동일한 방법으로 출력 가능

                        Map<String, String> dataMap = new HashMap<>();
                        // 데이터 가져오기
                        dataMap.put("FRFR_INFO_ID", getStringFromJson(item, "FRFR_INFO_ID"));
                        dataMap.put("FRFR_STTMN_LCTN_XCRD", getStringFromJson(item, "FRFR_STTMN_LCTN_XCRD"));
                        dataMap.put("FRFR_STTMN_LCTN_YCRD", getStringFromJson(item, "FRFR_STTMN_LCTN_YCRD"));
                        dataMap.put("FRFR_STTMN_DT", getStringFromJson(item, "FRFR_STTMN_DT"));
                        dataMap.put("FRFR_STTMN_HMS", getStringFromJson(item, "FRFR_STTMN_HMS"));
                        dataMap.put("FRFR_STTMN_ADDR", getStringFromJson(item, "FRFR_STTMN_ADDR"));
                        dataMap.put("FRFR_OCCRR_TPCD", getStringFromJson(item, "FRFR_OCCRR_TPCD"));
                        dataMap.put("FRFR_PRGRS_STCD", getStringFromJson(item, "FRFR_PRGRS_STCD"));
                        dataMap.put("FRFR_FRNG_DTM", getStringFromJson(item, "FRFR_FRNG_DTM"));
                        dataMap.put("FRFR_OCCRR_ADDR", getStringFromJson(item, "FRFR_OCCRR_ADDR"));
                        dataMap.put("FRFR_LCTN_YCRD", getStringFromJson(item, "FRFR_LCTN_YCRD"));
                        dataMap.put("FRFR_LCTN_XCRD", getStringFromJson(item, "FRFR_LCTN_XCRD"));
                        dataMap.put("FRST_RGSTN_DTM", getStringFromJson(item, "FRST_RGSTN_DTM"));
                        dataMap.put("LAST_UPDT_DTM", getStringFromJson(item, "LAST_UPDT_DTM"));
                        dataList.add(dataMap);
                    }

                    // 모델에 데이터 리스트 추가
                    model.addAttribute("dataList", dataList);
                }
            }

            // 연결 종료
            con.disconnect();
        } catch (Exception e) {
            e.printStackTrace();
        }

        // 렌더링할 뷰의 이름 반환
        return "/data/data2";
    }

    // JSON에서 필드 값 가져오기, 값이 없으면 빈 문자열 반환
    private String getStringFromJson(JSONObject json, String key) {
        return json.has(key) ? json.getString(key) : "";
    }
    
    
    @GetMapping("/data3")
    public String data3(Model model) {
        try {
            // JSON 데이터를 가져올 URL
            URL url = new URL("https://www.safetydata.go.kr//openApi/%EA%B8%B0%EC%83%81%EC%B2%AD_%EC%A7%80%EC%A7%84%ED%86%B5%EB%B3%B4?serviceKey=Q741B4CFT0AYOQ27&returnType=json&pageNum=1&numRowsPerPage=10");

            // HTTP 연결 설정
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("GET");

            // 응답 읽기
            BufferedReader reader = new BufferedReader(new InputStreamReader(con.getInputStream()));
            StringBuilder response = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                response.append(line);
            }
            reader.close();

            // JSON 파싱
            JSONObject jsonObject = new JSONObject(response.toString());
            JSONObject responseData = jsonObject.getJSONObject("responseData");
            JSONArray data = responseData.getJSONArray("data");

            List<Map<String, String>> dataList = new ArrayList<>();

            // 데이터 출력
            for (int i = 0; i < data.length(); i++) {
                JSONObject item = data.getJSONObject(i);

                Map<String, String> dataMap = new HashMap<>();
                dataMap.put("LOC_LOC", item.getString("LOC_LOC"));
                dataMap.put("GB_LVL", item.getString("GB_LVL"));
                dataMap.put("NO_REF", item.getString("NO_REF"));
                dataMap.put("CORD_LAT", item.getString("CORD_LAT"));
                dataMap.put("INTENSITY_PAGEURI", item.getString("INTENSITY_PAGEURI"));
                dataMap.put("DT_STFC", item.getString("DT_STFC"));
                dataMap.put("DT_TM_FC", item.getString("DT_TM_FC"));
                dataMap.put("DT_ID", item.getString("DT_ID"));
                dataMap.put("CD_STN", item.getString("CD_STN"));
                dataMap.put("DT_REGT", item.getString("DT_REGT"));
                dataMap.put("CORD_LON", item.getString("CORD_LON"));
                dataMap.put("INTENSITY_DESC", item.getString("INTENSITY_DESC"));
                dataMap.put("NO_ORD", item.getString("NO_ORD"));
                dataMap.put("STAT_OTHER", item.getString("STAT_OTHER"));
                dataMap.put("SECT_SCLE", item.getString("SECT_SCLE"));
                dataMap.put("NO_REGT_SEQ", item.getString("NO_REGT_SEQ"));
                dataList.add(dataMap);
            }

            // 모델에 데이터 리스트 추가
            model.addAttribute("dataList", dataList);

            // 연결 종료
            con.disconnect();
        } catch (Exception e) {
            e.printStackTrace();
        }

        // 렌더링할 뷰의 이름 반환
        return "/data/data3";
    }
    @GetMapping("/data4")
    public String data4(Model model) {
    	try {
    		// JSON 데이터를 가져올 URL
    		URL url = new URL("https://www.safetydata.go.kr/openApi/%EA%B8%B0%EC%83%81%EC%B2%AD_AWS%EA%B4%80%EC%B8%A1%EC%9E%90%EB%A3%8C?serviceKey=UERWW18XW3KPYI4V&returnType=json&pageNum=1&numRowsPerPage=10");
    		
    		// HTTP 연결 설정
    		HttpURLConnection con = (HttpURLConnection) url.openConnection();
    		con.setRequestMethod("GET");
    		
    		// 응답 읽기
    		BufferedReader reader = new BufferedReader(new InputStreamReader(con.getInputStream()));
    		StringBuilder response = new StringBuilder();
    		String line;
    		while ((line = reader.readLine()) != null) {
    			response.append(line);
    		}
    		reader.close();
    		
    		// JSON 파싱
    		JSONObject jsonObject = new JSONObject(response.toString());
    		JSONObject responseData = jsonObject.getJSONObject("responseData");
    		JSONArray data = responseData.getJSONArray("data");
    		
    		List<Map<String, String>> dataList = new ArrayList<>();
    		
    		// 데이터 출력
    		for (int i = 0; i < data.length(); i++) {
    			JSONObject item = data.getJSONObject(i);
    			
    			Map<String, String> dataMap = new HashMap<>();
    			dataMap.put("AP_PS", item.getString("AP_PS"));
    			dataMap.put("CORD_LAT", item.getString("CORD_LAT"));
    			dataMap.put("DT_OBZ", item.getString("DT_OBZ"));
    			dataMap.put("WV_WS", item.getString("WV_WS"));
    			dataMap.put("WTHR_HM", item.getString("WTHR_HM"));
    			dataMap.put("CD_STN", item.getString("CD_STN"));
    			dataMap.put("DT_REGT", item.getString("DT_REGT"));
    			dataMap.put("CORD_LON", item.getString("CORD_LON"));
    			dataMap.put("AP_PA", item.getString("AP_PA"));
    			dataMap.put("CORD_HT", item.getString("CORD_HT"));
    			dataMap.put("WTHR_DAY", item.getString("WTHR_DAY"));
    			dataMap.put("WTHR_1HR_BAK", item.getString("WTHR_1HR_BAK"));
    			dataMap.put("AT_AVG_TA", item.getString("AT_AVG_TA"));
    			dataMap.put("WTHR_1HR", item.getString("WTHR_1HR"));
    			dataMap.put("WIND_WD", item.getString("WIND_WD"));
    			dataMap.put("WTHR_YN", item.getString("WTHR_YN"));
    			dataList.add(dataMap);
    		}
    		
    		// 모델에 데이터 리스트 추가
    		model.addAttribute("dataList", dataList);
    		
    		// 연결 종료
    		con.disconnect();
    	} catch (Exception e) {
    		e.printStackTrace();
    	}
    	
    	// 렌더링할 뷰의 이름 반환
    	return "/data/data4";
    }
    @GetMapping("/data5")
    public String data5(ModelMap modelMap) {
        try {
            // JSON 데이터를 가져올 URL
            URL url = new URL("https://www.safetydata.go.kr/openApi/%ED%96%89%EC%A0%95%EC%95%88%EC%A0%84%EB%B6%80_%EB%B6%95%EA%B4%B4%EC%82%AC%EA%B3%A0_%EB%B0%9C%EC%83%9D%EC%9D%B4%EB%A0%A5?serviceKey=XS5O342X7EX8SQNR&returnType=json&pageNum=1&numRowsPerPage=10");
            
            // HTTP 연결 설정
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("GET");
            
            // 응답 읽기
            BufferedReader reader = new BufferedReader(new InputStreamReader(con.getInputStream()));
            StringBuilder response = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                response.append(line);
            }
            reader.close();
            
            // JSON 파싱
            JSONObject jsonObject = new JSONObject(response.toString());
            JSONObject responseData = jsonObject.getJSONObject("responseData");
            JSONArray data = responseData.getJSONArray("data");
            
            List<Map<String, String>> dataList = new ArrayList<>();
            
            // 데이터 출력
            for (int i = 0; i < data.length(); i++) {
                JSONObject item = data.getJSONObject(i);
                
                Map<String, String> dataMap = new HashMap<>();
                dataMap.put("OCCU_MT", getStringFromItem(item, "OCCU_MT"));
                dataMap.put("OCCU_DE", getStringFromItem(item, "OCCU_DE"));
                dataMap.put("ADRES", getStringFromItem(item, "ADRES"));
                dataMap.put("RN_ADRES", getStringFromItem(item, "RN_ADRES"));
                dataMap.put("RESN", getStringFromItem(item, "RESN"));
                dataMap.put("CASLT", getStringFromItem(item, "CASLT"));
                dataMap.put("DEATH", getStringFromItem(item, "DEATH"));
                dataMap.put("INJPSN", getStringFromItem(item, "INJPSN"));
                dataMap.put("AMOUNT", getStringFromItem(item, "AMOUNT"));
                dataMap.put("CTPRVN_CD", getStringFromItem(item, "CTPRVN_CD"));
                dataMap.put("SGG_CD", getStringFromItem(item, "SGG_CD"));
                dataMap.put("EMD_CD", getStringFromItem(item, "EMD_CD"));
                dataList.add(dataMap);
            }
            
            // 모델에 데이터 리스트 추가
            modelMap.addAttribute("dataMapList", dataList);
            
            // 연결 종료
            con.disconnect();
        } catch (Exception e) {
            e.printStackTrace();
        }
        
        // 렌더링할 뷰의 이름 반환
        return "/data/data5";
    }

    private String getStringFromItem(JSONObject item, String key) {
        try {
            // key가 존재하지 않거나 값이 null일 경우 "없음" 반환
            return item.has(key) && !item.isNull(key) ? item.getString(key) : "없음";
        } catch (JSONException e) {
            // JSONException이 발생하면 "없음" 반환
            return "없음";
        }
    }
    @GetMapping("/data6")
    public String data6(Model model) {
        try {
            // JSON 데이터를 가져올 URL
            URL url = new URL("https://www.safetydata.go.kr/openApi/%EC%82%B0%EB%A6%BC%EC%B2%AD_%EC%82%B0%EC%82%AC%ED%83%9C_%EC%98%88%EB%B3%B4%EC%A0%95%EB%B3%B4?serviceKey=45O0ISO0U010306L&returnType=json&pageNum=1&numRowsPerPage=10");

            // HTTP 연결 설정
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("GET");

            // 응답 읽기
            BufferedReader reader = new BufferedReader(new InputStreamReader(con.getInputStream()));
            StringBuilder response = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                response.append(line);
            }
            reader.close();

            // JSON 파싱
            JSONObject jsonObject = new JSONObject(response.toString());
            int totalCount = 0;

            if (jsonObject.has("responseData")) {
                JSONObject responseData = jsonObject.getJSONObject("responseData");

                if (responseData.has("totalCount")) {
                    totalCount = responseData.getInt("totalCount");
                }

                JSONArray data = responseData.getJSONArray("data");

                List<Map<String, String>> dataList = new ArrayList<>();

                // 데이터 출력
                for (int i = 0; i < data.length(); i++) {
                    JSONObject item = data.getJSONObject(i);

                    Map<String, String> dataMap = new HashMap<>();
                    dataMap.put("OCRN_FRCST_ISSU_INSTT_NM", getStringOrNull(item, "OCRN_FRCST_ISSU_INSTT_NM"));
                    dataMap.put("FRST_FRCST_ISSU_DT", getStringOrNull(item, "FRST_FRCST_ISSU_DT"));
                    dataMap.put("FRCST_ISSU_KIND_CD", getStringOrNull(item, "FRCST_ISSU_KIND_CD"));
                    dataMap.put("FRCST_ISSU_KIND_NM", getStringOrNull(item, "FRCST_ISSU_KIND_NM"));
                    dataMap.put("FRCST_ISSU_STTS", getStringOrNull(item, "FRCST_ISSU_STTS"));
                    dataMap.put("PRCTN_INFO_ANLSS_DT", getStringOrNull(item, "PRCTN_INFO_ANLSS_DT"));
                    dataMap.put("LAST_FRCST_RMV_DT", getStringOrNull(item, "LAST_FRCST_RMV_DT"));
                    dataMap.put("RNO", getStringOrNull(item, "RNO"));

                    dataList.add(dataMap);
                }


                // 모델에 데이터 리스트 추가
                model.addAttribute("dataList", dataList);
            } else {
                // responseData가 없는 경우에 대한 처리를 추가할 수 있습니다.
                // 예를 들어, 에러 메시지를 모델에 추가하거나 다른 처리를 할 수 있습니다.
                model.addAttribute("error", "No responseData found in the JSON.");
            }

            // totalCount 값을 모델에 추가
            model.addAttribute("totalCount", totalCount);

            // 연결 종료
            con.disconnect();
        } catch (Exception e) {
            e.printStackTrace();
        }

        // 렌더링할 뷰의 이름 반환
        return "/data/data6";
    }


 // 널 또는 누락된 값 처리를 위한 도우미 메서드
 private String getStringOrNull(JSONObject jsonObject, String key) {
     return jsonObject.has(key) ? jsonObject.getString(key) : null;
 }

 @GetMapping("/data7")
 public String data7(Model model) {
     try {
         // JSON 데이터를 가져올 URL
         URL url = new URL("https://apis.data.go.kr/B552584/ArpltnStatsSvc/getCtprvnMesureLIst?serviceKey=d8fHYrIFHEOMpYMh0Gv5butlqRpXqQKO3olZsCfxk1WlizFI%2Fndgt%2FAb1nARrYInaCKov50Fx2EjywdA43MPOA%3D%3D&returnType=json&numOfRows=1&pageNo=1&itemCode=PM10&dataGubun=HOUR&searchCondition=MONTH");

         // HTTP 연결 설정
         HttpURLConnection con = (HttpURLConnection) url.openConnection();
         con.setRequestMethod("GET");

         // 응답 읽기
         BufferedReader reader = new BufferedReader(new InputStreamReader(con.getInputStream()));
         StringBuilder response = new StringBuilder();
         String line;
         while ((line = reader.readLine()) != null) {
             response.append(line);
         }
         reader.close();

         // JSON 파싱
         JSONObject jsonObject = new JSONObject(response.toString());

         // "response" 키 찾기
         JSONObject responseBody = jsonObject.optJSONObject("response");

         // 데이터가 없는 경우 예외 처리
         if (responseBody == null || responseBody.isNull("body") || responseBody.getJSONObject("body").isNull("items")) {
             // 데이터가 없을 때의 처리 (예: 모델에 빈 리스트 추가)
             model.addAttribute("dataList", new ArrayList<>());
             return "/data/data7"; // 렌더링할 뷰의 이름 반환
         }

         JSONArray items = responseBody.getJSONObject("body").getJSONArray("items");

         List<Map<String, String>> dataList = new ArrayList<>();

         // 데이터 출력
         for (int i = 0; i < items.length(); i++) {
             JSONObject item = items.getJSONObject(i);

             Map<String, String> dataMap = new HashMap<>();
             // 데이터 항목 코드가 있는 경우에만 추가
             if (!item.isNull("데이터항목코드")) {
                 dataMap.put("데이터항목코드", item.getString("데이터항목코드"));
             }
             // 각 지역의 미세먼지 등급 계산하여 추가
             dataMap.put("대구", calculateDustLevel(item.getInt("daegu")));
             dataMap.put("충청남도", calculateDustLevel(item.getInt("chungnam")));
             dataMap.put("인천", calculateDustLevel(item.getInt("incheon")));
             dataMap.put("대전", calculateDustLevel(item.getInt("daejeon")));
             dataMap.put("경상북도", calculateDustLevel(item.getInt("gyeongbuk")));
             dataMap.put("세종", calculateDustLevel(item.getInt("sejong")));
             dataMap.put("광주", calculateDustLevel(item.getInt("gwangju")));
             dataMap.put("전라북도", calculateDustLevel(item.getInt("jeonbuk")));
             dataMap.put("강원도", calculateDustLevel(item.getInt("gangwon")));
             dataMap.put("울산", calculateDustLevel(item.getInt("ulsan")));
             dataMap.put("전라남도", calculateDustLevel(item.getInt("jeonnam")));
             dataMap.put("서울", calculateDustLevel(item.getInt("seoul")));
             dataMap.put("부산", calculateDustLevel(item.getInt("busan")));
             dataMap.put("제주", calculateDustLevel(item.getInt("jeju")));
             dataMap.put("충청북도", calculateDustLevel(item.getInt("chungbuk")));
             dataMap.put("경상남도", calculateDustLevel(item.getInt("gyeongnam")));
             dataMap.put("데이터 시간", item.getString("dataTime"));
             dataMap.put("데이터 구분", item.getString("dataGubun"));
             dataMap.put("경기도", calculateDustLevel(item.getInt("gyeonggi")));
             // ...

             dataList.add(dataMap);
         }

         // 모델에 데이터 리스트 추가
         model.addAttribute("dataList", dataList);

         // 연결 종료
         con.disconnect();
     } catch (Exception e) {
         e.printStackTrace();
         // 예외 발생 시의 처리 (예: 모델에 빈 리스트 추가)
         model.addAttribute("dataList", new ArrayList<>());
     }

     // 렌더링할 뷰의 이름 반환
     return "/data/data7";
 }

 // 미세먼지 등급을 계산하는 메서드
 private String calculateDustLevel(int dustValue) {
     if (dustValue <= 30) {
         return "좋음";
     } else if (dustValue <= 80) {
         return "보통";
     } else if (dustValue <= 150) {
         return "나쁨";
     } else {
         return "매우나쁨";
     }
 }
 @GetMapping("/data8")
 public String getData8() {
	 return "/data/data8";
 }
}
  