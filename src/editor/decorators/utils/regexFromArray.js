export default (arr = []) => new RegExp(arr.map(String).join('|'), 'gi');
