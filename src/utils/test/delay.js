export default (n = 100) => {
	return new Promise(resolve => {
		setTimeout(resolve, n);
	});
}