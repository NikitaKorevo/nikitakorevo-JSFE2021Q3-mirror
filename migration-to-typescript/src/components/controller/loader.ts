import { DrawNewsData, DrawSourcesData } from '../interface';

interface LoaderOptions {
  apiKey: string;
}

interface IOptions {
  [key: string]: string | null;
}

interface IResponse {
  endpoint: string;
  options?: IOptions;
}

type Callback = (data: DrawNewsData | DrawSourcesData) => void;

type UrlOptions = {
  [key: string]: string;
};

class Loader {
  baseLink: string;

  options: LoaderOptions;

  constructor(baseLink: string, options: LoaderOptions) {
    this.baseLink = baseLink;
    this.options = options;
  }

  getResponse(
    { endpoint, options = {} }: IResponse,
    callback = () => {
      console.error('No callback for GET response');
    }
  ): void {
    this.load('GET', endpoint, callback, options);
  }

  errorHandler(res: Response): Response {
    if (!res.ok) {
      if (res.status === 401 || res.status === 404)
        console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
      throw Error(res.statusText);
    }

    return res;
  }

  makeUrl(options: IOptions, endpoint: string): string {
    const urlOptions: UrlOptions = { ...this.options, ...options };
    let url = `${this.baseLink}${endpoint}?`;

    Object.keys(urlOptions).forEach((key) => {
      url += `${key}=${urlOptions[key]}&`;
    });

    return url.slice(0, -1);
  }

  load(method: string, endpoint: string, callback: Callback, options = {}): void {
    fetch(this.makeUrl(options, endpoint), { method })
      .then(this.errorHandler)
      .then((res) => res.json())
      .then((data) => callback(data))
      .catch((err) => console.error(err));
  }
}

export default Loader;
