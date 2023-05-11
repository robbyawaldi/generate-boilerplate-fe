import {
  Service,
  response,
  Get,
} from '@pt-neural-technologies-indonesia/service-api-fe';
import { IUser } from './IUser';

@Service('api')
export class TestService {
  @Get('/user/:id/:groupid')
  getUser(_: IUser & { id: string; groupid: string }) {
    return response<IUser>();
  }
}
