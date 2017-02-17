visualize({
    auth: {
        name: "jasperadmin",
        password: "jasperadmin"
    }
}, function (v) {

    v.resourcesSearch({
        folderUri: "/public",
        recursive: true,
        types: ["reportUnit"],
        success: renderResults,
        error: function (err) {
            alert(err);
        }
    });

    // utility function
    function renderResults(results) {
        var tbody = document.getElementById("ResultsTableContent"),
            alt = false,
            html = [];

        for (var i = 0; i < results.length; i++) {
            html.push((alt = !alt) ? '<tr>' : '<tr class="alt">');
            html.push("<td>" + results[i].label + "</td>");
            html.push("<td>" + results[i].uri + "</td>");
            html.push("<td>" + results[i].resourceType + "</td>");
            html.push("<td>" + results[i].creationDate + "</td>");
            html.push("</tr>");
        }
        tbody.innerHTML = html.join("");
    }
    
});