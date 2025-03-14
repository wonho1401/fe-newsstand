import { GridComponent } from "../components/Grid/GridComponent.js";
import { setGridButton } from "../components/Grid/setGridButton.js";
import { filterSubscribePress } from "./filter/filterSubscription.js";
import { getAllAgencies } from "./setAgencies.js";
import { sortPages } from "./sort/sortPage.js";
import { removeButton } from "../components/Button/removeButton.js";
import { INITIAL_PAGE } from "../constants/constant.js";
import { stopProgress } from "../components/List/progress.js";
import { qs } from "./utils.js";

const grid_btn = qs(".grid-view-btn");
const list_btn = qs(".list-view-btn");

const subscribe_press = qs(".subscribe_press");

// Grid 뷰 선택 시
export const setGrid = () => {
  let agencies = getAllAgencies();
  // Fetch를 통해 받은 언론사에 대한 모든 정보를 deep copy

  // list 뷰 관련 삭제 및 grid 버튼, grid 컴포넌트 추가
  if (grid_btn.getAttribute("viewtype") === null) {
    grid_btn.setAttribute("viewtype", true);
    list_btn.removeAttribute("viewtype");
  }
  removeButton();

  const $grid = qs(".agency-grid");
  const $list = qs(".agency-list");
  $grid.style.display = "grid";
  $list.style.display = "none";
  stopProgress();

  // 전체 언론사 보기인지 내가 구독한 언론사 보기인지 체크
  const isSubscribedMode = Boolean(
    subscribe_press.getAttribute("subscribetype")
  );

  agencies = isSubscribedMode ? filterSubscribePress(agencies) : agencies;

  const pages = sortPages(agencies);

  setGridButton(pages);

  GridComponent(INITIAL_PAGE, pages);
};
