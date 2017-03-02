/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
// Ext.require([
//     'Ext.util.History'
// ]);

// Ext.util.History.init();

Ext.define('CCM_Reports.view.main.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'app-main',
    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox',
        'CCM_Reports.view.main.MainModel',
        'CCM_Reports.view.main.ReportList',
        'CCM_Reports.view.main.RepRefController'
    ],
    mixins: {
		observable: 'Ext.util.Observable'
	} ,
    viewModel: 'main',

    ui: 'navigation',

    tabBarHeaderPosition: 1,
    titleRotation: 0,
    tabRotation: 0,
    
    scroll: true,

    id: 'main-tabs',
    activeTab: 0,

    controller: 'ref',

    header: {
        layout: {
            align: 'stretchmax'
        },
        title: {
            bind: {
                text: '{name}'
            },
            flex: 0
        },
        iconCls: 'fa-th-list'
    },

    tabBar: {
        flex: 1,
        layout: {
            align: 'stretch',
            overflowHandler: 'none'
        }
        
    },

    responsiveConfig: {
        tall: {
            headerPosition: 'top'
        },
        wide: {
            headerPosition: 'left'
        }
    },

    defaults: {
        bodyPadding: 20,
        tabConfig: {
            plugins: 'responsive',
            responsiveConfig: {
                wide: {
                    iconAlign: 'left',
                    textAlign: 'left'
                },
                tall: {
                    iconAlign: 'top',
                    textAlign: 'center',
                    width: 120
                }
            }
        },
    },
    items: [{
            xtype: 'tabpanel',
            activeTab: 0,

            title: 'Home',
            id: 'homeTab',
            iconCls: 'fa-home',
            // The following grid shares a store with the classic version's grid as well!
            items: [{
                id: 'repList', 
                layout: 'fit',
                autoScroll: true,
            }
            ]
            
        }, {
            title: 'Users',
            id: 'usersTab',
            iconCls: 'fa-user',
            bind: {
                html: '{loremIpsum}'
            }
        }, {
            title: 'Groups',
            id: 'groupsTab',
            iconCls: 'fa-users',
            bind: {
                html: '{loremIpsum}'
            }
        }, {
            title: 'Settings',
            id: 'settingsTab',
            iconCls: 'fa-cog',
            bind: {
                html: '{loremIpsum}'
            }
        }],
     listeners: {
            // activate: 'clickTabBut'
            tabchange: 'onTabChange',
            afterrender: 'onAfterRender' 
        }
     

});
Ext.Ajax.request({
    url: 'http://192.168.0.32:8080/jasperserver-pro/rest_v2/resources?j_username=jasperadmin&j_password=jasperadmin',
    useDefaultXhrHeader: false,
    method: 'GET',
    headers:{              
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'
    },
    params:{
        fields: [{
            name: 'Description',
            type: 'description',
            align: 'right'
        }, 
        'uri', 'resourceType', 
        {
            name: 'creationDate',
            type: 'date',
        }, {
            name: 'updateDate',
            type: 'date'
        }
        ]
    },
    success: function(response){
        text = response.responseText;
        var jsonData = Ext.util.JSON.decode(text);
        var store = Ext.create('CCM_Reports.store.ReportStore', {
                proxy: {
                    data: jsonData
                }
        });
        store.filter('resourceType', 'reportUnit')
        store.load();
        
        var repListPanel = Ext.create('CCM_Reports.view.main.ReportList', {
            store: store,
            id: 'repTable', 
            flex: 1
        });
        var repCmp = Ext.getCmp('repList');
        repCmp.add(repListPanel);
    },

    failure: function(result) {Ext.MessageBox.alert('Error', 'Some problem occurred');}
    
});
