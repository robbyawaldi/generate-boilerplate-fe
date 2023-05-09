import {
  Service,
  response,
  Get,
} from '@pt-neural-technologies-indonesia/service-api-fe';
import { IPerson } from './IPerson';

@Service('api')
export class TestService {
  @Get('/user:id')
  getUser(_: { id: string }) {
    return response<IPerson>();
  }
}
