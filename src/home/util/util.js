export function toNumber(val) {
    if(val){
        val = val + '';
        val = val.replaceAll(',', ''); // 잠시 콤마를 때주고
        val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); 
    }
    
    return val;
}


Date.prototype.hhmm = function() {
    var hh = this.getHours();
    var mm = this.getMinutes();
  
    return [
            (hh>9 ? '' : '0') + hh,":",
            (mm>9 ? '' : '0') + mm
           ].join('');
};

Date.prototype.hhmmss = function() {
    var hh = this.getHours();
    var mm = this.getMinutes();
    var ss = this.getSeconds();
  
    return [
            (hh>9 ? '' : '0') + hh,":",
            (mm>9 ? '' : '0') + mm,":",
            (ss>9 ? '' : '0') + ss
           ].join('');
};

Date.prototype.yyyymmdd = function() {
    var MM = this.getMonth() + 1;
    var dd = this.getDate();
  
    return [this.getFullYear(),
            (MM>9 ? '' : '0') + MM,
            (dd>9 ? '' : '0') + dd,
           ].join('');
};


Date.prototype.yyyymmddhhmmss = function() {
    var MM = this.getMonth() + 1;
    var dd = this.getDate();
    var hh = this.getHours();
    var mm = this.getMinutes();
    var ss = this.getSeconds();
  
    return [this.getFullYear(),
            (MM>9 ? '' : '0') + MM,
            (dd>9 ? '' : '0') + dd,
            (hh>9 ? '' : '0') + hh,
            (mm>9 ? '' : '0') + mm,
            (ss>9 ? '' : '0') + ss
           ].join('');
  };