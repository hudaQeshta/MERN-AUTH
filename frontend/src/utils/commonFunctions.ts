export const checkFieldValidity = (str: string, field: string) => {
  if (
    field !== 'password' &&
    /attack|fake|test|user|password|admin|root|dummy|demo|sample|fuck|shit|bitches|bitch|asshole|person|people|customer|customers|company|companies|account|accounts|operator|operators|administrator|administrators|buyer|buyers|seller|sellers|manager|managers|moderator|moderators/i.test(
      str
    )
  ) {
    return { msg: "Please don't use test or bad words", status: false }
  } else if (['name'].includes(field)) {
    if (/[!@#$%^&*()_+\=\[\]{};':'\\|,<>\/?]+/.test(str)) {
      return { msg: "Please don't use special characters", status: false }
    } else if (/[0-9]/.test(str)) {
      return { msg: "Please don't use numbers", status: false }
    } else if (str.length < 2) {
      return { msg: "Shouldn't be less than 2 characters", status: false }
    } else if (str.length > 50) {
      return { msg: "Shouldn't be more than 50 characters", status: false }
    }
  } else if (field === 'email') {
    const email = str.split('@')[0]
    const domain = str.split('@')[1]
    if (email && email.length > 50) {
      return {
        msg: "Email shouldn't be more than 50 characters",
        status: false,
      }
    } else if (domain && domain.length > 30) {
      return {
        msg: "Domain shouldn't be more than 30 characters",
        status: false,
      }
    } else if (!domain || !email) {
      return {
        msg: 'Please enter a valid email',
        status: false,
      }
    }
  } else if (field === 'password') {
    const msgs = {
      '1lc': 'One lowercase letter',
      '1ul': 'One uppercase letter',
      passl: '8 characters minimum',
      '1n': 'One numeric character',
      '1sc': '1 special character',
    }
    const validations = {} as Record<string, any>
    if (!/(?=.*[a-z])/.test(str)) {
      validations['1lc'] = {
        msg: msgs['1lc'],
        status: false,
      }
    } else {
      validations['1lc'] = {
        msg: msgs['1lc'],
        status: true,
      }
    }

    if (!/(?=.*[A-Z])/.test(str)) {
      validations['1ul'] = {
        msg: msgs['1ul'],
        status: false,
      }
    } else {
      validations['1ul'] = {
        msg: msgs['1ul'],
        status: true,
      }
    }

    if (!/(?=.{8,30})/.test(str)) {
      validations['passl'] = {
        msg: msgs['passl'],
        status: false,
      }
    } else {
      validations['passl'] = {
        msg: msgs['passl'],
        status: true,
      }
    }

    if (!/(?=.*[0-9])/.test(str)) {
      validations['1n'] = {
        msg: msgs['1n'],
        status: false,
      }
    } else {
      validations['1n'] = {
        msg: msgs['1n'],
        status: true,
      }
    }

    if (!/(?=.*[\.!\?@_#\$%<>~:`\^&\*\-])/.test(str)) {
      validations['1sc'] = {
        msg: msgs['1sc'],
        status: false,
      }
    } else {
      validations['1sc'] = {
        msg: msgs['1sc'],
        status: true,
      }
    }

    if (Object.values(validations).filter((v) => !v.status).length > 0) {
      validations['status'] = false
    } else {
      validations['status'] = true
    }

    return validations
  }
  return { msg: null, status: true }
}

export const getObjectKeyByValue = (
  object: Record<string, any>,
  value: any
) => {
  return Object.keys(object).find((key) => object[key] === value)
}
