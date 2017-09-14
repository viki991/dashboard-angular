(function () {
    'use strict';

    angular.module('BlurAdmin.theme')
        .service('currencyModifiers', currencyModifiers)
        .filter('currencyModifiersFilter', currencyModifiersFilter)
        .filter('preciseRound',preciseRound);

    /** @ngInject */
    function currencyModifiers(Big) {

        return {
            convertToCents: function (amount,divisibility) {
                var x = new Big(amount);
                var z = new Big(10);
                z = z.pow(divisibility);
                z = z.toFixed(0);
                var m = x.times(z);
                return  m.toFixed(0);
            },
            convertFromCents: function (amount,divisibility) {
                var j = new Big(amount);
                var l = new Big(10);
                l = l.pow(divisibility);
                l = l.toFixed(0);
                var n = j.div(l);
                return n.toFixed(divisibility);
            },
            validateCurrency: function (amount,divisibility) {
                var amountInArray = amount.toString().split('.');
                var afterDecimalValue = amountInArray[1];
                if(afterDecimalValue == undefined){
                    return true;
                }
                return afterDecimalValue.length > divisibility ? false : true;
            }
        }
    }

    function currencyModifiersFilter(){
        return function (amount,divisibility){
            if(!amount){
                amount = 0;
            }
            return  amount / Math.pow(10,divisibility);
        }
    }


    function preciseRound(){
        return function (num,decimals){
            if(!num){
                num = 0;
            }
            var numString,numStringAfterDecimal,finalString,indexOfDot,diff;
            num = num.toFixed(decimals);
            numString = num.toString();
            indexOfDot = numString.indexOf('.');
            if(indexOfDot > 0) {
                numStringAfterDecimal = numString.slice(indexOfDot + 1);
                diff = decimals - numStringAfterDecimal.length;
                finalString = numString + '0'.repeat(diff);
            } else {
                finalString = numString + '.' + '0'.repeat(decimals);
            }

            return finalString;
        }
    }

})();