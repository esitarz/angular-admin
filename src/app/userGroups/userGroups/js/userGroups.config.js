angular.module('orderCloud')
    .config(UserGroupsConfig)
;

function UserGroupsConfig($stateProvider) {
    $stateProvider
        .state('userGroups', {
            parent: 'buyer',
            url: '/user-groups?search&page&pageSize&searchOn&sortBy&filters',
            templateUrl: 'userGroups/userGroups/templates/userGroups.html',
            controller: 'UserGroupsCtrl',
            controllerAs: 'userGroups',
            resolve: {
                Parameters: function($stateParams, ocParameters) {
                    return ocParameters.Get($stateParams);
                },
                UserGroupList: function(OrderCloud, Parameters) {
                    return OrderCloud.UserGroups.List(Parameters.search, Parameters.page, Parameters.pageSize, Parameters.searchOn, Parameters.sortBy, Parameters.filters, Parameters.buyerid);
                }
            }
        })
    ;
}