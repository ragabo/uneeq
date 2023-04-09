import { isEmailValid } from '../utils'

describe('isEmailValid', () => {
  it('should pass with valid emails', () => {
    const validEmails = [
      'email@example.com',
      'firstname.lastname@example.com',
      'email@subdomain.example.com',
      'firstname+lastname@example.com',
      '“email”@example.com',
      '1234567890@example.com',
      'email@example-one.com',
      '_______@example.com',
      'email@example.name',
      'email@example.museum',
      'email@example.co.jp',
      'firstname-lastname@example.com'
    ]

    for (const email of validEmails) {
      expect(isEmailValid(email)).toBe(true)
    }
  })

  it('should fail with invalid emails', () => {
    const invalidEmails = [
      'plainaddress',
      '#@%^%#$@#$@#.com',
      '@example.com',
      'Joe Smith <email@example.com>',
      'email.example.com',
      'email@example@example.com',
      '.email@example.com',
      'email.@example.com',
      'email..email@example.com',
      'email@example.com (Joe Smith)',
      'email@example',
      'email@111.222.333.44444',
      'email@example..com',
      'Abc..123@example.com'
    ]

    for (const email of invalidEmails) {
      expect(isEmailValid(email)).toBe(false)
    }
  })
})
