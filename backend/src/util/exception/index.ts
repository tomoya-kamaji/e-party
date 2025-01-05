import { HTTPException } from 'hono/http-exception';

/**
 * BadRequest
 */
export const BadRequestException = (message: string) => {
  new HTTPException(400, {
    message,
  });
};

/**
 * Unauthorized
 */
export const UnauthorizedException = (message: string) => {
  new HTTPException(401, {
    message,
  });
};

/**
 * Forbidden
 */
export const ForbiddenException = (message: string) => {
  new HTTPException(403, {
    message,
  });
};

/**
 * NotFound
 */
export const NotFoundException = (message: string) => {
  new HTTPException(404, {
    message,
  });
};


/**
 * InternalServerError
 */
export const InternalServerErrorException = (message: string) => {
  new HTTPException(500, {
    message,
  });
};
