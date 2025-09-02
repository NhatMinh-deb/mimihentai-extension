function execute(url, page) {
    if (!url) return Response.error("Thiếu URL thể loại");
    
    page = page || '0';
    
    url = url.replace(/page=\d+/, 'page=' + page);
    
    let response = fetch(url);
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