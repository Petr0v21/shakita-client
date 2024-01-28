const updateMeQueryBody = `
mutation updateMe (
	$id: String!, 
	$email: String, 
	$phone: String, 
	$telegram: String, 
	$instagram: String, 
	$enable_notifications: Boolean, 
	$picture: String, 
	$name: String, 
	$password: String
) {
updateMe(
	id: $id, 
	email: $email, 
	phone: $phone, 
	telegram: $telegram, 
	instagram: $instagram, 
	enable_notifications: $enable_notifications, 
	picture: $picture, 
	name: $name, 
	password: $password
) { 
	$output
}}`;

export const updateMe = (args: updateMeOutput) => {
	const outputStr = Object.entries(args).reduce((str, [key, value]) => {
      if(value){
        return str.concat(key + ' ');
      } else {
        return str;
      }
    }, '');
    return updateMeQueryBody.replace("$output", outputStr);
}

export type updateMeOutput = { 
	success?: boolean, 
}