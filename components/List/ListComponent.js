import { filterCategory } from "../../utils/filter/filterCategory.js";
import { qs, removeAllChildNodes } from "../../utils/utils.js";

import { makeFieldTab } from "./fieldTab.js";
import { makePressNews } from "./pressNews.js";
import { startProgress, stopProgress } from "./progress.js";
import {
  moveToNextPage,
  moveToPrevPage,
  setListButton,
} from "./setListButton.js";

const all_press = qs(".all_press");

export const ListComponent = (
  current_page,
  sorted_agencies,
  focus,
  current_category
) => {
  // 초기화
  const press = qs(".press-news");
  const field = qs(".field-tab");
  const prev_btn = qs(".prev-page-btn");
  const next_btn = qs(".next-page-btn");

  if (press.childNodes.length > 0) {
    removeAllChildNodes(press);
  }
  if (field.childNodes.length > 0) {
    removeAllChildNodes(field);
  }

  if (prev_btn && next_btn) {
    prev_btn.remove();
    next_btn.remove();
  }

  setListButton(sorted_agencies, current_page, current_category);

  if (Boolean(all_press.getAttribute("subscribetype"))) {
    // 해당 카테고리 언론사의 뉴스를 렌더하기 위해 필터링
    const filtered_agencies = filterCategory(sorted_agencies, focus);
    // 카테고리 FieldTab, 메인 및 서브 뉴스 생성
    makeFieldTab(current_page, sorted_agencies, focus);
    makePressNews(current_page, filtered_agencies);
    stopProgress();
    startProgress(sorted_agencies, current_page, current_category);
  } else {
    makeFieldTab(current_page, sorted_agencies, focus);
    makePressNews(current_page, sorted_agencies);
    stopProgress();
    startProgress(sorted_agencies, current_page, current_category);
  }

  prev_btn.addEventListener("click", () => {
    moveToPrevPage(sorted_agencies, current_page, current_category);
  });
  next_btn.addEventListener("click", () => {
    moveToNextPage(sorted_agencies, current_page, current_category);
  });
};
