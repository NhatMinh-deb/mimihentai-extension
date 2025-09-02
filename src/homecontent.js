function execute(url, page) {
    if (!url) return Response.error("Thiếu URL");
    
    page = page || '0';
    
    url = url.replace(/page=\d+/, 'page=' + page);
    
    let response = fetch(url);
    if (!response.ok) return Response.error("Lỗi kết nối API");
    
    let json = response.json();
    
    let items = json.data || json.content || [];
    let data = items.map(item => ({
        name: item.title || item.name,
        link: `https://mimihentai.com/g/${item.id}`,
        host: "https://mimihentai.com",
        cover: item.coverUrl || item.cover,
        description: item.description || ''
    }));
    
    let next = null;
    if (json.last === false && typeof json.currentPage === 'number') {
        next = (json.currentPage + 1).toString();
    } else if (json.totalPage && json.currentPage < json.totalPage - 1) {
        next = (json.currentPage + 1).toString();
    }
    
    return Response.success(data, next);
}