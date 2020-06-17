//验证电话号码
export function validPhoneFunction(rule, value, callback) {
	const reg = /^[1][3456789][0-9]{9}$/;
	const tel = /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/;
	if (value) {
		if (reg.test(value) || tel.test(value)) {
			callback(); // 校验通过
		} else {
			callback('不是正确的电话号码'); // 校验未通过
		}
	} else {
		callback();
	}
}
//验证邮箱
export function validEmailFunction(rule, value, callback) {
	const email = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
	if (value) {
		if (email.test(value)) {
			callback(); // 校验通过
		} else {
			callback('不是正确的邮箱格式'); // 校验未通过
		}
	} else {
		callback(); // 校验通过
	}
}
