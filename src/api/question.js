import request from "@/utils/request";

/**
 * 获取所有题库
 * @param {}
 * @returns
 */
export function getQuesionBankAll() {
  return request({
    url: "/questionBank/all",
    method: "get",
    params: { status: 0 },
  });
}

/**
 * 根据id获取试题信息
 * @param {} id
 * @returns
 */
export function getByIdQuestionInfo(id) {
  return request({
    url: "/questionBank/info",
    method: "get",
    params: { id: id },
  });
}
/**
 * 根据id获取所有试题
 * @param {} id
 * @returns
 */
export function getByIdQuestionAll(id) {
  return request({
    url: "/question/all",
    method: "get",
    params: { bankId: id },
  });
}
