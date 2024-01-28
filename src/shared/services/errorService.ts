import { GraphQLError } from 'graphql';
import { toast } from 'react-toastify';

export class ErrorService {
  private errCode: number | null = null;
  private errMessage: string | null = null;

  private errMessagesStatic = [
    'Forbidden',
    'Bad Request Exception',
    'Unauthorized',
    'INTERNAL_SERVER_ERROR',
  ];

  public setError(error: any) {
    try {
      this.errCode = error.response?.statusCode;
      this.errMessage = error.response?.message;
      console.error(error);
      console.log(error);
      const currentStaticError = this.errMessagesStatic.find((errValue) =>
        error.toString().includes(errValue),
      );
      toast(currentStaticError ?? 'Error', {
        type: 'error',
      });
      // switch (currentStaticError) {
      //   case 'Forbidden':
      //     toast('Forbidden', {
      //       type: 'error'
      //     });
      //     break;
      //   case 'Bad Request Exception':
      //     toast('Bad Request Exception', {
      //       type: 'error'
      //     });
      //     break;
      //   case 'Unauthorized':
      //     toast('Unauthorized', {
      //       type: 'error'
      //     });
      //     break;
      //   case 'INTERNAL_SERVER_ERROR':
      //     toast('INTERNAL_SERVER_ERROR', {
      //       type: 'error'
      //     });
      //     break;
      //   default:
      //     toast('Error', {
      //       type: 'error'
      //     });
      // }
      // errorBounderModel.setErrorsTrue();
    } catch (err) {
      console.error('ErrorService Error', err);
    }
  }
}

export const errorService = new ErrorService();
