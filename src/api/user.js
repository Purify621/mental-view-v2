import request from "@/utils/request";

/**
 * 学生登录
 * @param {} data 学生登录的对象
 * @returns
 */
export function login(data) {
  return request({
    url: "/login/student",
    method: "post",
    data,
  });
}
/**
 * 修改学生信息 里面必须携带 sid 字段
 * @param {} data
 * @returns
 */
export function updateStudentInfo(data) {
  return request({
    url: "/student/update",
    method: "post",
    data,
  });
}
/**
 * 根据id获取学生信息
 * @param {} id
 * @returns
 */
export function getByIdInfo(id) {
  return request({
    url: `/student/${id}`,
    method: "get",
  });
}
