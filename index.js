var parse = require('ret');
var types = parse.types;

module.exports = function (re) {
    if (isRegExp(re)) re = re.source;
    else if (typeof re !== 'string') re = String(re);
    
    return (function walk (node, starHeight) {
        if (node.type === types.REPETITION) {
            starHeight ++;
            if (starHeight > 1) return false;
        }
        
        var stack = node.stack || (node.value && node.value.stack);
        if (!stack) return true;
        
        for (var i = 0; i < stack.length; i++) {
            var ok = walk(stack[i], starHeight);
            if (!ok) return false;
        }
        
        return true;
    })(parse(re), 0)
};

function isRegExp (x) {
    return {}.toString.call(x) === '[object RegExp]';
}
