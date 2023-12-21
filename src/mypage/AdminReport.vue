<template>
<div id="app">
     <link href="AdminReport.css" rel="stylesheet">
        <div class="report-section">
            <div class="menu-container">
            <div class="management-box ">
              <h3>회원관리</h3>
              <!-- 추가할 회원관리 내용 -->
            </div>
            <div class="management-box ">
              <h3>거래관리</h3>
              <!-- 추가할 거래관리 내용 -->
            </div>
            <div class="management-box ">
              <h3>신고관리</h3>
              <!-- 추가할 신고관리 내용 -->
            </div>
          </div>
          <div id="scroll">
            <h2>신고 관리</h2>
            <table class="report-table">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>신고제목</th>
                        <th>신고자</th>
                        <th>피신고자</th>
                        <th>진행사항</th>
                        <th>신고날짜</th>
                        <th>보기</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(report, index) in reports" :key="index">
                        <td>{{ index + 1 }}</td>
                        <td>{{ report.title }}</td>
                        <td>{{ report.reporter }}</td>
                        <td>{{ report.reported }}</td>
                        <td>{{ report.status }}</td>
                        <td>{{ report.date }}</td>
                        <td><button class="view-button" @click="viewReport(index)">보기</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
      <script>
import { Router } from 'express';
import { component } from 'vue/types/umd';
        export default{
            data() {
            return {
                    
                        title: '(구매자신고) 마음에 안듬',
                        reporter: 'B씨',
                        reported: 'A씨',
                        status: '처리중',
                        date: '2023-01-01'
                    }
                   },
                methods: {
                  viewReport: function (index) {
                    // 각 신고에 대한 상세 정보 보기 로직을 추가할 수 있습니다.
                    console.log('View report:', this.reports[index]);
               
                

                }
            }
        }
    </script>
