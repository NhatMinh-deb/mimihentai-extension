function execute(url) {
    // Lấy ID từ URL dạng: https://mimihentai.com/view/12345/1
    var match = url.match(/view\/(\d+)/);
    if (!match) return Response.error("Không tìm thấy ID chương");

    var chapterId = match[1];
    var apiUrl = "https://mimihentai.com/api/v1/manga/chapter?id=" + chapterId;

    var response = Http.get(apiUrl).string();
    if (!response) return Response.error("Không tải được dữ liệu API");

    try {
        var json = JSON.parse(response);

        // Kiểm tra dữ liệu trả về
        if (!json.pages || json.pages.length === 0) {
            return Response.error("Không tìm thấy ảnh trong chapter");
        }

        // Tạo danh sách ảnh kèm header
        var imgs = json.pages.map(function(e) {
            var link = e.startsWith("http") ? e : "https://cdn.mimihentai.com/scraped-chapter/" + e;
            return {
                url: link,
                headers: {
                    "Referer": "https://mimihentai.com/",
                    "User-Agent": "Mozilla/5.0"
                }
            };
        });

        return Response.success(imgs);
    } catch (e) {
        return Response.error("Lỗi parse JSON: " + e.message);
    }
}
