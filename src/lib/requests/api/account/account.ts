import { apiRequest } from "../_request";
import { ApiListResponse } from "../_response";
import { DTOAccount } from "../../../../dtos/account/account";

export const reqAccountGetManyPublic = (): Promise<ApiListResponse<DTOAccount>> => 
  apiRequest<ApiListResponse<DTOAccount>>({ path: '/account', method: 'GET' });

