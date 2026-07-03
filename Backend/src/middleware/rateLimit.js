import rateLimit from 'express-rate-limit';

 const createRateLimit = (windowMinutes, maxRequests, customMessage) => {
    return rateLimit({
        windowMs: windowMinutes * 60 * 1000,
        max: maxRequests,
        message: {
            success: false,
            message: customMessage || 'Bạn đã gửi quá nhiều yêu cầu. Vui lòng thử lại sau.'
        },
        standardHeaders: true,
        legacyHeaders: false, 
    });
}

export const globalLimiter = createRateLimit(15, 100, 'Hệ thống đang quá tải yêu cầu từ IP của bạn.');

export const authLimiter = createRateLimit(15, 5, 'Nhập sai quá nhiều lần. Vui lòng thử lại sau 15 phút.');

export const contactLimiter = createRateLimit(20, 5, 'Bạn đã gửi quá nhiều yêu cầu. Vui lòng thử lại sau 20 phút.');