/**
 * 展览管理模块
 */
const exhibition = {
  state: () => ({
    // 是否为编辑状态
    isEdit: false,
  }),
  mutations: {
    setIsEdit(state, payload) {
      state.isEdit = payload.isEdit;
    },
  },
};

export default exhibition;
