
Ext.define('CCM_Reports.view.main.VisualizeReport', {
    extend: 'Ext.panel.Panel',
    xtype: 'visualizereport',
        
    html: '<div id="container"></div>'
        
});

vis=visualize({
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

