function telephoneCheck(str) {
  const phoneNumber = str.match(/\d+/g)

  if (phoneNumber.join('').length < 10 || phoneNumber.join('').length > 11)
    return false

  if (phoneNumber.join('').length === 11 && str[0] !== '1') return false

  if (phoneNumber.join('').length === 10) {
    return funcPhone10(str)
  }

  if (phoneNumber.join('').length === 11) {
    return funcPhone11(str)
  }
}

const funcPhone10 = str => {
  const regexPhoneMinusOne = /^(\d+\-\d+\-\d+|\(\d+\)\d+\-\d+|\d+)/g // NOT began 1

  if (
    str.match(regexPhoneMinusOne) !== null &&
    str.match(regexPhoneMinusOne).join('') !== str
  )
    return false

  return regexPhoneMinusOne.test(str)
}

const funcPhone11 = str => {
  const regexPhonePlusOne =
    /^1(\s|\()(\(|\d+)(-|\d+|\)|\s)(\d+|\))(-|\s)(\d+)-?\d+/g // began 1

  if (
    str.match(regexPhonePlusOne) !== null &&
    str.match(regexPhonePlusOne).join('') !== str
  )
    return false

  const anchors = str
    .match(regexPhonePlusOne)
    .join('')
    .split('')
    .reduce(
      (acc, char) => {
        if (char === '(') acc['(']++
        if (char === ')') acc[')']++

        return acc
      },
      { '(': 0, ')': 0 }
    )

  if (anchors['('] !== anchors[')']) return false

  return regexPhonePlusOne.test(str)
}

// OUTPUT: true
telephoneCheck('5555555555') // debe devolver true.
telephoneCheck('555-555-5555') // debe devolver true.
telephoneCheck('(555)555-5555') // debe devolver true.
telephoneCheck('1 555-555-5555') // debe devolver true.
telephoneCheck('1 (555) 555-5555') // debe devolver true.
telephoneCheck('1(555)555-5555') // debe devolver true.
telephoneCheck('1 555 555 5555') // debe devolver true.
telephoneCheck('1 456 789 4444') // debe devolver true.

// FIXME

// OUTPUT: false
telephoneCheck('1 555)555-5555')
telephoneCheck('555)-555-5555')
telephoneCheck('55 55-55-555-5')
telephoneCheck('-1 (757) 622-7382')
telephoneCheck('(6054756961)')
telephoneCheck('(555-555-5555')
telephoneCheck('(555)5(55?)-5555')
telephoneCheck('555-5555')
telephoneCheck('5555555')
telephoneCheck('123**&!!asdf#')
telephoneCheck('55555555')
telephoneCheck('2 (757) 622-7382')
telephoneCheck('0 (757) 622-7382')
telephoneCheck('2 757 622-7382')
telephoneCheck('10 (757) 622-7382')
telephoneCheck('27576227382')
telephoneCheck('(275)76227382')
telephoneCheck('2(757)6227382')
telephoneCheck('2(757)622-7382')
telephoneCheck('11 555-555-5555')
