export interface ISlicedRequest {
  method: string | undefined;
  basePath: string | undefined;
  routeName: string | undefined;
  parameters: Array<string> | undefined;
}
