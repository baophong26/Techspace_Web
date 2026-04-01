export const t = (en, vi) => {
    const isClient = typeof window !== 'undefined';
    const lang = isClient ? (localStorage.getItem('lang') || 'vi') : 'vi';
    return lang === 'vi' ? vi : en;
};

export const formatPrice = (price) => {
    const isClient = typeof window !== 'undefined';
    const curr = isClient ? (localStorage.getItem('currency') || 'VND') : 'VND';
    const numPrice = parseFloat(price);
    if (isNaN(numPrice)) return price;
    if (curr === 'USD') return (numPrice / 25000).toFixed(2) + ' $';
    if (curr === 'EUR') return (numPrice / 27000).toFixed(2) + ' €';
    return numPrice.toLocaleString('vi-VN') + ' VNĐ';
};

export const translateProductTitle = (viTitle) => {
    const dict = {
        "Áo Khoác Nam Màu Cam": "Men's Orange Jacket",
        "Áo Len Đan": "Knit Sweater",
        "Basic Slim Quần Bò": "Basic Slim Jeans",
        "Oversized Textured Áo Kiểu": "Oversized Textured Shirt",
        "Áo Khoác Da Biker": "Leather Biker Jacket",
        "Áo Kiểu Trắng Cổ V": "White V-Neck Top",
        "Quần Bò Rách": "Ripped Jeans",
        "Áo Khoác Gió Nữ": "Women's Windbreaker",
        "Phụ Kiện Kính Mát": "Sunglasses Accessory",
        "Áo Sơ Mi Nam Tay Dài": "Men's Long Sleeve Shirt"
    };
    return t(dict[viTitle] || viTitle, viTitle);
};

export const translateProductDesc = (viDesc) => {
    return t("This is a premium product line, made of high quality, breathable materials.", viDesc);
};
