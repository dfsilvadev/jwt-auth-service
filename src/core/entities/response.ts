export interface HttpResponse {
  statusCode: number;
  body: Record<string, any> | null;
}
