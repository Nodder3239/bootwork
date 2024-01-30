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
import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
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
            URL url = new URL("https://www.safetydata.go.kr//openApi/%EC%82%B0%EB%A6%BC%EC%B2%AD_%EA%B8%B0%EA%B4%80%EC%9A%A9_%EA%B8%88%EC%9D%BC%EC%82%B0%EB%B6%88%EB%B0%9C%EC%83%9D%ED%98%84%ED%99%A9?serviceKey=99B550AQ7I5U4H06&returnType=json&pageNum=1&numRowsPerPage=10");

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
                System.out.println("산불 정보 ID: " + item.getString("FRFR_INFO_ID"));
                System.out.println("산불 신고 주소: " + item.getString("FRFR_STTMN_ADDR"));
                System.out.println("최종 수정 일시: " + item.getString("LAST_UPDT_DTM"));
                // 필요한 다른 필드도 동일한 방법으로 출력 가능
                System.out.println();

                Map<String, String> dataMap = new HashMap<>();
                dataMap.put("FRFR_INFO_ID", item.getString("FRFR_INFO_ID"));
                dataMap.put("FRFR_STTMN_LCTN_XCRD", item.getString("FRFR_STTMN_LCTN_XCRD"));
                dataMap.put("FRFR_STTMN_LCTN_YCRD", item.getString("FRFR_STTMN_LCTN_YCRD"));
                dataMap.put("FRFR_STTMN_DT", item.getString("FRFR_STTMN_DT"));
                dataMap.put("FRFR_STTMN_HMS", item.getString("FRFR_STTMN_HMS"));
                dataMap.put("FRFR_STTMN_ADDR", item.getString("FRFR_STTMN_ADDR"));
                dataMap.put("FRFR_OCCRR_TPCD", item.getString("FRFR_OCCRR_TPCD"));
                dataMap.put("FRFR_PRGRS_STCD", item.getString("FRFR_PRGRS_STCD"));
                dataMap.put("FRFR_FRNG_DTM", item.getString("FRFR_FRNG_DTM"));
                dataMap.put("FRFR_OCCRR_ADDR", item.getString("FRFR_OCCRR_ADDR"));
                dataMap.put("FRFR_LCTN_YCRD", item.getString("FRFR_LCTN_YCRD"));
                dataMap.put("FRFR_LCTN_XCRD", item.getString("FRFR_LCTN_XCRD"));
                dataMap.put("FRST_RGSTN_DTM", item.getString("FRST_RGSTN_DTM"));
                dataMap.put("LAST_UPDT_DTM", item.getString("LAST_UPDT_DTM"));
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
        return "/data/data2";
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
}