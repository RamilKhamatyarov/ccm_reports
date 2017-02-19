/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.require(['Ext.data.*', 'Ext.grid.*']);
Ext.define('CCM_Reports.view.main.ReportList', { 
    extend: 'Ext.grid.Panel',
    xtype: 'reportlist',
    layout: 'fit',
    frame: true,
    title: 'Reports',
    columns: [{
        text: 'creationDate',
        width: 50,
        sortable: true,
        dataIndex: 'creationDate'
    }, {
        text: 'description',
        flex: 1,
        sortable: true,
        dataIndex: 'description',
        field: {
            xtype: 'descriptionfield'
        }
    }, {
        header: 'permissionMask',
        width: 15,
        sortable: true,
        dataIndex: 'permissionMask',
        field: {
            xtype: 'permissionMaskfield'
        }
    }, {
        text: 'uri',
        width: 120,
        sortable: true,
        dataIndex: 'uri',
        field: {
            xtype: 'urifield'
        }
    }, {
        text: 'resourceType',
        width: 50,
        sortable: true,
        dataIndex: 'uri',
        field: {
            xtype: 'resourceType'
        } 
    }]
});

//Ext.Ajax.request({
//    myArr: [],
//    // async:false,
//    url: 'http://192.168.0.32:8080/jasperserver-pro/rest_v2/resources?j_username=jasperadmin&j_password=jasperadmin',
//    useDefaultXhrHeader: false,
//    method: 'GET',
//    headers:{              
//        'Accept' : 'application/json',
//        'Content-Type' : 'application/json'
//    },
//    params:{
//        fields: [{
//            name: 'creationDate',
//            type: 'date',
//            dateFormat: 'm-d-Y g:i A'
//        }, 'description', 'permissionMask', 
//        {
//            name: 'updateDate',
//            type: 'date'
//        },'uri', 'resourceType'
//        ]
//    },
//    success: function(response){
//        text = response.responseText;
//        var jsonData = Ext.util.JSON.decode(text);
//        // setRest(jsonData);
//        // getRes();
//        // getRes.setRest(jsonData);
//        var store = Ext.create('CCM_Reports.store.ReportStore', {
//                proxy: {
//                    data: jsonData
//                }
//        });
//        store.load();
//        // console.log(store.getCount());
//         Ext.create('CCM_Reports.view.main.ReportList', {
//            // renderTo: Ext.getBody(),
//            width: 500,
//            height: 330,
//            frame: true,
//            title: 'Reports',
//            xtype: 'reportlist',
//            store: store,
//            
//            columns: [{
//                text: 'creationDate',
//                width: 50,
//                sortable: true,
//                dataIndex: 'creationDate'
//            }, {
//                text: 'description',
//                flex: 1,
//                sortable: true,
//                dataIndex: 'description',
//                field: {
//                    xtype: 'descriptionfield'
//                }
//            }, {
//                header: 'permissionMask',
//                width: 15,
//                sortable: true,
//                dataIndex: 'permissionMask',
//                field: {
//                    xtype: 'permissionMaskfield'
//                }
//            }, {
//                text: 'uri',
//                width: 120,
//                sortable: true,
//                dataIndex: 'uri',
//                field: {
//                    xtype: 'urifield'
//                }
//            }, {
//                text: 'resourceType',
//                width: 50,
//                sortable: true,
//                dataIndex: 'uri',
//                field: {
//                    xtype: 'resourceType'
//                } 
//            }]
//        });
//    },
//
//    failure: function(result) {Ext.MessageBox.alert('Error', 'Some problem occurred');}
//    
//});


// function getRes(){
//     var jsonData;
//     (function setRest(resp) {
//         jsonData = resp;
//         console.log(jsonData);
//         return jsonData;
//     })()
//     getRes.setRest = setRest;
//     console.log(jsonData);
//     return jsonData;
// }

//     store.load();

    // Ext.create('CCM_Reports.view.main.ReportList', {
    //     renderTo: Ext.getBody(),
    //     width: 500,
    //     height: 330,
    //     frame: true,
    //     title: 'Reports',
    //     xtype: 'reportlist',
    //     store: store,
        
    //     columns: [{
    //         text: 'creationDate',
    //         width: 50,
    //         sortable: true,
    //         dataIndex: 'creationDate'
    //     }, {
    //         text: 'description',
    //         flex: 1,
    //         sortable: true,
    //         dataIndex: 'description',
    //         field: {
    //             xtype: 'descriptionfield'
    //         }
    //     }, {
    //         header: 'permissionMask',
    //         width: 15,
    //         sortable: true,
    //         dataIndex: 'permissionMask',
    //         field: {
    //             xtype: 'permissionMaskfield'
    //         }
    //     }, {
    //         text: 'uri',
    //         width: 120,
    //         sortable: true,
    //         dataIndex: 'uri',
    //         field: {
    //             xtype: 'urifield'
    //         }
    //     }, {
    //         text: 'resourceType',
    //         width: 50,
    //         sortable: true,
    //         dataIndex: 'uri',
    //         field: {
    //             xtype: 'resourceType'
    //         } 
    //     }]
    // });
// };


