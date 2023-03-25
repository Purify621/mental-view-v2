import { login } from "@/api/user";
import { getToken, setToken, removeToken } from "@/utils/auth"; // 设置cookie

// 定义默认 state
const getDefaultState = () => {
  return {
    token: getToken(),
    // 四个基本信息
    name: "",
    avatar: "",
    school: "",
    id: "",
  };
};

// 定义state
const state = getDefaultState();
// 定义mutations
const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState());
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  SET_SCHOOL: (state, school) => {
    state.school = school;
  },
  SET_ID: (state, id) => {
    state.id = id;
  },
};

const actions = {
  // 注该登录的字段仅针对于学生
  // userInfo 是传递进来要登录的用户名和密码
  login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      login(userInfo)
        .then((res) => {
          const data = res.data;
          // 存储用户姓名
          commit("SET_NAME", data.user.name);
          // 存储用户头像
          commit("SET_AVATAR", data.user.avatar);
          // 存储用户学校
          commit("SET_SCHOOL", data.user.school);
          // 存储用户id
          commit("SET_ID", data.user.sid);
          // 设置token
          setToken(data.token);
          resolve("登录成功");
        })
        .catch(() => {
          reject("用户名或密码错误");
        });
    });
  },
  // 登出
  logout({ commit }) {
    return new Promise(() => {
      removeToken(); // 删除令牌
      commit("RESET_STATE");
    });
  },
  // 删除 token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      removeToken(); // 必须先删除令牌
      commit("RESET_STATE");
      resolve();
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
