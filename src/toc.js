function execute(url) {
    // Trích xuất ID truyện từ URL
    let mangaId = url.split('/').pop();
    let apiUrl = `https://mimihentai.com/api/v1/manga/gallery/${mangaId}`;
    
    let response = fetch(apiUrl);
    if (!response.ok) return Response.error("Lỗi kết nối API");
    
    let json = response.json();
    
    // Sắp xếp chương theo thứ tự tăng dần
    let sortedChapters = json.sort((a, b) => a.order - b.order);
    
    let data = sortedChapters.map(chapter => ({
        name: chapter.title,
        url: `https://mimihentai.com/g/${mangaId}/chapter/${encodeURIComponent(chapter.title)}-${chapter.id}`,
        host: "https://mimihentai.com"
    }));
    
    return Response.success(data);
} 