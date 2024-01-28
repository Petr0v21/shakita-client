const updateMyOneApplicationQueryBody = `
mutation updateMyOneApplication (
	$id: String!, 
	$place: String, 
	$date: DateTime, 
	$status: ApplicationStatus
) {
updateMyOneApplication(
	id: $id, 
	place: $place, 
	date: $date, 
	status: $status
) { 
	$output
}}`;

export const updateMyOneApplication = (args: updateMyOneApplicationOutput) => {
	const outputStr = Object.entries(args).reduce((str, [key, value]) => {
      if(value){
        return str.concat(key + ' ');
      } else {
        return str;
      }
    }, '');
    return updateMyOneApplicationQueryBody.replace("$output", outputStr);
}

export type updateMyOneApplicationOutput = { 
	success?: boolean, 
}