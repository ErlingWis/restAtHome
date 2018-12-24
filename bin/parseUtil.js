exports.isNumeric = (numstr) => isNaN(parseFloat(numstr))

exports.parseNumber = (numstr) => numstr.includes('.') ? parseFloat(numstr) : parseInt(numstr)
