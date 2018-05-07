var day = new Date();

var dd = day.getDate();

var mm = day.getMonth() + 1;

var yyyy = day.getFullYear();

var hour = day.getHours();

var minute = day.getMinutes();

if (dd < 10) {
  dd = '0' + dd;
}

if (mm < 10) {
  mm = '0' + mm;
}

if (minute < 10) {
  minute = '0' + minute;
}

if (hour < 10) {
  hour = '0' + hour;
}

var get_today = dd + '-' + mm + '-' + yyyy;

var get_time = hour + ':' + minute;

function get_color() {
  var letters = '0123456789ABCDEF';

  var color = '#';

  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
}

function formatTime(s) {

  s = Math.floor(s);

  m = Math.floor(s / 60);

  m = m >= 10 ? m : '0' + m;

  s = Math.floor(s % 60);

  s = s >= 10 ? s : '0' + s;

  return m + ':' + s;

}

function ip() {
  var uri = 'https://api.ipify.org?format=json';

  var request = $$.ajax({
    async: false,
    crossDomain: true,
    method: "GET",
    url: uri,
    success: function(data) {
      return data;
    }
  });

  var response = JSON.parse(request.responseText);

  return response;
}

function sort(objArray, prop, direction) {
  if (arguments.length < 2) throw new Error("ARRAY, AND OBJECT PROPERTY MINIMUM ARGUMENTS, OPTIONAL DIRECTION");

  if (!Array.isArray(objArray)) throw new Error("FIRST ARGUMENT NOT AN ARRAY");

  const clone = objArray.slice(0);

  const direct = arguments.length > 2 ? arguments[2] : 1; //Default to ascending

  const propPath = (prop.constructor === Array) ? prop : prop.split(".");

  clone.sort(function(a, b) {
    for (let p in propPath) {
      if (a[propPath[p]] && b[propPath[p]]) {
        a = a[propPath[p]];
        b = b[propPath[p]];
      }
    }
    // convert numeric strings to integers
    a = a.match(/^\d+$/) ? +a : a;
    b = b.match(/^\d+$/) ? +b : b;
    return ((a < b) ? -1 * direct : ((a > b) ? 1 * direct : 0));
  });

  return clone;
}

function randomString(length, chars) {
  var result = '';
  for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

function notification_closetimeout(icon, title, titleRightText, subtitle, text, closeTimeout) {
  var notifi = app.notification.create({
    icon: icon,
    title: title,
    titleRightText: titleRightText,
    subtitle: subtitle,
    text: text,
    closeTimeout: closeTimeout,
  });

  notifi.open();
}