angular.module('orderCloud')
    //.config(EditUserConfig)
    .controller('UserEditCtrl', UserEditController)
;

/*function EditUserConfig($stateProvider) {
    $stateProvider
        .state('users.edit', {
            url: '/:userid/edit',
            templateUrl: 'users/editUser/templates/editUser.html',
            controller: 'UserEditCtrl',
            controllerAs: 'userEdit',
            resolve: {
                SelectedUser: function($stateParams, OrderCloud) {
                    return OrderCloud.Users.Get($stateParams.userid);
                }
            }
        })

}*/


function UserEditController($exceptionHandler, $uibModalInstance, OrderCloud) {
    var vm = this;

    vm.username = angular.copy(vm.user.Username);
    vm.fullName = vm.user.FirstName ? (vm.user.FirstName + (vm.user.LastName ? ' ' + vm.user.LastName : '')) : (vm.user.LastName ? vm.user.LastName : null);
    vm.userCopy = angular.copy(vm.user);

    if (vm.user.TermsAccepted != null) {
        vm.TermsAccepted = true;
    }

    vm.Submit = function() {
        var today = new Date();
        vm.user.TermsAccepted = today;
        vm.loading = {backdrop:false};
        vm.loading.promise = OrderCloud.Users.Update(vm.user.ID, vm.userCopy)
            .then(function(data) {
                $uibModalInstance.close({update:data});
            })
            .catch(function(ex) {
                $exceptionHandler(ex)
            });
    };

    vm.Delete = function() {
        OrderCloud.Users.Delete(userid)
            .then(function() {
                $uibModalInstance.close();
            })
            .catch(function(ex) {
                $exceptionHandler(ex)
            });
    };

    vm.Cancel = function() {
        $uibModalInstance.dismiss();
    }
}
