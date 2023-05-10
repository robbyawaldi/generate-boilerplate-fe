import {
  Service,
  response,
  Get,
} from '@pt-neural-technologies-indonesia/service-api-fe';
import { IUser } from './IUser';

@Service('api')
export class TestService {
  @Get('/user:id')
  getUser(_: { id: string }) {
    return response<IUser>();
  }
}
