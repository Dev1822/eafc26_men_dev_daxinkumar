const sanitizer = (req, res, next) => {
    if (req.query.text) {
        // Example sanitization: trim whitespace, convert to lowercase, and remove simple HTML tags
        let cleanText = req.query.text.trim().toLowerCase();
        cleanText = cleanText.replace(/<[^>]*>?/gm, ''); // simple html strip
        
        // Mutate the request object with the sanitized data
        req.query.text = cleanText;
    }
    
    next();
};

module.exports = sanitizer;
