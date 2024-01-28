const findOneApplicationQueryBody = `
query findOneApplication (
	$id: String!
) {
findOneApplication(
	id: $id
) { 
	$output
}}`;

export const findOneApplication = (args: findOneApplicationOutput) => {
	const outputStr = Object.entries(args).reduce((str, [key, value]) => {
      if(value){
        return str.concat(key + ' ');
      } else {
        return str;
      }
    }, '');
    return findOneApplicationQueryBody.replace("$output", outputStr);
}

export type findOneApplicationOutput = { 
	id?: boolean, 
	email?: boolean, 
	place?: boolean, 
	description?: boolean, 
	phone?: boolean, 
	name?: boolean, 
	telegram?: boolean, 
	instagram?: boolean, 
	enable_notification?: boolean, 
	status?: boolean, 
	date?: boolean, 
	createdAt?: boolean, 
	updatedAt?: boolean, 
	user?: boolean, 
}