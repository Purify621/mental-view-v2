import request from "@/utils/request";

/**
 * 添加结果
 * @param {} data
 * @returns
 */
export function addUserResult(data) {
  return request({
    url: "/result/save",
    method: "post",
    data,
  });
}
/**
 * 根据问题id和用户id查询到当前用户做过的所有试题
 * @param {} data { questionId: , userId: }
 * @returns
 */
export function getQid(data) {
  return request({
    url: "/result/qid",
    method: "post",
    data,
  });
}

/**
 * 分页查询所有结果
 * @param {} queryList
 * @returns
 */
export function getAll(queryList) {
  return request({
    url: "/result/get",
    method: "get",
    params: queryList,
  });
}
