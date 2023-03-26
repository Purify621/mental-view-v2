import request from "@/utils/request";

/**
 * 获取所有数据信息
 * @returns
 */
export function getPopularscienceAll() {
  return request({
    url: "/article/all",
    method: "get",
  });
}
/**
 * 根据id获取科普详细信息
 * @param {} id
 * @returns
 */
export function getPopularscienceId(id) {
  return request({
    url: `/article/${id}`,
    method: "get",
  });
}
