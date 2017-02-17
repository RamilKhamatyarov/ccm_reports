/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.require(['Ext.data.*', 'Ext.grid.*']);
Ext.define('CCM_Reports.view.main.ReportList', { 
    extend: 'Ext.grid.Panel',
    xtype: 'reportlist',
    width: 500,
    height: 330,
    frame: true,
    title: 'Reports',
//    store: store,
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
//Ext.define('ReportListModel', {
//    extend: 'Ext.data.Model',
//    fields: [{
//        name: 'creationDate',
//        type: 'date',
//        dateFormat: 'm-d-Y g:i A'
//    }, 'description', 'permissionMask', 
//    {
//        name: 'updateDate',
//        type: 'date'
//    },'uri', 'resourceType']
//    
//});
//// Can also be specified in the request options
//Ext.onReady(function(){
//     var creationDate = '0',
     Ext.Ajax.request({
        myArr: [],
        url: 'http://192.168.0.32:8080/jasperserver-pro/rest_v2/resources?j_username=jasperadmin&j_password=jasperadmin',
        useDefaultXhrHeader: false,
        method: 'GET',
        headers:{              
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
        },
        params:{
            fields: [{
                name: 'creationDate',
                type: 'date',
                dateFormat: 'm-d-Y g:i A'
            }, 'description', 'permissionMask', 
            {
                name: 'updateDate',
                type: 'date'
            },'uri', 'resourceType'
            ]
        },
        success: function(response){
            var text = response.responseText;
//            console.log(text); // process server response here
            var jsonData = Ext.util.JSON.decode(text);
//            console.log(jsonData);
//            var resultMessage = jsonData.data.result;
            setRest(jsonData);
            
        },
        
        failure: function(result) {Ext.MessageBox.alert('Error', 'Some problem occurred');}
        
    });
    function setRest(resp){
        var store = Ext.create('CCM_Reports.store.ReportStore', {
//            autoLoad: false,
//    //        autoSync: true,
//            model: 'ReportListModel',
//            requires: [
//                    'Ext.data.proxy.LocalStorage',
//                    'Ext.data.identifier.Uuid'
//                ],
//    //        autoDestroy: true,
//                params: {
//                    fields: [{
//                        name: 'creationDate',
//                        type: 'date',
//                        dateFormat: 'm-d-Y g:i A'
//                    }, 'description', 'permissionMask', 
//                    {
//                        name: 'updateDate',
//                        type: 'date'
//                    },'uri', 'resourceType'
//                    ]
//                }, 
                proxy: {
//                    type: 'memory',
                    data: resp
//                    reader:{
//                        type: 'json',
//                        rootProperty: 'resourceLookup'
//                    }
                }
        });

    //    function setRest(resp){
    //         console.log(resp);
          store.load();
    //       console.log(store.last);
    //    };

         console.log(store.getAt(0).get('uri'));

        Ext.create('CCM_Reports.view.main.ReportList', {
//            renderTo: Ext.getBody(),
//            width: 500,
//            height: 330,
//            frame: true,
//            title: 'Reports',
//            xtype: 'reportlist',
            store: store
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
        });
    };
//});


