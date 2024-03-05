import { Request, Response } from 'express';
import { WebDavMethodHandler } from '../../types/webdav.types';

export class OPTIONSRequestHandler implements WebDavMethodHandler {
  async handle(_: Request, res: Response) {
    res.header('Allow', 'OPTIONS, GET, HEAD, POST, PUT, DELETE, PROPFIND, PROPPATCH, MKCOL, COPY, MOVE, LOCK, UNLOCK');
    res.header('DAV', '1, 2, ordered-collections');
    res.status(200).send();
  }
}
