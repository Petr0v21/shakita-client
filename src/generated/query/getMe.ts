import { findApplicationsOutput } from './findApplications';

const getMeQueryBody = `
query getMe {
    getMe { 
	$output
}}`;

const generateOutputString = (obj: any, indent: number = 2): string => {
  return Object.entries(obj).reduce((str, [key, value]) => {
    if (value) {
      if (typeof value === 'object' && Object.keys(value).length > 0) {
        const outputStrSec = generateOutputString(value, indent + 2);
        return str.concat(
          `${' '.repeat(indent)}${key} {\n${outputStrSec}${' '.repeat(
            indent,
          )}} `,
        );
      } else {
        return str.concat(`${' '.repeat(indent)}${key} `);
      }
    } else {
      return str;
    }
  }, '');
};

export const getMe = (args: findOneUserOutput) => {
  const outputStr = generateOutputString(args);
  return getMeQueryBody.replace('$output', outputStr);
};

// export const getMe = (args: findOneUserOutput) => {
//   const outputStr = Object.entries(args).reduce((str, [key, value]) => {
//     if (value) {
//       if (typeof value === 'object') {
//         const outputStrSec = Object.entries(value).reduce(
//           (str_sec, [key, value]) => {
//             if (value) {
//               return str_sec.concat(key + ' ');
//             } else {
//               return str_sec;
//             }
//           },
//           '',
//         );
//         return str.concat(key + ' {' + outputStrSec + '}' + ' ');
//       }
//       return str.concat(key + ' ');
//     } else {
//       return str;
//     }
//   }, '');
//   return getMeQueryBody.replace('$output', outputStr);
// };

export type findOneUserOutput = {
  id?: boolean;
  email?: boolean;
  verified_email?: boolean;
  isGoogleAuth?: boolean;
  picture?: boolean;
  name?: boolean;
  google_id?: boolean;
  password?: boolean;
  phone?: boolean;
  telegram?: boolean;
  instagram?: boolean;
  enable_notifications?: boolean;
  isFullAuth?: boolean;
  role?: boolean;
  createdAt?: boolean;
  updatedAt?: boolean;
  applications?: findApplicationsOutput;
  sessions?: {
    id?: boolean;
    refreshToken?: boolean;
    ip?: boolean;
    userAgent?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };
  bonusTickets?: {
    activeTill?: boolean;
    code?: boolean;
    id?: boolean;
    isActive?: boolean;
    ticketType?: boolean;
    bonus?: {
      id?: boolean;
      count?: boolean;
      asset?: boolean;
      description?: boolean;
      isActive?: boolean;
      condition?: boolean;
      level?: boolean;
      valueType?: boolean;
      payload?: boolean;
      createdAt?: boolean;
    };
  };
};
