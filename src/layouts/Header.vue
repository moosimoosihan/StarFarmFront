<!-- TODO : 카테고리 네비 및 로그인 검색 버튼 -->
<template>
  <div class="header">
    <div class="logo">로고</div>
    <div class="white-box">
        <ul class="header_utilitymenu wrap_padding pc-ver">

<nav class="header_navbox ng-scope" data-ng-controller="headCtl">
        <div class="header_nav wrap_padding" data-ng-init="loadRecommandWord()">
            <div class="wrap-header_logo"><a href="/" class="header_logo"><span class="blind-text">logo</span></a></div>

            <ul class="header_gnbmenu pc-ver">
                <li><a href="#" class="main-title">Auctions</a></li>
                <li><a href="#" class="main-title">Private Sales</a></li>
                <li><a href="#" class="main-title">Sell</a></li>
                <li><a href="#" class="main-title on">Services</a></li>
            </ul>
            <section class="topsearch-box">
                <button class="m-top-search m-ver"></button>
                <button class="m-gnbmenu m-ver"></button>
                <form action="" class="scroll_none search-bg ng-pristine ng-valid right">
                    <fieldset class="topsearch">
                        <span class="submenuBg-closeBtn top-search-closeBtn closebtn-b m-ver"></span>
                        <button type="button" class="btn-toggle_search" ng-click="toggleSearchBox()"></button>
                        <section class="search-bubble-box">
                            <div class="wrap-search-inputs">
                                <input onkeyup="searchFilter()" placeholder="작가명 또는 작품명" type="text" class="topsearch-text" id="topsearchText" ng-keypress="$event.keyCode === 13 &amp;&amp; goSearch('topsearchText', $event);" autocomplete="off" autofocus="autofocus">
                                <button type="button" class="topsearch-btn" ng-click="goSearch('topsearchText', $event);"></button>
                            </div>

                            <div class="recent-search">
                            <span class="keyword-search-tit">최근 검색어</span><span class="recent-keyword recent-keyword-none">최근 검색내역 없음</span></div>
                            <div class="recommend-search-part">
                            <span class="keyword-search-tit">추천 검색어</span><span class="recommend-keyword"><a href="/sale/search?searchContent=이우환" class="text-over">이우환</a></span><span class="recommend-keyword"><a href="/sale/search?searchContent=하태임" class="text-over">하태임</a></span><span class="recommend-keyword"><a href="/sale/search?searchContent=김선우" class="text-over">김선우</a></span><span class="recommend-keyword"><a href="/sale/search?searchContent=야요이 쿠사마" class="text-over">야요이 쿠사마</a></span><span class="recommend-keyword"><a href="/sale/search?searchContent=에바 알머슨" class="text-over">에바 알머슨</a></span><span class="recommend-keyword"><a href="/sale/search?searchContent=아담 핸들러" class="text-over">아담 핸들러</a></span></div>
                        </section>
                    </fieldset>
                </form>
            </section>
        </div>
        <section class="gnb_submenuBg scroll_none" style="right: -100%;"></section>
        <section class="submenuBg scroll_none" style="height: auto; top: 61px; right: auto; background-color: rgb(242, 242, 242); display: block; padding-top: 0px; margin-top: 0px; padding-bottom: 0px; margin-bottom: 0px;">
            <div class="wrap">
                <span class="submenuBg-closeBtn closebtn closebtn-b m-ver"></span>
                <div class="flex_wrap submenuBg-box">

                    <div class="header_logo_empty onlypc-layout"></div>
                    <div class="wrap-center-items">
                        <div class="Ingbanner-box">
                        <a href="/auction/live/863" class="Ingbanner">
                            <div class="Ingbanner-txt text-over">
                                <span class="auctionKind-box Ingkind-auction on">LIVE</span>
                                  <p class="text-over" title="제176회  미술품  경매">제176회  미술품  경매</p>
                                <span class="Ingbanner-arrow"></span>
                            </div>
                        </a><a href="/auction/online/864" class="Ingbanner">
                            <div class="Ingbanner-txt text-over">
                                <span class="auctionKind-box Ingkind-auction ">ONLINE</span>
                                  <p class="text-over" title=" 프리미엄 온라인 12/20"> 프리미엄 온라인 12/20</p>
                                <span class="Ingbanner-arrow"></span>
                            </div>
                        </a></div>
                        <ul class="subGnbmenu">
                            <li class="subGnbmenu-tit"><span class="gnbmenu_arrow">Auctions<span class="arrow_icon"></span></span>
                                <ul class="submenu submenu-part01" style="display: block; margin-top: 0px;">
                                    <li id="menu_auction"><a href="/auction/progress">진행 경매</a><span class="currentIng">N</span></li>
                                    <li id="menu_upcoming"><a href="/auction/upcoming">예정 경매</a><span class="currentIng">N</span></li>
                                    <li><a href="/auction/results">경매 결과</a></li>
                                    <li><a href="/auction/info ">경매 안내</a></li>
                                </ul>
                            </li>
                            <li class="subGnbmenu-tit"><span class="gnbmenu_arrow">Private Sales<span class="arrow_icon"></span></span>
                                <ul class="submenu submenu-part02" style="display: block; margin-top: 0px;">
                                    <li id="menu_exhibit"><a href="/privatesale/exhibit">전시</a><span class="currentIng">N</span></li>
                                    <li id="menu_private"><a href="/privatesale/psList">프라이빗 세일</a><span class="currentIng">N</span></li>
                                    <li><a href="/privatesale/psGuide">프라이빗 세일 가이드</a></li>
                                </ul>
                            </li>
                            <li class="subGnbmenu-tit"><span class="gnbmenu_arrow">Sell<span class="arrow_icon"></span></span>
                                <ul class="submenu submenu-part03" style="display: block; margin-top: 0px;">
                                    <li><a href="/sell/consignment">위탁 안내</a></li>
                                    <li><a href="/mypage/inquiryForm?cate1=sell">위탁 신청</a></li>
                                </ul>
                            </li>
                            <li class="subGnbmenu-tit on"><span class="gnbmenu_arrow">Services<span class="arrow_icon"></span></span>
                                <ul class="submenu submenu-part04" style="display: block; margin-top: 0px;">
                                    <li id="menu_academy"><a href="/service/academy">아카데미</a><span class="currentIng">N</span></li>
                                    <li><a href="/service/loan">담보 대출</a></li>
                                    <li><a href="/service/storage">미술품 보관</a></li>
                                    <li><a href="/service/showroom">전시장 대관</a></li>
                                    <li><a href="/service/marketing">기업 아트마케팅</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <div class="topsearch-box_empty onlypc-layout"></div>
                </div>
                <ul class="mobile-utility m-ver">
                    <li id="mb_common_lang">
                            <a href="/?lang=en">ENG</a></li>
                    <li>
                         <!-- !login -->
                            <a href="/join" class="gnb_join">회원가입</a>
                    </li>
                    <li>
                         <a href="/login" class="gnb_login">로그인</a>
                        </li>
                </ul>
            </div>
        </section>
    </nav>
            <li class="utility-tab utility-lang" onclick="updateLayer('lang')"><a href="javascript:void(0);" class="">KOR</a>
                <ul class="bubble-box bubble-box01">
                    <li><a onclick="changeLang('/', '', 'en')">ENG(English)</a></li>
                    <li><a onclick="changeLang('/', '', 'ko')">KOR(한국어)</a></li>
                </ul>
            </li>
             <!-- !login -->
                <li class="utility-join"><a href="/join">회원가입</a></li>
                <li class="utility-login"><a href="/login">로그인</a></li>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Header'
}
</script>
<style scoped><section class="submenuBg scroll_none" style="height: 230px; top: 61px; right: auto; background-color: rgb(242, 242, 242); display: block; padding-top: 0px; margin-top: 0px; padding-bottom: 0px; margin-bottom: 0px;">
            <div class="wrap">
                <span class="submenuBg-closeBtn closebtn closebtn-b m-ver"></span>
                <div class="flex_wrap submenuBg-box">

                    <div class="header_logo_empty onlypc-layout"></div>
                    <div class="wrap-center-items">
                        <div class="Ingbanner-box">
                        <a href="/auction/live/863" class="Ingbanner">
                            <div class="Ingbanner-txt text-over">
                                <span class="auctionKind-box Ingkind-auction on">LIVE</span>
                                  <p class="text-over" title="제176회  미술품  경매">제176회  미술품  경매</p>
                                <span class="Ingbanner-arrow"></span>
                            </div>
                        </a><a href="/auction/online/864" class="Ingbanner">
                            <div class="Ingbanner-txt text-over">
                                <span class="auctionKind-box Ingkind-auction ">ONLINE</span>
                                  <p class="text-over" title=" 프리미엄 온라인 12/20"> 프리미엄 온라인 12/20</p>
                                <span class="Ingbanner-arrow"></span>
                            </div>
                        </a></div>
                        <ul class="subGnbmenu">
                            <li class="subGnbmenu-tit"><span class="gnbmenu_arrow">Auctions<span class="arrow_icon"></span></span>
                                <ul class="submenu submenu-part01" style="display: block; margin-top: 0px;">
                                    <li id="menu_auction"><a href="/auction/progress">진행 경매</a><span class="currentIng">N</span></li>
                                    <li id="menu_upcoming"><a href="/auction/upcoming">예정 경매</a><span class="currentIng">N</span></li>
                                    <li><a href="/auction/results">경매 결과</a></li>
                                    <li><a href="/auction/info ">경매 안내</a></li>
                                </ul>
                            </li>
                            <li class="subGnbmenu-tit"><span class="gnbmenu_arrow">Private Sales<span class="arrow_icon"></span></span>
                                <ul class="submenu submenu-part02" style="display: block; margin-top: 0px;">
                                    <li id="menu_exhibit"><a href="/privatesale/exhibit">전시</a><span class="currentIng">N</span></li>
                                    <li id="menu_private"><a href="/privatesale/psList">프라이빗 세일</a><span class="currentIng">N</span></li>
                                    <li><a href="/privatesale/psGuide">프라이빗 세일 가이드</a></li>
                                </ul>
                            </li>
                            <li class="subGnbmenu-tit"><span class="gnbmenu_arrow">Sell<span class="arrow_icon"></span></span>
                                <ul class="submenu submenu-part03" style="display: block; margin-top: 0px;">
                                    <li><a href="/sell/consignment">위탁 안내</a></li>
                                    <li><a href="/mypage/inquiryForm?cate1=sell">위탁 신청</a></li>
                                </ul>
                            </li>
                            <li class="subGnbmenu-tit on"><span class="gnbmenu_arrow">Services<span class="arrow_icon"></span></span>
                                <ul class="submenu submenu-part04" style="display: block; margin-top: 0px;">
                                    <li id="menu_academy"><a href="/service/academy">아카데미</a><span class="currentIng">N</span></li>
                                    <li><a href="/service/loan">담보 대출</a></li>
                                    <li><a href="/service/storage">미술품 보관</a></li>
                                    <li><a href="/service/showroom">전시장 대관</a></li>
                                    <li><a href="/service/marketing">기업 아트마케팅</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>


                    <div class="topsearch-box_empty onlypc-layout"></div>
                </div>
                <ul class="mobile-utility m-ver">
                    <li id="mb_common_lang">
                         <a href="/?lang=en">ENG</a></li>
                    <li>
                         <!-- !login -->
                            <a href="/join" class="gnb_join">회원가입</a>
                    </li>
                    <li>
                            <a href="/login" class="gnb_login">로그인</a>
                    </li>
                </ul>
            </div>
        </section>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #87CEEB; /* 헤더 배경색 설정 */
}

.logo {
  font-size: 24px;
  color: #FFFFFF; /* 로고 텍스트 색상 설정 */
}

.white-box {
  background-color: #FFFFFF;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  flex-grow: 1;
}
</style>