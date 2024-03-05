const findOneBonusQueryBody = `
query findOneBonus (
	$id: String!
) {
findOneBonus(
	id: $id
) { 
	$output
}}`;

export const findOneBonus = (args: findOneBonusOutput) => {
	const outputStr = Object.entries(args).reduce((str, [key, value]) => {
      if(value){
        return str.concat(key + ' ');
      } else {
        return str;
      }
    }, '');
    return findOneBonusQueryBody.replace("$output", outputStr);
}

export type findOneBonusOutput = { 
	id?: boolean, 
	count?: boolean, 
	asset?: boolean, 
	description?: boolean, 
	isActive?: boolean, 
	condition?: boolean, 
	level?: boolean, 
	valueType?: boolean, 
	payload?: boolean, 
	createdAt?: boolean, 
	updatedAt?: boolean, 
}