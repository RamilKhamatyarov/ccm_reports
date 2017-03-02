/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('CCM_Reports.store.ProxyRep', {
    extend: 'Ext.data.proxy.Rest',
    alias: ['store.proxyrep'],
    
    buildRequest: function(operation) {
        var me = this,
                params = Ext.applyIf(operation.getParams()||{}, me.getExtras()||{}),
                request,
                etag;
        params = Ext.applyIf(params,me.getParams(operation));
        
        request = Ext.create('Ext.data.Request', {
            params: params,
            action: operation.getAction(),
            records: operation.getRecords(),
            url: operation.getUrl(),
            operation: operation,
            proxy: me
        });
        
        request.setHeaders({
            'Authorization' : 'Basic amFzcGVyYWRtaW46amFzcGVyYWRtaW4='
        });
        
        request.setUrl(me.buildUrl(request));
        operation.setRequest(request);
        
        return request;
    },
    buildUrl: function(request) {


        var me          = this,
            operation   = request.getOperation(),
            records     = operation.getRecords() || [],
            record      = records[0],
            model       = me.getModel(),
            idProperty  = model.getIdProperty(),
            format      = me.getFormat(),
            url         = me.getUrl(request),
            params      = request.getParams() || {},
            id          = (record && !record.phantom) ? record.getId() : params[idProperty];


        // OData style RESTful urls: ../resouce(id) instead of ../resource/id
        if (me.getAppendId() && id) {


            if (!url.match(/\/$/)) {
                url += '(' + id + ')';
            }
            record.setId('');
            delete params[idProperty];
        }


        if (format) {


            if (!url.match(/\.$/)) {
                url += '.';
            }


            url += format;
        }


        request.setUrl(url);


        return me.callParent([request]);
    }
});
