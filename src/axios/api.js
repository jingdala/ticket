import axios from "./request.js";
import QS from "qs";
import { getToken } from "@/utils";

axios.defaults.baseURL = "/api";

/**
 * 系统模块
 */
// 登录接口
export const userlogin = (params) => {
  return axios.post("/SystemManager/GetUserToken?" + QS.stringify(params));
};

/**
 * 展览模块
 */
// 获取票类型
export const GetTickeTypeData = (params = {}) => {
  let tokens = getToken();
  let paramsObj = { ...params, ...tokens };
  return axios.get(
    "/ExhibitionManagement/GetTickeTypeData?" + QS.stringify(paramsObj)
  );
};
// 新增展览类型
export const InsertTemporaryExhibitionTypeData = (params = {}) => {
  let tokens = getToken();
  let paramsObj = { ...params, ...tokens };
  return axios.get(
    "/ExhibitionManagement/InsertTemporaryExhibitionTypeData?" +
      QS.stringify(paramsObj)
  );
};
// 编辑展览类型
export const UpdateTemporaryExhibitionTypeData = (params = {}) => {
  let tokens = getToken();
  let paramsObj = { ...params, ...tokens };
  return axios.get(
    "/ExhibitionManagement/UpdateTemporaryExhibitionTypeData?" +
      QS.stringify(paramsObj)
  );
};
// 获取展览类型数据
export const GetTemporaryExhibitionTypeData = (params = {}) => {
  let tokens = getToken();
  let paramsObj = { ...params, ...tokens };
  return axios.get(
    "/ExhibitionManagement/GetTemporaryExhibitionTypeData?" +
      QS.stringify(paramsObj)
  );
};
