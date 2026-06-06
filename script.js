$(document).ready(function() {
    
    const jsonUrl = "data.json"; 

    $("#load-btn").on("click", function() {
        
        $("#content-container").empty();
        $("#error-message").addClass("hidden");
        
        $("#loader").fadeIn(300);

        $.ajax({
            url: jsonUrl,
            method: "GET",
            dataType: "json",
            success: function(data) {
                $("#loader").fadeOut(300, function() {
                    renderCards(data);
                });
            },
            error: function(xhr, status, error) {
                $("#loader").fadeOut(300, function() {
                    $("#error-message").removeClass("hidden").hide().fadeIn(400);
                });
                console.error("Помилка запиту: ", error);
            }
        });
    });

    function renderCards(items) {
        items.forEach(function(item, index) {
            const cardHtml = `
                <div class="card">
                    <img src="${item.image}" alt="${item.title}">
                    <div class="card-body">
                        <h3 class="card-title">${item.title}</h3>
                        <p class="card-desc">${item.description}</p>
                        <div class="card-price">${item.price}</div>
                    </div>
                </div>
            `;
            
            const $card = $(cardHtml);
            $("#content-container").append($card);

            $card.delay(index * 200).animate({
                opacity: 1,
                transform: "translateY(0)"
            }, {
                duration: 600,
                step: function(now, fx) {
                    if (fx.prop === "transform") {
                        $(this).css("transform", `translateY(${30 - (30 * now)}px)`);
                    }
                }
            });
        });
    }

    $(document).on("mouseenter", ".card", function() {
        $(this).css("transition", "all 0.3s ease")
               .css("transform", "translateY(-10px)")
               .css("box-shadow", "0 12px 24px rgba(0,0,0,0.15)");
    }).on("mouseleave", ".card", function() {
        $(this).css("transform", "translateY(0)")
               .css("box-shadow", "0 4px 15px rgba(0,0,0,0.1)");
    });
});