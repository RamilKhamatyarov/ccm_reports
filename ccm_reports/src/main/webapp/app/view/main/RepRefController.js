

Ext.define('CCM_Reports.view.main.RepRefController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.ref',
    requires: 'CCM_Reports.view.main.VisualizeReport',
    onItemSelected: function (sender, record) {
        // Ext.Msg.confirm('Confirm', 'Are you sure?', 'onConfirm', this);
        var uri = record.get('uri');
        // var mainId = Ext.get('body');
        // console.log(Ext.get('body'))    
        
       Ext.onReady(function(){
            // console.log(Ext.get('repContainer'));
            Ext.getCmp('repContainer').removeAll();
            Ext.getCmp('repContainer').add(Ext.create('Ext.Panel', {
                html: '<div id="container">Loading report</div>'
            }));
            // Ext.DomHelper.append('parent-div', {tag: 'div', cls: 'container', id: 'container'});
            visualize({
                auth: {
                    name: "jasperadmin",
                    password: "jasperadmin",
                    organization: "organization_1"
                }
                }, function (v) {
                //render report from provided resource
                v("#container").report({
                    resource: uri,
                    error: handleError
                });

                // setRep(v.report({
                //     resource: "/public/Samples/Reports/01._Geographic_Results_by_Segment_Report",
                //     error: handleError
                // }))

                //show error
                function handleError(err) {
                    // console.log(document.body);
                    alert(err.message);
                }
            });
            console.log(Ext.get('container'));
            
       });
    //    console.log(Ext.get('container'));
       Ext.create('CCM_Reports.view.main.VisualizeReport');
    //    function setRep(report) {
    //         console.log(report);
    //         // var repCmp = Ext.getCmp('repContainer');
    //         // repCmp.add(report);
    //    };
       
    },
    onConfirm: function (choice) {
        if (choice === 'yes') {
            //
        }
    }
});

// var uriReport;
// var uriRep = function setUri(uri) {
// //    console.log(uri);
//    function getUri() {
//         return this.uri;
//     };
// };

// function getUri(){
//     return uriRep;
// };

// console.log(uriRep.getUri());
// visualize({
//     auth: {
//         name: "jasperadmin",
//         password: "jasperadmin",
//         organization: "organization_1"
//     }
//     }, function (v) {
//     //render report from provided resource
//     v("#container").report({
//         resource: "/public/Samples/Reports/01._Geographic_Results_by_Segment_Report",
//         error: handleError
//     });
//     //show error
//     function handleError(err) {
//         // console.log(document.body);
//         alert(err.message);
//     }
// });
