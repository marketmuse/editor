export default (href, { addHttps } = {}) => {
	let clean = href || '';
	
	// convert to lowercase
	clean = clean.toLowerCase();
	
	if (addHttps) {
		// if no http(s), add it to the 
		if (!clean.match(/(http(s?)):\/\//gi)) return `https://${clean}`;	
		else return clean;
	}
	
	// if https(s) found, just return
	return clean;
}