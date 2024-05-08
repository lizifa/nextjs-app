import axios from "axios"
const URL_STR = 'https://open.feishu.cn/open-apis/bot/v2/hook/47b09452-5055-44ff-8276-332b1d3f2fe6'

export function sendMsgToFS(args = {}) {
  const data = {
    "msg_type": "post",
    "content": {
      "post": {
        "zh_cn": {
          title: '支付小助手',
          "content": [
            [
              {
                "tag": "text",
                "text": `${JSON.stringify(args)}`
              },
            ],
          ]
        }
      }
    }
  }
  axios({ url: URL_STR, data, method: 'POST', })
}