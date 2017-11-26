

var geoipMultiLookup = new Vue({
  el: '#ip-address-multi',
  data: {
    ipAddressesString: '',
    ipAddresses: [],
    ipRecords: []
  },
  methods: {
    geoipMultiLookup: function(){
      this.ipRecords = [];
      this.ipAddresses = this.ipAddressesString.split("\n");

      for (var i in this.ipAddresses) {
        var ip = this.ipAddresses[i];
        getIpAttributes(ip, this.ipRecords);
      }

    }
  }
});

function getIpAttributes(ip, ipRecords){

  console.log(ip);
  axios.get('http://localhost:8080/ip-lookup?ip=' + ip).then(response => {
    ipRecords.push(response.data);
  });

};

window.onload = function() {
  var visits = 0;

  var visitsCookie = getCookieValue('visits');
  if (visitsCookie) {
    var converted = parseInt(visitsCookie);
    if (!isNaN(converted)) {
      visits = converted;
    }
  }

  setCookieValue('visits', (visits+1));
};

function getCookieValue(id) {
  var name = id + '=';
  var decodedCookie = decodeURIComponent(document.cookie);

  var kvps = decodedCookie.split(';');
  for(var i = 0; i <kvps.length; i++) {
    var v = kvps[i];
    while (v.charAt(0) == ' ') {
      v = v.substring(1);
    }

    if (v.indexOf(id) == 0) {
      var result = v.substring((id.length+1), v.length);
      return result;
    }
  }
  return '';
}

function setCookieValue(id, v) {
  var d = new Date();
  d.setTime(d.getTime() + (365*24*60*60*1000));

  var expires = 'expires=' +  d.toUTCString();
  var cookieValue = id + "=" + v + ";" + expires + ";path=/";
  console.log('cookieValue: ' + cookieValue);
  document.cookie = cookieValue;
}
