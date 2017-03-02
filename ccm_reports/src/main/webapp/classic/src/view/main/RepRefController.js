
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
        Ext.getCmp('repList').add(Ext.create('Ext.panel.Panel', {
            height: 625,
            width: 750,
            id: 'repContainer', 
            activeTab: 2,
            layout: {
                align: 'center',
                pack: 'center',
                type: 'hbox'
            }, 

            html: '<div id="container"></div>',
            listeners: {
                afterrender: 'addRepToHistory' 
            }
        }));
        Ext.getCmp('homeTab').getLayout().setActiveItem(Ext.getCmp('repContainer'));
        Ext.getCmp('repContainer').mask('Loading report');

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
                     Ext.getCmp('repContainer').unmask();
                };
                //show error
                function handleError(err) {
                    alert(err.message);
                }
            });
       });
       
    },

    onTabChange: function(tabPanel, tab) {
        var tabs = [],
            ownerCt = tabPanel.ownerCt,
            oldToken, newToken;

        var tokenDelimiter = ':';

        tabs.push(tab.id);
        tabs.push(tabPanel.id);

        while (ownerCt && ownerCt.is('app-main')) {
            tabs.push(ownerCt.id);
            ownerCt = ownerCt.ownerCt;
        }
        newToken = tabs.reverse().join(tokenDelimiter);
        oldToken = Ext.History.getToken();

        if (oldToken === null || oldToken.search(newToken) === -1) {
            console.log('onTabChange ' + newToken);
            Ext.History.add(newToken);
        }
    },

    onAfterRender: function() {
        Ext.History.on('change', function(token) {
            var parts, length, i;
            console.log('on After render  token' + token);
            if (token) {
                // var tokenDelimiter = ':';
                parts = token.split(':');
                length = parts.length;

                // setActiveTab in all nested tabs
                for (i = 0; i < length - 1; i++) {
                    Ext.getCmp(parts[i]).setActiveTab(Ext.getCmp(parts[i + 1]));
                }
            }
        });
        // This is the initial default state.  Necessary if you navigate starting from the
        // page without any existing history token params and go back to the start state.
        var activeTab1 = Ext.getCmp('main-tabs').getActiveTab(),
            activeTab2 = activeTab1.getActiveTab();

        this.onTabChange(activeTab1, activeTab2);
    },
    addRepToHistory: function() {
        //Add to history repContainer
        Ext.History.add('main-tabs:homeTab:repContainer');
    }
});

