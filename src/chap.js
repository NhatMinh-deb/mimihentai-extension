function execute(url) {
    // Log URL đầu vào để debug
    Console.log("URL input: " + url);
    
    // Lấy ID chapter từ URL
    var chapterId = url.match(/chapter\/([^?/]+)/);
    if (!chapterId) return Response.error("Không tìm được ID chapter");
    chapterId = chapterId[1];
    Console.log("Chapter ID: " + chapterId);

    // Thử lấy ảnh từ API trước
    try {
        var apiUrl = 'https://mimihentai.com/api/v1/manga/chapter?id=' + chapterId;
        Console.log("Calling API: " + apiUrl);
        
        var response = Http.get(apiUrl);
        Console.log("API Response Status: " + response.status);
        Console.log("API Response Body: " + response.body);
        
        var apiResponse = response.json();
        
        if (apiResponse && apiResponse.data && apiResponse.data.pages && apiResponse.data.pages.length > 0) {
            Console.log("Found " + apiResponse.data.pages.length + " images from API");
            var imgs = apiResponse.data.pages.map(function(page) {
                return {
                    url: page,
                    headers: {
                        "Referer": "https://mimihentai.com/"
                    }
                };
            });
            return Response.success(imgs);
        } else {
            Console.log("API returned empty or invalid response");
        }
    } catch (e) {
        Console.log("API Error: " + e.toString());
        // Nếu API lỗi hoặc trả về 404, tiếp tục với cách cũ
    }

    // Fallback: Lấy ảnh từ HTML nếu API không hoạt động
    var doc = Http.get(url).html();
    if (!doc) return Response.error("Không tải được trang");

    var imgs = doc.select("div.chapter-content img").map(function(e) {
        return {
            url: e.attr("src"),
            headers: {
                "Referer": "https://mimihentai.com/"
            }
        };
    });

    if (!imgs || imgs.length === 0) {
        return Response.error("Không tìm thấy ảnh trong chapter");
    }

    return Response.success(imgs);
}
