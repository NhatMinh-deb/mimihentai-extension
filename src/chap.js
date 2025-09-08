function execute(url) {
    // Tách chapterId từ URL
    let match = url.match(/-(\d+)$/);
    if (!match) return Response.error("Không tìm thấy chapterId");

    let chapterId = match[1];
    let apiUrl = `https://mimihentai.com/api/v1/manga/chapter?id=${chapterId}`;

    let response = Http.get(apiUrl);
    if (!response.ok) return Response.error("Không tải được dữ liệu API");

    let json = response.json();

    if (!json.pages || json.pages.length === 0) {
        return Response.error("Không tìm thấy ảnh trong chapter");
    }

    // Thêm domain nếu thiếu
    let imgs = json.pages.map(e => {
        return e.startsWith("http") ? e : "https://cdn.mimihentai.com/scraped-chapter/" + e;
    });

    return Response.success(imgs);
}
