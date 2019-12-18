import { Breadcrumb, Severity, Hub } from '@sentry/types';
import {
  RelayNetworkLayerRequest,
  RelayNetworkLayerResponse,
  ConcreteBatch,
  Variables,
  Middleware,
  MiddlewareNextFn,
  RelayRequestAny,
} from 'react-relay-network-modern/es';

export interface RRNLOperation extends ConcreteBatch {
  operationKind?: string;
}

export interface RelayResponse extends RelayNetworkLayerResponse {
  status: number;
}

export interface SentryMiddlewareOption {
  hub: Hub;
}

export interface SentryBreadcrumbData {
  text: string | null;
  variables: object;
  method: string | undefined;
  url?: string;
  status_code?: number;
}

function sentryMiddleware(option: SentryMiddlewareOption): Middleware {
  const { hub } = option;
  if (!hub) {
    throw Error('Sentry hub is required');
  }
  return (next: MiddlewareNextFn) => async (req: RelayRequestAny): Promise<RelayResponse> => {
    const {
      operation,
      variables,
    }: {
      operation: RRNLOperation;
      variables: Variables;
    } = req as RelayNetworkLayerRequest;
    const { name, text, operationKind } = operation;

    const breadcrumb: Breadcrumb = {
      category: 'graphql',
      type: 'http',
      level: Severity.Info,
    };

    /**
     * when type is `http`,
     * the method url and status_code will show in top,
     * like the message of type `default`
     * */
    const data: SentryBreadcrumbData = {
      url: name,
      method: operationKind,
      text,
      variables,
    };
    try {
      const response = (await next(req)) as RelayResponse;
      data.status_code = response.status;
      return response;
    } catch (err) {
      breadcrumb.level = Severity.Warning;
      const response = err.res as RelayResponse;
      data.status_code = response.status;
      throw err;
    } finally {
      breadcrumb.data = data;
      hub.addBreadcrumb(breadcrumb);
    }
  };
}

export default sentryMiddleware;
