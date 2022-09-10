function insertrialcamma( n ) {
    var m = "";
    for ( var i = 0; i < n.length; i++ ) {
        var c = n.substr( n.length - i - 1, 1 );
        if ( i % 3 == 0 & i > 0 ) {
            m = c + ',' + m;
        } else {
            m = c + m;
        }
    }
    return m;
}
function toFarsiNumber( n ) {
    var o = "";
    n = n.toString();
    const farsiDigits = [ '۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹' ];
    const englishDigits = [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9' ];
    for ( var i = 0; i < n.length; i++ ) {
        for ( var j = 0; j < englishDigits.length; j++ ) {
            if ( n.substr( i, 1 ) == englishDigits[ j ] ) {
                o = o + farsiDigits[ j ];
            }
        }
    }
    return o;
}
export const toPersianPrice = num =>  insertrialcamma(toFarsiNumber(num))
