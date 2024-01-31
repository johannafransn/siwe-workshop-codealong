import Cookies from "universal-cookie"

// English, Greek, Armenian, Cyrillic, and Latin characters (mostly)
function isLetter(char: string): boolean {
	return char.toLowerCase() !== char.toUpperCase()
}

// English language exclusively
function isCharacterALetter(char: string): boolean {
	return /[a-zA-Z]/.test(char)
}

export function setCookie(jwt: string) {
	const cookie = new Cookies()
	cookie.set('siwe-workshop', jwt)
}

export function getCookie() {
	const cookie = new Cookies()
	if (cookie.get('siwe-workshop'))
		return cookie.get('siwe-workshop')
	else return null

}

export function removeCookie() {
	const cookie = new Cookies()
	if (cookie.get('siwe-workshop'))
		return cookie.remove('siwe-workshop')
	else return
}








export function shortenAddress(address: string) {
	const _address = address || "";
	const prefix = _address.startsWith("0x") ? "0x" : "";
	const isTerra = _address.startsWith("terra");
	return `${prefix}${_address
		.replace("0x", "")
		.substring(0, prefix ? 4 : 5)}...${_address.substring(
			isTerra ? _address.length - 6 : _address.length - 4
		)}`;
}
