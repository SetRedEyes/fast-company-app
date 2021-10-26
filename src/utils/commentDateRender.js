export function commentDateRender(timeStamp) {
  function pad(n) {
    return n < 10 ? "0" + n : n
  }

  const month = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "", "Oct", "Nov", "Dec"]

  const commentDate = new Date(Number(timeStamp))
  const now = new Date()

  const microSecondsDiff = now - timeStamp
  const minutesDiff = Math.round(microSecondsDiff / (1000 * 60))
  const monthDiff = Math.round(microSecondsDiff / (1000 * 60 * 60 * 24 * 31))

  let message
  switch (true) {
    case minutesDiff <= 1:
      message = "1 минуту назад"
      break

    case minutesDiff <= 5:
      message = "5 минут назад"
      break

    case minutesDiff <= 10:
      message = "10 минут назад"
      break

    case minutesDiff <= 30:
      message = "30 минут назад"
      break

    case minutesDiff <= 60:
      message = `${pad(commentDate.getHours())}:${pad(commentDate.getMinutes())}`
      break

    case monthDiff <= 11:
      message = `${commentDate.getDate()} ${month[commentDate.getMonth()]}`
      break

    case monthDiff >= 12:
      message = `${commentDate.getDate()} ${month[commentDate.getMonth()]}
      ${commentDate.getFullYear()}`
      break

    default:
      break
  }
  return message
}
