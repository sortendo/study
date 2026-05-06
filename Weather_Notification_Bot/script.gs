const AREA_CODE = "130000" // 参照: http://www.jma.go.jp/bosai/common/const/area.json
const URL = `https://www.jma.go.jp/bosai/forecast/data/forecast/${AREA_CODE}.json`
const SUMMARY = 0
const TODAY = 0
const TOMORROW = 1
const AREA = 0 // 東京の場合
const LIST = ['雨', '雪', '雷'] //嫌な天気

/**
* Dateオブジェクトを受け取って『yyyymmdd』形式で返す
*/
const dateText = (date) => {
 return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
}

/**
* 気象庁APIを叩き、翌日雨が降りそうな予報ならばLINE通知用のテキストを作成する
*/
const createText = () => {
  //気象庁API
  const info = JSON.parse(UrlFetchApp.fetch(URL).getContentText())[0]

  //翌日の天気と日付を取得
  const weatherText = info.timeSeries[SUMMARY].areas[AREA].weathers[TOMORROW]
  const tomorrowDate = dateText(new Date(info.timeSeries[SUMMARY].timeDefines[TOMORROW]))
  // console.log('気象庁APIから取得した明日の日付：' + tomorrowDate)
  // console.log('気象庁APIから取得した明日の天気：' + weatherText)

  //天気を判定してテキスト作成
  if(weatherText.indexOf(LIST[0])!=-1||weatherText.indexOf(LIST[1])!=-1||weatherText.indexOf(LIST[2])!=-1){
    //通知用のテキスト
    const text = `危しい天候を確認！
◇明日(${tomorrowDate})
    天気：${weatherText}
天気予報をチェック！！`

    return text
  }
  return
}

/**
* LINEに通知を送る
*/
const sendInfoToLine = () => {
 const ACCESS_TOKEN = PropertiesService.getScriptProperties().getProperty('ACCESS_TOKEN')
 const text = createText()
 if (!text) return

 const options = {
   "method" : "post",
   "headers" : {
      "Content-Type": "application/json",
      "Authorization" : "Bearer " + ACCESS_TOKEN
   },
  //  "payload" : {
  //    "message" : text
  //  }
   "payload" : JSON.stringify({
      messages: [
        {
            type: "text",
            text: text
        },
      ]
    })
 }
 UrlFetchApp.fetch("https://api.line.me/v2/bot/message/broadcast", options)
}

/**
* トークン等の秘匿情報をGASに認識させる（関数実行で完了）
*/
const setScriptProperty = () => {
 PropertiesService.getScriptProperties().setProperty('ACCESS_TOKEN', '<アクセストークンを追記>')
}