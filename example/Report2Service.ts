import {
  Service,
  response,
  Post,
} from '@pt-neural-technologies-indonesia/service-api-fe';
import { FilterRequest } from './FilterRequest';
import { Response } from './Response';

@Service('api')
export class Report2Service {
  @Post('/filter/cities')
  getFilterCities(_: FilterRequest) {
    return response<Response>();
  }

  @Post('/filter/regions')
  getFilterRegions() {
    return response<Response>();
  }

  @Post('/filter/use-cases')
  getFilterUseCase() {
    return response<Response>();
  }

  @Post('/filter/params')
  getFilterParams(_: FilterRequest) {
    return response<Response>();
  }

  @Post('/filter/districts')
  getFilterDistricts(_: FilterRequest) {
    return response<Response>();
  }

  @Post('/filter/kpis')
  getFilterKpis() {
    return response<Response>();
  }

  @Post('/summary/detail')
  getSummaryDetail(_: FilterRequest) {
    return response<Response>();
  }

  @Post('/summary/matrix')
  getSummaryMatrix(_: FilterRequest) {
    return response<Response>();
  }

  @Post('/summary/trend?=kpi:kpi')
  getSummaryTrend(_: FilterRequest & { kpi: string }) {
    return response<Response>();
  }

  @Post('/summary/execution')
  getSummaryExecution(_: FilterRequest) {
    return response<Response>();
  }

  @Post('/summary/kpi')
  getSummaryKPI(_: FilterRequest) {
    return response<Response>();
  }

  @Post('/summary/kpi/table')
  getSummaryKPITable(_: FilterRequest) {
    return response<Response>();
  }

  @Post('/summary/execution/table')
  getSummaryExecutionTable(_: FilterRequest) {
    return response<Response>();
  }

  @Post('/summary/detail/download')
  downloadSummaryDetail(_: FilterRequest) {
    return response<Response>();
  }
}
