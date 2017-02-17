/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('CCM_Reports.store.ReportStore', {
    extend: 'Ext.data.Store',
    model: 'CCM_Reports.store.ReportsModel',
    autoLoad: false,
    //        autoSync: true,
//    model: 'ReportListModel',
    requires: [
            'Ext.data.proxy.LocalStorage',
            'Ext.data.identifier.Uuid'
        ],
//        autoDestroy: true,
    params: {
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
    proxy: {
        type: 'memory',
//                data: resp,
        reader:{
            type: 'json',
            rootProperty: 'resourceLookup'
        }
    }
});

