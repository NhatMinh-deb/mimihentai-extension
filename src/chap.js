function execute(url) {
    // Lấy ID từ URL dạng: https://mimihentai.com/view/12345/1 hoặc https://mimihentai.com/g/12345
    var match = url.match(/(?:view|g)\/(\d+)/);
    if (!match) return Response.error("Không tìm thấy ID chương");

    var chapterId = match[1];
    var apiUrl = "https://mimihentai.com/api/v1/manga/chapter?id=" + chapterId;

    var response = Http.get(apiUrl).string();
    if (!response) return Response.error("Không tải được dữ liệu API");

    var json = response.json();

    // Debug thử
    Console.log("URL chương: " + url);

    try {
        var json = JSON.parse(response);
        if (!json.pages || json.pages.length === 0) {
            return Response.error("Không tìm thấy ảnh trong chapter");
        }

        var imgs = json.pages.map(function(e) {
            return e.startsWith("http") ? e : "https://cdn.mimihentai.com/manga-pages/" + e;
        });

        return Response.success(imgs);
    } catch (e) {
        return Response.error("Lỗi parse JSON: " + e.message);
    }
}
