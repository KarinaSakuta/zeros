const expressionRegExp = /\d+!{1,2}\*?/g;
const factorial1RegExp = /^\d+!\*?$/;
const factorial2RegExp = /^\d+!!\*?$/;
const valueRegExp = /\d+/;

function getPrimeFactors(value) {
  const factors = [];
  let divisor = 2;

  while(value > 2){
    if(value % divisor === 0){
      factors.push(divisor);
      value = value/ divisor;
    } else{
      divisor++;
    }
  }

  return factors;
}

function getFactorsForFactorial1(value) {
  if (value === 1) {
    return [];
  }

  return getFactorsForFactorial1(value - 1).concat(value);
}

function getFactorsForFactorial2(value) {
  if (value === 1) {
    return [];
  }

  if (value === 2) {
    return [2];
  }

  return getFactorsForFactorial2(value - 2).concat(value);
}

function getPrimeFactorsForFactorial1(value) {
  const factors = getFactorsForFactorial1(value);
  let primeFactors = [];

  factors.forEach(function (factor) {
    primeFactors = primeFactors.concat(getPrimeFactors(factor));
  });

  return primeFactors;
}

function getPrimeFactorsForFactorial2(value) {
  const factors = getFactorsForFactorial2(value);
  let primeFactors = [];

  factors.forEach(function (factor) {
    primeFactors = primeFactors.concat(getPrimeFactors(factor));
  });

  return primeFactors;
}

function getPrimeFactorsForMatch(match) {
  const value = Number(match.match(valueRegExp)[0]);

  if (factorial1RegExp.test(match)) {
    return getPrimeFactorsForFactorial1(value);
  }

  if (factorial2RegExp.test(match)) {
    return getPrimeFactorsForFactorial2(value);
  }
}

function getNumberOfZerosByPrimeFactors(primeFactors) {
  const numberOf2 = primeFactors.filter((factor) => factor === 2).length;
  const numberOf5 = primeFactors.filter((factor) => factor === 5).length;

  return Math.min(numberOf2, numberOf5);
}

module.exports = function zeros(expression) {
  const matches = expression.match(expressionRegExp);
  let primeFactors = [];

  matches.forEach(function (match) {
    const primeFactorsForMatch = getPrimeFactorsForMatch(match);

    primeFactors = primeFactors.concat(primeFactorsForMatch);
  });

  return getNumberOfZerosByPrimeFactors(primeFactors);
}
