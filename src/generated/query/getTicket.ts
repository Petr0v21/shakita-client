const getTicketQueryBody = `
query getTicket (
	$code: String!
) {
getTicket(
	code: $code
) { 
	$output
}}`;

export const getTicket = (args: getTicketOutput) => {
	const outputStr = Object.entries(args).reduce((str, [key, value]) => {
      if(value){
        return str.concat(key + ' ');
      } else {
        return str;
      }
    }, '');
    return getTicketQueryBody.replace("$output", outputStr);
}

export type getTicketOutput = { 
	id?: boolean, 
	code?: boolean, 
	ticketType?: boolean, 
	activeTill?: boolean, 
	isActive?: boolean, 
	createdAt?: boolean, 
	updatedAt?: boolean, 
	bonus?: boolean, 
	user?: boolean, 
}