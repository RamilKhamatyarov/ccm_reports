/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
///* 
// * To change this license header, choose License Headers in Project Properties.
// * To change this template file, choose Tools | Templates
// * and open the template in the editor.
// */
var visReady = false;
var arrReady = false;
//var results = new Array();
Ext.onReady(function(){
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
    //        success: store,
            error: function (err) {
                alert(err);
            }
        });
        
        var results = function renderResults(results) {
            return results;
        };
        console.log('Errors extracting apps there any other way i can render my Tab : ' + results[1].uri);
        
    });
    
    visReady = true;
});

if (visReady) {
    console.log('Result array for check  :    ' + results[0]);
}

console.log('Rcheck  :   false false flse ');
var arrayData;
//if (visReady) {
//    arrayData = function renderResults(results) {
//        var repParArr = [results.length/4]; var j = 0;
//        for (var i = 0; i < repParArr.length; i++) {
//            repParArr[j++] = results[i].label;
//            repParArr[j++] = results[i].uri;
//            repParArr[j++] = results[i].resourceType;
//            repParArr[j++] = results[i].creationDate;
//        }
//            
//        return repParArr;
//    };
//    console.log(arrayData[0]);
//    arrReady = true;
//};
//console.log(arrayData[0]);
arrayData = [
            [ 'Jay Garcia', 'MD', 'dd', '01-10-16'],
            [ 'Aaron Baker', 'VA', 'dd', '01-10-16'],
            [ 'Susan Smith', 'DC', 'dd', '01-10-16']
];

Ext.define('RepListModel', {
    extend: 'Ext.data.Model',
    
    fields: [
        {
            name: 'label'
        },
        {
            name: 'uri'
        },
        {
            name: 'resourceType'
        },
        {
            name: 'creationDate'
        }
    ]
});   
var repStore = Ext.create('Ext.data.Store', {
        model: 'RepListModel',

        proxy: {
            type: 'memory',
            reader: {
                model: 'RepListModel',
                type: 'array'  
            }
        }
    });

repStore.loadData(arrayData);
console.log(repStore.first());


Ext.define('CCM_Reports.view.main.RepListView', {
    extend: 'Ext.grid.Panel',
    store: repStore,
    title : 'Our first grid',
    autoHeight : true,
    selType : 'rowmodel',
    singleSelect : true,
    xtype: 'rlistview',
    columns: [
        {
            header: 'label',
                dataIndex: 'label'
            },
        {
            header: 'uri',
            dataIndex: 'uri'
        },
        {
            header: 'resourceType',
            dataIndex: 'resourceType'
        },
        {
            header: 'creationDate',
            dataIndex: 'creationDate'
        }
    ]
    
});
