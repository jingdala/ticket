/**
 * 展览管理模块
 */
const exhibition = {
  state: () => ({
    // 是否为编辑状态
    isEdit: false,
    // 临时展览数据详情
    temporaryDetail: null,
  }),
  mutations: {
    setIsEdit(state, payload) {
      state.isEdit = payload.isEdit;
    },
    setTemporaryDetail(state, payload) {
      state.temporaryDetail = payload.temporaryDetail;
    },
  },
};

export default exhibition;
