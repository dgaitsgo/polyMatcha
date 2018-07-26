class validateStrings {

	onlyAlpha = (str) => true

	firstLetterCapitalized = (str) => true

	onlySpaces = (str) => {
		var onlySpaces = true;
		var i = 0;
		while (str[i] != undefined) {
			if (str[i] != ' ')
				return (!onlySpaces)
			i++;
		}
		return (onlySpaces)
	}
}

export default validateStrings
