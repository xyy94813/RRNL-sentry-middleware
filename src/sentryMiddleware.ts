import { Breadcrumb, Severity, Hub } from '@sentry/types';
import {
  RelayNetworkLayerRequest,
  //   RelayNetworkLayerResponse,
  ConcreteBatch,
  Variables,
} from 'react-relay-network-modern';

export interface RRNLOperation extends ConcreteBatch {
  operationKind?: string;
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

function sentryMiddleware(option: SentryMiddlewareOption) {
  const { hub } = option;
  if (!hub) {
    throw Error('Sentry hub is required');
  }
  return (next: Function) => async (req: RelayNetworkLayerRequest) => {
    const { operation, variables }: { operation: RRNLOperation; variables: Variables } = req;
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
    let response = { status: -1 };
    try {
      response = await next(req);
      return response;
    } catch (err) {
      breadcrumb.level = Severity.Warning;
      response = err.res;
      throw err;
    } finally {
      data.status_code = response.status;
      breadcrumb.data = data;
      hub.addBreadcrumb(breadcrumb);
    }
  };
}

export default sentryMiddleware;
