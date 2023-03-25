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
