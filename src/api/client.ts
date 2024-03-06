import { 
  BadRequestError, 
  NotFoundError,
  BadEntityError,
  RecordConflictError, 
  ApiServiceError, 
  ApiError 
} from "./errors";

export type ApiRequestParam = Record<string, string | number | boolean>;
export type ApiRequestData = Record<string, any>;
export type ApiRequestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
export type ApiEvent = "beforeRequest" | "afterRequest" | "serverClash";
export type ApiEventListener = (data?: any) => void;
export interface ApiConfig {
  host: string;
  port: number;
  protocol: string;
  version?: string;
}

export default new class ApiClient {
  private config: ApiConfig;
  private listeners: Record<ApiEvent, Array<ApiEventListener>>;
  private readonly STORAGE_KEY = '__api_config_storage_key__';

  constructor(){
    this.config = this.loadConfig();
    this.listeners = {
      beforeRequest: [],
      afterRequest: [],
      serverClash: [],
    }
  }

  /**
   * Add an event listener for a specific event
   * 
   * @param event - The name of the event to listen for. Acceptable values are "beforeRequest", "afterRequest", or "serverClash".
   * @param listener - The callback function to execute when the event occurrs.
   */
  on(event: ApiEvent, listener: ApiEventListener) {
    this.listeners[event].push(listener);
  }

  /**
   * Remove an event listener for the specified event.
   *
   * @param event - The event from which to remove the listener.
   * @param listener - The callback function to remove.
   */
  off(event: ApiEvent, listener: ApiEventListener) {
    const index = this.listeners[event].indexOf(listener);
    if (index !== -1) {
      this.listeners[event].splice(index, 1);
    }
  }

  /**
   * Trigger an event with optional data.
   *
   * @param event - The event to trigger.
   * @param data - Optional data to pass to event listeners.
   */
  private triggerEvent(event: ApiEvent, data?: any) {
    this.listeners[event].forEach(listener => listener(data));
  }

  /**
   * loads the api configuration from the local storage.
   *
   * @returns A Promise that resolves to the api configuration object.
   * @throws Error if unable to retrieve the configuration.
   */
  private loadConfig(): ApiConfig {
    const config = localStorage.getItem(this.STORAGE_KEY);
    if (config) return JSON.parse(config);
    return {
      host: "localhost",
      port: 9000,
      protocol: "http"
    }
  }

  /**
   * Sets the API configuration, clearing the current config from local storage and saving the new config.
   *
   * @param config - The new API configuration to set.
   */
  setConfig(config: ApiConfig) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(config));
    this.config = config;
  }

  /**
 * Adds query parameters to a URL if provided in the 'params' object.
 *
 * @param url - The URL to which query parameters may be added.
 * @param params - An object representing query parameters as key-value pairs.
 * @returns The URL with query parameters added, or the original URL if 'params' is undefined or empty.
 */
  private parameterizeUrl(url: string, params?: ApiRequestParam) {
    if(!params) return url;
    const _params = Object.entries(params)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');

    return `${url}?${_params}`;
  }

  /**
   * Expands a relative URI into a complete API endpoint URL using the application configuration.
   *
   * @param uri - The relative URI to expand.
   * @returns The complete API endpoint URL.
   */
  private async expandPath(uri: string, params?: ApiRequestParam): Promise<string> {
    let _uri = uri.startsWith('/') ? uri.substring(1) : uri;
    _uri = this.parameterizeUrl(uri, params);
    const version = this.config.version ?? 'v1';
    return `${this.config.protocol}://${this.config.host}:${this.config.port}/api/${version}/${_uri}`;
  }

  /**
   * Retrieves and returns the request headers for an API request.
   *
   * @returns A Headers object containing the request headers, 
   *  including Authorization and Content-Type if available.
   */
  private getRequestHeaders() {
    const headers = new Headers();
    const apiKey = sessionStorage.apiKey;
    if (apiKey) headers.append('Authorization', `${apiKey}`);
    headers.append('Content-Type', 'application/json');
    return headers;
  }

  /**
   * Handles a fetch response by processing the response based on the HTTP status code.
   *
   * @param response - The fetch response object.
   * @returns A Promise that resolves to the processed response json data.
   * @throws {BadRequestError} If the HTTP status code is 400.
   * @throws {NotFoundError} If the HTTP status code is 404.
   * @throws {BadEntityError} If the HTTP status code is 422.
   * @throws {RecordConflictError} If the HTTP status code is 409.
   * @throws {ApiServiceError} If the HTTP status code is 502.
   * @throws {ApiError} If none of the above status codes match.
   */
   private async handleResponse<T = any>(response?: Response): Promise<T> {
    if(response){
      if([200, 201].includes(response.status)) return response.json();
      const {errors, entity } = await response.json();
      switch(response.status) {
        case 400: throw new BadRequestError(response.statusText, errors);
        case 404: throw new NotFoundError(response.statusText);
        case 422: throw new BadEntityError(errors, entity);
        case 409: throw new RecordConflictError(response.statusText, errors);
        case 502: throw new ApiServiceError(errors ?? "Gateway Error")
        default: break;
      }
    }
    throw new ApiError('An internal server error has occured');
  }

  /**
   * Executes a fetch request with the specified HTTP method, URI, query parameters, and request data.
   *
   * @param uri - The resource endpoint to which the request will be made.
   * @param method - The HTTP method for the request (e.g., 'GET', 'POST', 'PUT', 'DELETE').
   * @param params - Optional query parameters to include in the request.
   * @param data - Optional request data to send in the request body.
   * @returns A Promise that resolves to the response data from the fetch request.
   */
  private async execFetch<T = any>(uri: string, method: ApiRequestMethod, params?: ApiRequestParam, data?: ApiRequestData): Promise<T> {
    this.triggerEvent("beforeRequest", { uri, method, params, data });
    const fullURL = await this.expandPath(uri, params);
    const options: RequestInit = { 
      method,
      mode: "cors", 
      headers: this.getRequestHeaders(), 
    };
    
    if(data) options.body = JSON.stringify(data);
    let response = undefined;
    try {
      response = await fetch(fullURL, options);
    } catch (e) {
      if(/NetworkError|Failed to fetch/i.test(`${e}`)) {
        this.triggerEvent("serverClash")
      }
    }
    this.triggerEvent("afterRequest", {uri, method, params, data, response });
    return this.handleResponse<T>(response);
  }

  /**
   * Perform a GET request and return the response data as JSON.
   *
   * @param uri - The resource endpoint to which the request will be made.
   * @param params - Optional query parameters.
   * @returns A Promise that resolves to the response data as JSON.
   */
  getJson<T = any>(uri: string, params?: ApiRequestParam): Promise<T> {
    return this.execFetch(uri, "GET", params);
  }

  /**
   * Perform a POST request and return the response data as JSON.
   *
   * @param uri - The resource endpoint to which the request will be made.
   * @param params - Optional query parameters.
   * @param data - Optional data object
   * @returns A Promise that resolves to the response data as JSON.
   */
  postJson<T = any>(uri: string, data?: ApiRequestData, params?: ApiRequestParam): Promise<T> {
    return this.execFetch(uri, "POST", params, data);
  }

  /**
   * Perform a PUT request and send data as JSON.
   *
   * @param uri - The resource endpoint to which the request will be made.
   * @param params - Optional query parameters.
   * @param data - The data to send as JSON.
   * @returns A Promise that resolves to the response data as JSON.
   */
  async putJson<T = any>(url: string, data: ApiRequestData, params?: ApiRequestParam): Promise<T> {
    return this.execFetch(url, "PUT", params, data)
  }

  /**
   * Perform a DELETE request.
   *
   * @param uri - The resource endpoint to which the request will be made.
   * @param params - Optional query parameters.
   * @param data - Optional data to send.
   */
  async delete(url: string, params?: ApiRequestParam, data?: ApiRequestData,): Promise<void> {
    await this.execFetch(url, "DELETE", params, data);
  }
}