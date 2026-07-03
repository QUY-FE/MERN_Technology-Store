export const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "Không tìm thấy file hình ảnh" });
        }
        
        
        const type = req.params.type;
        const allowedFolders = ['product', 'news', 'banner'];
        const folderName = allowedFolders.includes(type) ? type : 'general';

        
        const imageUrl = `/uploads/${folderName}/${req.file.filename}`;
        
        return res.status(200).json({ success: true, data: { url: imageUrl } });
    } catch (error) {
        console.error("Upload error:", error);
        return res.status(500).json({ success: false, message: "Lỗi server khi upload ảnh" });
    }
};

export const uploadMultipleImages = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ success: false, message: "Không tìm thấy danh sách file" });
        }
        
        const type = req.params.type;
        const allowedFolders = ['product', 'news', 'banner'];
        const folderName = allowedFolders.includes(type) ? type : 'general';

        const imageUrls = req.files.map(file => `/uploads/${folderName}/${file.filename}`);
        
        return res.status(200).json({ success: true, data: { urls: imageUrls } });
    } catch (error) {
        console.error("Upload error:", error);
        return res.status(500).json({ success: false, message: "Lỗi server khi upload ảnh" });
    }
};