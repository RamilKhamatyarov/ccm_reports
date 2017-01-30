/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

visualize({
    auth: {
        name: "jasperadmin",
        password: "jasperadmin",
        organization: "organization_1"
    }
}, function (v) {
    //render report from provided resource
    v("#container").report({
        resource: "/public/Samples/Reports/01._Geographic_Results_by_Segment_Report",
        error: handleError
    });
    //show error
    function handleError(err) {
        alert(err.message);
    }
});
