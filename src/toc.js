function execute(url) {
    let match = url.match(/g\/(\d+)/);
    if (!match) return Response.error("Không tìm thấy mangaId");

    let mangaId = match[1];
    let apiUrl = `https://mimihentai.com/api/v1/manga/gallery/${mangaId}`;

    let response = Http.get(apiUrl);
    if (!response.ok) return Response.error("Lỗi kết nối API");

    let json = response.json();

    // API có thể trả về { data: [...] }
    let chapters = json.data || json;
    if (!Array.isArray(chapters)) return Response.error("API không trả về mảng chương");

    // Sắp xếp tăng dần
    chapters.sort((a, b) => a.order - b.order);

    let data = chapters.map(chap => ({
        name: chap.title,
        url: `https://mimihentai.com/g/${mangaId}/chapter/${encodeURIComponent(chap.title)}-${chap.id}`,
        host: "https://mimihentai.com"
    }));

    return Response.success(data);
}
