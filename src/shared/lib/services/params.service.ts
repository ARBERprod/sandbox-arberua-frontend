import { ParsedUrlQuery } from 'querystring';

export class ParamsService {
  params: URLSearchParams;
  private readonly dynamicKey: string;
  constructor(params: ParsedUrlQuery, dynamicKey?: string) {
    this.dynamicKey = dynamicKey || 'slug';
    this.params = this.parsedUrlQueryToURLSearchParams(params);
  }

  private parsedUrlQueryToURLSearchParams(query:ParsedUrlQuery):URLSearchParams {
    const search = new URLSearchParams();

    Object.entries(query).forEach(([key, value]) => {
      if (value && key !== this.dynamicKey) {
        if (Array.isArray(value)) {
          value.forEach((val) => search.append(key, val));
        } else {
          search.append(key, value);
        }
      }
    });
    return search;
  }

  public stringifyParams = () => this.params.toString();
}
