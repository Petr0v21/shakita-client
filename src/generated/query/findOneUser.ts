const findOneUserQueryBody = `
query findOneUser (
	$id: String!
) {
findOneUser(
	id: $id
) { 
	$output
}}`;

export const findOneUser = (args: findOneUserOutput) => {
	const outputStr = Object.entries(args).reduce((str, [key, value]) => {
      if(value){
        return str.concat(key + ' ');
      } else {
        return str;
      }
    }, '');
    return findOneUserQueryBody.replace("$output", outputStr);
}

export type findOneUserOutput = { 
	id?: boolean, 
	email?: boolean, 
	verified_email?: boolean, 
	isGoogleAuth?: boolean, 
	picture?: boolean, 
	name?: boolean, 
	google_id?: boolean, 
	password?: boolean, 
	phone?: boolean, 
	telegram?: boolean, 
	instagram?: boolean, 
	enable_notifications?: boolean, 
	isFullAuth?: boolean, 
	role?: boolean, 
	createdAt?: boolean, 
	updatedAt?: boolean, 
	sessions?: boolean, 
	applications?: boolean, 
	bonusTickets?: boolean, 
}