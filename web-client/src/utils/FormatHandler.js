
class FormatHandler {
  static formatDate(date) {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();

    return this.twoDigits(day) + '/' + this.twoDigits(month) + '/' + year +
      ' ' + this.twoDigits(hours) + ':' + this.twoDigits(minutes);
  }

  static twoDigits(n) {
    if (n / 10 < 1) {
      return '0' + n;
    }
    return n;
  }
};

export default FormatHandler;