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
// 获取系统角色
export const GetSystemRoleData = () => {
  let tokens = getToken();
  let paramsObj = { ...tokens };
  return axios.get(
    "/SystemManager/GetSystemRoleData?" + QS.stringify(paramsObj)
  );
};
// 编辑系统角色
export const EditSystemRoleData = (params) => {
  let tokens = getToken();
  let paramsObj = { ...params };
  return axios.post(
    "/SystemManager/EditSystemRoleData?" + QS.stringify(tokens),
    paramsObj
  );
};
// 新增系统角色
export const InsertSystemRoleData = (params) => {
  let tokens = getToken();
  let paramsObj = { ...params };
  return axios.post(
    "/SystemManager/InsertSystemRoleData?" + QS.stringify(tokens),
    paramsObj
  );
};
// 获取用户操作系统权限
export const GetLoginUserRoleAuthority = (params) => {
  let tokens = getToken();
  let paramsObj = { ...tokens, ...params };
  return axios.get(
    "/SystemManager/GetLoginUserRoleAuthority?" + QS.stringify(paramsObj)
  );
};
// 获取系统权限配置数据
export const GetSystemAuthorityData = () => {
  let tokens = getToken();
  let paramsObj = { ...tokens };
  return axios.get(
    "/SystemManager/GetSystemAuthorityData?" + QS.stringify(paramsObj)
  );
};
// 新增角色权限
export const InsertRolePermissionAssociation = (params) => {
  let tokens = getToken();
  let paramsObj = params;
  return axios.post(
    "/SystemManager/InsertRolePermissionAssociation?" + QS.stringify(tokens),
    paramsObj
  );
};

/**
 * 展览模块
 */
// 获取票类支持
export const GetTickeTypeData = (params = {}) => {
  let tokens = getToken();
  let paramsObj = { ...params, ...tokens };
  return axios.get(
    "/ExhibitionManagement/GetTickeTypeData?" + QS.stringify(paramsObj)
  );
};
// 新增票类支持
export const InsertTicketInformationTable = (params) => {
  let tokens = getToken();
  let paramsObj = { ...params };
  return axios.post(
    "/ExhibitionManagement/InsertTicketInformationTable?" +
      QS.stringify(tokens),
    paramsObj
  );
};
// 编辑票类支持
export const EditTicketInformationTable = (params) => {
  let tokens = getToken();
  let paramsObj = { ...params };
  return axios.post(
    "/ExhibitionManagement/EditTicketInformationTable?" + QS.stringify(tokens),
    paramsObj
  );
};
// 删除票类支持
export const DeleteTicketInformationTable = (params) => {
  let tokens = getToken();
  let paramsObj = { ...params, ...tokens };
  return axios.post(
    "/ExhibitionManagement/DeleteTicketInformationTable?" +
      QS.stringify(paramsObj)
  );
};
// 新增展览类型
export const InsertTemporaryExhibitionTypeData = (params = {}) => {
  let tokens = getToken();
  let paramsObj = { ...params };
  return axios.post(
    "/ExhibitionManagement/InsertTemporaryExhibitionTypeData?" +
      QS.stringify(tokens),
    paramsObj
  );
};
// 编辑展览类型
export const UpdateTemporaryExhibitionTypeData = (params = {}) => {
  let tokens = getToken();
  let paramsObj = { ...params };
  return axios.post(
    "/ExhibitionManagement/UpdateTemporaryExhibitionTypeData?" +
      QS.stringify(tokens),
    paramsObj
  );
};
// 获取展览类型列表
export const GetTemporaryExhibitionTypeData = (params = {}) => {
  let tokens = getToken();
  let paramsObj = { ...params, ...tokens };
  return axios.get(
    "/ExhibitionManagement/GetTemporaryExhibitionTypeData?" +
      QS.stringify(paramsObj)
  );
};
// 获取临时展览列表
export const GetTemporaryExhibitionData = (params = {}) => {
  let tokens = getToken();
  let paramsObj = { ...params, ...tokens };
  return axios.get(
    "/ExhibitionManagement/GetTemporaryExhibitionData?" +
      QS.stringify(paramsObj)
  );
};
// 新增临时展览
export const AddTemporaryExhibitionData = (params = {}) => {
  let tokens = getToken();
  let paramsObj = { ...params };
  return axios.post(
    "/ExhibitionManagement/AddTemporaryExhibitionData?" + QS.stringify(tokens),
    paramsObj
  );
};
