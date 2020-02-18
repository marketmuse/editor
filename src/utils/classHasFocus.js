// checks if the currently element with focus
// has a given class name
export default classname => {
	if (!document) return false;

	// get element that has the focus
	const activeElement = document.activeElement;

	// return false if active element doesn't have ignore-focus class
	if (!activeElement) return false;
	if (!activeElement.className) return false;
	if (activeElement.className.indexOf(classname) === -1) return false;
	
	return true;
}