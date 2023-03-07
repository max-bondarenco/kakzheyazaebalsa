const unitMap = {
  'gal':{
    returnUnit: 'L',
    multiplier: 3.78541,
    fullName: 'gallon'
  },
  'l':{
    returnUnit: 'gal',
    multiplier: 1/3.78541,
    fullName: 'liter'
  },
  'L':{
    returnUnit: 'gal',
    multiplier: 1/3.78541,
    fullName: 'liter'
  },
  'mi':{
    returnUnit: 'km',
    multiplier: 1.60934,
    fullName: 'mile'
  },
  'km':{
    returnUnit: 'mi',
    multiplier: 1/1.60934,
    fullName: 'kilometer'
  },
  'lbs':{
    returnUnit: 'kg',
    multiplier: 0.453592,
    fullName: 'pound'
  },
  'kg': {
    returnUnit: 'lbs',
    multiplier: 1/0.453592,
    fullName: 'kilogram'
  }
}

const ConvertHandler = (req,res) => {
  let {initNum,initUnit} = req.query

  const {returnUnit,multiplier} = unitMap[initUnit]
  const returnNum = Math.round((initNum*multiplier+Number.EPSILON)*100000)/100000

  if(initUnit==='l') initUnit = 'L'

  res.status(200).json({
    initNum: Number(initNum),
    initUnit,
    returnNum: Number(returnNum),
    returnUnit,
    string:`${initNum} ${unitMap[initUnit].fullName}s converts to ${returnNum} ${unitMap[returnUnit].fullName}s`
  })
}

module.exports = {
  ConvertHandler,
  unitMap
}