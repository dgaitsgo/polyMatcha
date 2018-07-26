// import emailcheck from 'email-existence'
import validator from 'validator'
import zxcvbn from 'zxcvbn'
import * as moment from 'moment'

class Validator {

	email = (email) => email.length <= 254 && validator.isEmail(email)

	name = (name) => validator.isAlpha(name)

	password = (password) => zxcvbn(password).score

	date = (date) => date.isValid()

	isOver18 = (birthdate) => moment().diff(birthdate, 'years') >= 18

	username = (username) => validator.isAlphanumeric(username) && username.length <= 22
}

export default Validator
