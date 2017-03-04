
/* Modern RepRefController */

Ext.require([
    'Ext.util.History'
]);

Ext.util.History.init();

Ext.define('CCM_Reports.view.main.RepRefController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.ref',
    onItemSelected: function (sender, record) {

        var uri = record.get('uri');
        if (Ext.getCmp('repContainer') != null) Ext.getCmp('repContainer').destroy();
        //Creating report tab
        var repContainer = Ext.create('Ext.Panel', {
            // extend: 'Ext.Container',
            
            title: 'Reprort',
            iconCls: 'x-fa fa-file',
            id: 'repContainer',
            scrollable : {
                direction: 'vertical'
            },
            layout: 'fit',


            html: '<div id="container"></div>',
            listeners: {
                renderedchange: 'addRepToContainer'
            }
            
            
        });
        var loadMask = Ext.create('Ext.panel.Panel', {
            id: 'loadMask', 
            activeItem: 3,
            masked: {
                xtype: 'loadmask',
                message: 'Loading report',
                indicator: false
            }

        });
        Ext.getCmp('repList').add(repContainer);

        Ext.getCmp('repContainer').add(loadMask);
        
        //Loading report from jasper
        Ext.onReady(function(){
            
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
                    success: isTrue,
                    error: handleError
                    
                });
               
                //disappear load mask
                function isTrue() {
                    Ext.getCmp('loadMask').destroy();
                };
                //show error
                function handleError(err) {
                    alert(err.message);
                }
            });
       });
       
    },

    addRepToList: function() {
        //Add to history repList at the starting app
        Ext.History.add('main-tabs:repList');
    },
    addRepToContainer: function() {
        //Add to history repContainer
        Ext.History.add('main-tabs:repContainer');
        this.onBackItem();
    },
    onItemChange: function(original,target) {
        console.log(">>>>>>>>>>>> tabPanel " + original.id + "; tab " + target.id);
        var oldtoken = Ext.util.History.getToken();
        var newtoken = original.id + ":" + target.id;
        if(oldtoken === null || oldtoken.search(newtoken) === -1) {
            Ext.History.add(newtoken);
        }
        this.onBackItem();
    },

    onBackItem: function() {
        Ext.util.History.on('change', function(token) {
            if (token) {
                var pages = token.split(':');
                for (i = 0; i < pages.length - 1; i++) {
                    console.log("addRepToContainer repList " + pages[i + 1] + '   ' + Ext.getCmp(pages[i + 1]).getItemId());
                    Ext.getCmp(pages[i]).setActiveItem(Ext.getCmp(pages[i + 1]));
                }
            }
        });
    },
});

