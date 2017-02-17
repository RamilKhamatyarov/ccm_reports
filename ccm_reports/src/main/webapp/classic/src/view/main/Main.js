/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('CCM_Reports.view.main.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'app-main',

    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox',

        'CCM_Reports.view.main.MainController',
        'CCM_Reports.view.main.MainModel'
//        'CCM_Reports.view.main.List'
//        'CCM_Reports.view.main.VisualizeSamples'
//        'CCM_Reports.view.main.LoadReport'
//        'CCM_Reports.view.main.VisualizeSamples'
//        'CCM_Reports.view.main.ReportList'
    ],

    controller: 'main',
    viewModel: 'main',

    ui: 'navigation',

    tabBarHeaderPosition: 1,
    titleRotation: 0,
    tabRotation: 0,

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
        }
    },
    items: [{
            title: 'Home',
            iconCls: 'fa-home',
            // The following grid shares a store with the classic version's grid as well!
            items: [{
//                    add: pan
    //              xtype: 'reportlist'
                    

            }]
        }, {
            title: 'Users',
            iconCls: 'fa-user',
            bind: {
                html: '{loremIpsum}'
            }
        }, {
            title: 'Groups',
            iconCls: 'fa-users',
            bind: {
                html: '{loremIpsum}'
            }
        }, {
            title: 'Settings',
            iconCls: 'fa-cog',
            bind: {
                html: '{loremIpsum}'
            }
        }]
    

});


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
        var jsonData = Ext.util.JSON.decode(text);
        setRest(jsonData);

    },

    failure: function(result) {Ext.MessageBox.alert('Error', 'Some problem occurred');}

});
function setRest(resp){
    var store = Ext.create('CCM_Reports.store.ReportStore', {

            proxy: {
                data: resp
            }
    });

    store.load();
    console.log(store.getAt(0).get('uri'));

    var pan = Ext.create('CCM_Reports.view.main.ReportList', {
        renderTo: Ext.getBody(),
//        xtype: 'reportlist',
        store: store
    });
    
//    Ext.create('CCM_Reports.view.main.Main', {
//            
//    });
};

