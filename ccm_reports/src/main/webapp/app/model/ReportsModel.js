/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('CCM_Reports.model.ReportsModel', {
    extend: 'Ext.data.Model',
    
    fields: [{
        name: 'creationDate',
        type: 'date',
    }, 'description', 'permissionMask', 
    {
        name: 'updateDate',
        type: 'date',
    },'uri', 'resourceType']
    
});


