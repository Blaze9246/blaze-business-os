// API Response utilities

function successResponse(data, message = 'Success') {
  return {
    success: true,
    message,
    data,
    timestamp: new Date().toISOString()
  };
}

function errorResponse(error, message = 'An error occurred', code = 500) {
  return {
    success: false,
    error,
    message,
    code,
    timestamp: new Date().toISOString()
  };
}

function paginatedResponse(data, pagination) {
  return {
    success: true,
    data,
    pagination: {
      page: pagination.page,
      limit: pagination.limit,
      total: pagination.total,
      totalPages: Math.ceil(pagination.total / pagination.limit)
    },
    timestamp: new Date().toISOString()
  };
}

module.exports = {
  successResponse,
  errorResponse,
  paginatedResponse
};
