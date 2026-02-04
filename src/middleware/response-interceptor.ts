import { Request, Response, NextFunction } from 'express';
import { HttpStatusCode } from 'axios';

declare global {
  namespace Express {
    interface Response {
      send_accepted: (message: string, content?: unknown) => Response;
      send_badGateway: (message: string, content?: unknown) => Response;
      send_badRequest: (message: string, content?: unknown) => Response;
      send_conflict: (message: string, content?: unknown) => Response;
      send_continue: (message: string, content?: unknown) => Response;
      send_created: (message: string, content?: unknown) => Response;
      send_expectationFailed: (message: string, content?: unknown) => Response;
      send_failedDependency: (message: string, content?: unknown) => Response;
      send_forbidden: (message: string, content?: unknown) => Response;
      send_gatewayTimeout: (message: string, content?: unknown) => Response;
      send_gone: (message: string, content?: unknown) => Response;
      send_httpVersionNotSupported: (message: string, content?: unknown) => Response;
      send_imATeapot: (message: string, content?: unknown) => Response;
      send_insufficientSpaceOnResource: (message: string, content?: unknown) => Response;
      send_insufficientStorage: (message: string, content?: unknown) => Response;
      send_internalServerError: (message: string, content?: unknown) => Response;
      send_lengthRequired: (message: string, content?: unknown) => Response;
      send_locked: (message: string, content?: unknown) => Response;
      send_methodFailure: (message: string, content?: unknown) => Response;
      send_methodNotAllowed: (message: string, content?: unknown) => Response;
      send_movedPermanently: (message: string, content?: unknown) => Response;
      send_movedTemporarily: (message: string, content?: unknown) => Response;
      send_multiStatus: (message: string, content?: unknown) => Response;
      send_multipleChoices: (message: string, content?: unknown) => Response;
      send_networkAuthenticationRequired: (message: string, content?: unknown) => Response;
      send_noContent: (message: string, content?: unknown) => Response;
      send_nonAuthoritativeInformation: (message: string, content?: unknown) => Response;
      send_notAcceptable: (message: string, content?: unknown) => Response;
      send_notFound: (message: string, content?: unknown) => Response;
      send_notImplemented: (message: string, content?: unknown) => Response;
      send_notModified: (message: string, content?: unknown) => Response;
      send_ok: (message: string, content?: unknown) => Response;
      send_partialContent: (message: string, content?: unknown) => Response;
      send_paymentRequired: (message: string, content?: unknown) => Response;
      send_permanentRedirect: (message: string, content?: unknown) => Response;
      send_preconditionFailed: (message: string, content?: unknown) => Response;
      send_preconditionRequired: (message: string, content?: unknown) => Response;
      send_processing: (message: string, content?: unknown) => Response;
      send_proxyAuthenticationRequired: (message: string, content?: unknown) => Response;
      send_requestHeaderFieldsTooLarge: (message: string, content?: unknown) => Response;
      send_requestTimeout: (message: string, content?: unknown) => Response;
      send_requestTooLong: (message: string, content?: unknown) => Response;
      send_requestUriTooLong: (message: string, content?: unknown) => Response;
      send_requestedRangeNotSatisfiable: (message: string, content?: unknown) => Response;
      send_resetContent: (message: string, content?: unknown) => Response;
      send_seeOther: (message: string, content?: unknown) => Response;
      send_serviceUnavailable: (message: string, content?: unknown) => Response;
      send_switchingProtocols: (message: string, content?: unknown) => Response;
      send_temporaryRedirect: (message: string, content?: unknown) => Response;
      send_tooManyRequests: (message: string, content?: unknown) => Response;
      send_unauthorized: (message: string, content?: unknown) => Response;
      send_unprocessableEntity: (message: string, content?: unknown) => Response;
      send_unsupportedMediaType: (message: string, content?: unknown) => Response;
      send_useProxy: (message: string, content?: unknown) => Response;
    }
  }
}

const isObjectEmpty = (obj: object): boolean => Object.keys(obj).length === 0;

const camelCase = (str: string): string => str.toLowerCase().replace(/(\_\w)/g, (c) => c[1].toUpperCase());

export const responseInterceptor = (request: Request, response: Response, next: NextFunction): void => {
  for (const [status, code] of Object.entries(HttpStatusCode)) {
    if (status === 'getStatusText' || status === 'getStatusCode') continue;

    const success = ['1', '2'].includes(String(code).charAt(0));
    const methodName = 'send_' + camelCase(status);

    // eslint-disable-next-line
    (response as any)[methodName] = function (message: string, content?: unknown): Response {
      const hasContent = content && !isObjectEmpty(content);
      return this.status(code as number).json({
        status,
        code,
        success,
        message,
        data: hasContent && success ? content : undefined,
        errors: hasContent && !success ? content : undefined,
      });
    };
  }
  next();
};

export default responseInterceptor;
