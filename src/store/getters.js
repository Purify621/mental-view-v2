// 建立快捷访问
const getters = {
  token: (state) => state.user.token,
  avatar: (state) => state.user.avatar,
  school: (state) => state.user.school,
  name: (state) => state.user.name,
  id: (state) => state.user.id,
  sid: (state) => state.user.sid,
};
export default getters;
