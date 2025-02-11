export function handleError(res, err, statusCode = 500, message = "Server Error") {
    console.error("Error:", err.message || err);
    return res.status(statusCode).json({ error: message });
}

export function handleSuccess(res, data, statusCode = 200, message = "Success") {
    return res.status(statusCode).json({ message, data });

}



