/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.require(['Ext.data.*', 'Ext.grid.*']);
Ext.define('CCM_Reports.view.main.ReportList', { 
    extend: 'Ext.grid.Panel',
    requires: [
        'CCM_Reports.view.main.RepRefController'
    ],
    xtype: 'reportlist',
    controller: 'ref',
    // layout: 'fit',
    frame: true,
    height: 650,
    width: 700,
    // layout: 'fit',
    autoScroll: true,
    
    title: 'Report list',
    columns: [ {
        text: 'description',
        sortable: true,
        dataIndex: 'description',
        align: 'left',
        flex: 7,
        field: {
            xtype: 'descriptionfield'
        }
    }, 
    {
        text: "Creation Date",
        sortable: true,
        dataIndex: 'creationDate',
        flex: 1,
        renderer: Ext.util.Format.dateRenderer('d-m-y H:i'),
        // autoSizeColumn : true
    },
    {
        text: 'updateDate',
        sortable: true,
        dataIndex: 'updateDate',
        flex: 1,
        renderer: Ext.util.Format.dateRenderer('d-m-y H:i'),
    }],
    // defaults: {
    //     flex: 1
    // },
    listeners: {
        select: 'onItemSelected'
        
    }
});



