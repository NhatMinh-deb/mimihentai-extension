function execute(key, page) {
    if (!key) return Response.error("Thiếu từ khóa tìm kiếm");
    
    page = page || '0';
    
    let apiUrl = `https://mimihentai.com/api/v1/manga/search?name=${encodeURIComponent(key)}&page=${page}`;
    
    let response = fetch(apiUrl);
    if (!response.ok) return Response.error("Lỗi kết nối API");
    
    let json = response.json();
    
    let data = json.data.map(item => ({
        name: item.title,
        link: `https://mimihentai.com/g/${item.id}`,
        host: "https://mimihentai.com",
        cover: item.coverUrl,
        description: item.description || ''
    }));
    
    let next = null;
    if (!json.last && typeof json.currentPage === 'number') {
        next = (json.currentPage + 1).toString();
    }
    
    return Response.success(data, next);
}