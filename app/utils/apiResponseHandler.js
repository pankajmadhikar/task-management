export const successResponse = (
  res,
  { statusCode = 200, message = "Success", data = null, meta = null } = {}
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    meta,
  });
};

/**
 * Standard error response
 */
export const errorResponse = (
  res,
  { statusCode = 500, message = "Something went wrong", error = null } = {}
) => {
  return res.status(statusCode).json({
    success: false,
    message,
    data: null,
    error,
  });
};

export const menualUserResponse = (
  res,
  { statusCode = 400, message = "Something went wrong", error = null } = {}
) => {
  return res.status(statusCode).json({
    success: false,
    message,
    data: null,
    error,
  });
};

export const responses = {
  created: (res, data, message = "Created successfully") =>
    successResponse(res, {
      statusCode: 201,
      message,
      data,
    }),

  updated: (res, data, message = "Updated successfully") =>
    successResponse(res, {
      statusCode: 200,
      message,
      data,
    }),

  alreadyExists: (res, message = "Already exists") =>
    errorResponse(res, {
      statusCode: 400,
      message,
    }),

  deleted: (res, message = "Deleted successfully") =>
    successResponse(res, {
      statusCode: 200,
      message,
      data: null,
    }),

  success: (res, message = "Logged in successfully", data) =>
    successResponse(res, {
      statusCode: 200,
      message,
      data: data,
    }),

  badRequest: (res, message = "Bad request", error = null) =>
    errorResponse(res, {
      statusCode: 400,
      message,
      error,
    }),

  unauthorized: (res, message = "Unauthorized") =>
    errorResponse(res, {
      statusCode: 401,
      message,
    }),

  forbidden: (res, message = "Forbidden") =>
    errorResponse(res, {
      statusCode: 403,
      message,
    }),

  notFound: (res, message = "Resource not found") =>
    errorResponse(res, {
      statusCode: 404,
      message,
    }),

  serverError: (res, error = null) =>
    errorResponse(res, {
      statusCode: 500,
      message: "Internal server error",
      //   error,
    }),

  manualResponse: (res, statusCode, message, error = null) =>
    menualUserResponse(res, {
      statusCode: statusCode,
      message: message,
    }),
};
