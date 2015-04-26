/**=========================================================
 * Module: demo-buttons.js
 * Provides a simple demo for buttons actions
 =========================================================*/

App.controller('TablexEditableController', ['$scope', '$filter', '$http', 'editableOptions', 'editableThemes','$q',
  function($scope, $filter, $http, editableOptions, editableThemes, $q) {

  // editable row
  // ----------------------------------- 
  $scope.users = [
    {id: 1, name: 'awesome user1', status: 2, group: 4, groupName: 'admin'},
    {id: 2, name: 'awesome user2', status: undefined, group: 3, groupName: 'vip'},
    {id: 3, name: 'awesome user3', status: 2, group: null}
  ];
// add by fred 04252015
  $scope.products = [
    {id: 1, name: 'awesome user1', price: 2, quantity: 4, location: 3},
    {id: 2, name: 'awesome user2', price: 2, quantity: 3, location: 2},
    {id: 3, name: 'awesome user3', price: 2, quantity: 1, location: 1},
    {id: 4, name: 'awesome user4', price: 2, quantity: 1, location: 1}
  ];

  $scope.locations = [
    {value: 1, text: 'US'},
    {value: 2, text: 'Hangzhou'},
    {value: 3, text: 'Wenzhou'}
  ];

  $scope.statuses = [
    {value: 1, text: 'status1'},
    {value: 2, text: 'status2'},
    {value: 3, text: 'status3'},
    {value: 4, text: 'status4'}
  ];

  $scope.groups = [];
  $scope.loadGroups = function() {
    return $scope.groups.length ? null : $http.get('server/xeditable-groups.json').success(function(data) {
      $scope.groups = data;
    });
  };

  $scope.showGroup = function(user) {
    if(user.group && $scope.groups.length) {
      var selected = $filter('filter')($scope.groups, {id: user.group});
      return selected.length ? selected[0].text : 'Not set';
    } else {
      return user.groupName || 'Not set';
    }
  };

  $scope.showStatus = function(user) {
    var selected = [];
    if(user.status) {
      selected = $filter('filter')($scope.statuses, {value: user.status});
    }
    return selected.length ? selected[0].text : 'Not set';
  };

  $scope.showLocation = function(product) {
    var selected = [];
    if(product.location) {
      selected = $filter('filter')($scope.locations, {value: product.location});
    }
    return selected.length ? selected[0].text : 'Not set';
  };
  $scope.checkName = function(data, id) {
    if (id === 2 && data !== 'awesome') {
      return "Username 2 should be `awesome`";
    }
  };

  $scope.saveUser = function(data, id) {
    //$scope.user not updated yet
    angular.extend(data, {id: id});
    console.log('Saving Test user: ' + id);
    // return $http.post('/saveUser', data);
  };

  $scope.saveProduct = function(data, id) {
    //$scope.user not updated yet
    angular.extend(data, {id: id});
    console.log('Saving product: ' + id);
    // return $http.post('/saveUser', data);
  };

  // remove user
  $scope.removeUser = function(index) {
    $scope.users.splice(index, 1);
  };

  // remove product
  $scope.removeProduct = function(index) {
    $scope.products.splice(index, 1);
  };

  // add user
  $scope.addUser = function() {
    $scope.inserted = {
      id: $scope.users.length+1,
      name: '',
      status: null,
      group: null,
      isNew: true
    };
    $scope.users.push($scope.inserted);
  };

  // add product
  $scope.addProduct = function() {
    $scope.inserted = {
      id: $scope.products.length+1,
      name: 'Test',
      price: 0,
      location: 'US',
      quantity: 1
    };
    $scope.products.push($scope.inserted);
  };

  // editable column
  // ----------------------------------- 


  $scope.saveColumn = function(column) {
    var results = [];
    angular.forEach($scope.products, function(product) {
      // results.push($http.post('/saveColumn', {column: column, value: user[column], id: user.id}));
      console.log('Saving column: ' + column);
    });
    return $q.all(results);
  };

  // editable table
  // ----------------------------------- 

  // filter users to show
  $scope.filterUser = function(user) {
    return user.isDeleted !== true;
  };


  $scope.filterProduct = function(product) {
    return product.isDeleted !== true;
  };

  // mark user as deleted
  $scope.deleteUser = function(id) {
    var filtered = $filter('filter')($scope.users, {id: id});
    if (filtered.length) {
      filtered[0].isDeleted = true;
    }
  };

  // mark user as deleted
  $scope.deleteProduct = function(id) {
    var filtered = $filter('filter')($scope.products, {id: id});
    if (filtered.length) {
      filtered[0].isDeleted = true;
    }
  };

  // cancel all changes
  $scope.cancel = function() {
    for (var i = $scope.products.length; i--;) {
      var product = $scope.products[i];
      // undelete
      if (product.isDeleted) {
        delete product.isDeleted;
      }
      // remove new 
      if (product.isNew) {
        $scope.products.splice(i, 1);
      }
    }
  };

  // save edits
  $scope.saveTable = function() {
    var results = [];
    for (var i = $scope.products.length; i--;) {
      var product = $scope.products[i];
      // actually delete user
      if (product.isDeleted) {
        $scope.products.splice(i, 1);
      }
      // mark as not new 
      if (product.isNew) {
        product.isNew = false;
      }

      // send on server
      // results.push($http.post('/saveUser', user));
      console.log('Saving Table...');
    }

    return $q.all(results);
  };

}]);
