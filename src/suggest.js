function execute(url, page) {
    if (!url) {
        url = "https://mimihentai.com/api/v1/manga/random?limit=20";
    }
    
    let response = fetch(url);
    if (!response.ok) return Response.error("Lỗi kết nối API");
    
    let json = response.json();
    let data = json.map(item => ({
        name: item.title,
        link: `https://mimihentai.com/g/${item.id}`,
        host: "https://mimihentai.com",
        cover: item.coverUrl,
        description: item.description || ''
    }));
    
    return Response.success(data);
}