export function toNumber(val) {
    if(val){
        val = val + '';
        val = val.replaceAll(',', ''); // 잠시 콤마를 때주고
        val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); 
    }
    
    return val;
}