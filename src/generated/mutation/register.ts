const registerQueryBody = `
mutation register (
	$name: String!, 
	$email: String!, 
	$password: String!, 
	$phone: String!
) {
register(
	name: $name, 
	email: $email, 
	password: $password, 
	phone: $phone
) { 
	$output
}}`;

export const register = (args: registerOutput) => {
	const outputStr = Object.entries(args).reduce((str, [key, value]) => {
      if(value){
        return str.concat(key + ' ');
      } else {
        return str;
      }
    }, '');
    return registerQueryBody.replace("$output", outputStr);
}

export type registerOutput = { 
	accessToken?: boolean, 
	refreshToken?: boolean, 
}