import { DefaultBodyType, HttpResponseResolver, Path, RequestHandlerOptions } from "msw";

/**
 * @description  `msw` 의 Http 요청 메서드를 저장하는 객체 `http` 에서 공통적으로 사용하는  객체의 기존 속성 타입을 확장한 Type
 *
 * 파라미터가 없는 경우을 고려해 `undefined` 와 사용성 향상을 위해 속성 타입을 number | ReadonlyArray<number> 추가
 *
 * 변경점 : `string | ReadonlyArray<string>` -> `string | ReadonlyArray<string> | number | ReadonlyArray<number> | undefined`
 */
type ParamType = string | ReadonlyArray<string> | number | ReadonlyArray<number> | undefined;

/** 확장된 `msw` 의 `http` 요청 파라미터 객체 타입 */
type PathParams<KeyType extends keyof any = string> = {
  [ParamName in KeyType]: ParamType;
};

/** 확장된 `msw` 의 `http` 핸들러 타입 */
type HttpRequestHandler = <
  Params extends PathParams<keyof Params> = PathParams,
  RequestBodyType extends DefaultBodyType = DefaultBodyType,
  ResponseBodyType extends DefaultBodyType = undefined,
  RequestPath extends Path = Path,
>(
  path: RequestPath,
  resolver: HttpResponseResolver<Params, RequestBodyType, ResponseBodyType>,
  options?: RequestHandlerOptions,
) => HttpHandler;

declare module "msw" {
  export declare const http: {
    all: HttpRequestHandler;
    get: HttpRequestHandler;
    post: HttpRequestHandler;
    put: HttpRequestHandler;
    delete: HttpRequestHandler;
    patch: HttpRequestHandler;
    options: HttpRequestHandler;
  };
}
