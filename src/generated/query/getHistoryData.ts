const getHistoryDataQueryBody = `
query getHistoryData (
	$fillEmptyMonth: Boolean, 
	$startOf: DateTime, 
	$endOf: DateTime
) {
getHistoryData(
	fillEmptyMonth: $fillEmptyMonth, 
	startOf: $startOf, 
	endOf: $endOf
) { 
	$output
}}`;

export const getHistoryData = (args: getHistoryDataOutput) => {
	const outputStr = Object.entries(args).reduce((str, [key, value]) => {
      if(value){
        return str.concat(key + ' ');
      } else {
        return str;
      }
    }, '');
    return getHistoryDataQueryBody.replace("$output", outputStr);
}

export type getHistoryDataOutput = { 
	applications?: boolean, 
	users?: boolean, 
}