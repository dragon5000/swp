var app = angular.module("main", []);


    
    
    function init(rootScope,sce,scope){
        scope.id       = "";
        scope.name     = "";
        scope.number   = "";
        scope.job      = "";
        scope.address  = "";
        angular.element(document.getElementsByClassName("view")).empty(); 
    }

    function getAllContact(http,scope){
        http.get("https://swpdragon.herokuapp.com/get_contact").then(
        function mySuccess(res){            
            scope.records= res.data.records;
        },function myError(res){
            scope.error = res;
        });
        scope.order = function(x){
            scope.orderby = x;
        }

    }
    function isAuth(http,scope,rootScope){
        http.get("https://swpdragon.herokuapp.com/auth").then(
            function mySuccess(res){
                if(res.data.auth == true){
                    rootScope.auth = true;
                    rootScope.username = res.data.username;
                }                
            });
    }
    app.controller('control_list_contacts',function($scope,$http,$sce,$location,$rootScope,$compile){
        $scope.showInsert = function show(status){
            init($rootScope,$sce,$scope);
            var html = $compile('<div class="panel panel-default" ><div class="panel-heading"><h3 class="panel-title">Contact information</h3><small>Please fill all the field</small></div><div class="panel-body"><div ng-bind-html="errorFormInsert"></div><div class="row"><div class="col-lg-6 col-md-6 col-sm-6"><div class="form-group"><label for="" class="control-label">Name</label><input class="form-control" type="text" ng-model="name" id="name" maxlength="100" required="required"/><input class="form-control" type="hidden" value="{id}" ng-model="id" required="required"/><span class="text-muted">Full name , charactor only</span><span  class="help-block"></span></div></div><div class="col-lg-6 col-md-6 col-sm-6"><div class="form-group"><label for="" class="control-label">Number</label><input class="form-control" type="tel" ng-model="number" id="number" maxlength="18" required="required"/><span class="text-muted">Phone of this contact , number only</span><span class="help-block"></span></div></div></div><div class="row"><div class="col-lg-6 col-md-6 col-sm-6"><div class="form-group"><label for="" class="control-label">Job</label><input class="form-control" type="text" ng-model="job" id="job" maxlength="50" required="required"/><span class="text-muted">Parson job , charactor only</span><span class="help-block"></span></div></div><div class="col-lg-6 col-md-6 col-sm-6"><div class="form-group"><label for="" class="control-label">Location</label><input class="form-control" type="text" ng-model="address" id="location" maxlength="500" required="required"/><span class="text-muted">Full location &amp; address</span><span class="help-block"></span></div></div></div><div class="row"><hr/><div class="col-lg-12"><div class="btn-toolbar"><button class="btn btn-primary" name="btn_edit" ng-click="add()">Send</button></div></div></div></div>')($scope);                                   
            angular.element(document.getElementsByClassName("view")).append(html);            
        };
        $scope.showEdit = function show(id,name,number,job,address){
            init($rootScope,$sce,$scope);
            $scope.id       = id;
            $scope.name     = name;
            $scope.number   = number;
            $scope.job      = job;
            $scope.address  = address;
            var html = $compile('<div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title">Contact information</h3><small>Please fill all the field</small></div><div class="panel-body"><div ng-bind-html="errorEdit"></div><div class="row"><div class="col-lg-6 col-md-6 col-sm-6"><div class="form-group"><label for="" class="control-label">Name</label><input class="form-control" type="text" ng-model="name" id="name" maxlength="100" required="required"/><input class="form-control" type="hidden" ng-model="id" required="required"/><span class="text-muted">Full name , charactor only</span><span  class="help-block"></span></div></div><div class="col-lg-6 col-md-6 col-sm-6"><div class="form-group"><label for="" class="control-label">Number</label><input class="form-control" type="tel" ng-model="number" id="number" maxlength="18" required="required"/><span class="text-muted">Phone of this contact , number only</span><span class="help-block"></span></div></div></div><div class="row"><div class="col-lg-6 col-md-6 col-sm-6"><div class="form-group"><label for="" class="control-label">Job</label><input class="form-control" type="text" ng-model="job" id="job" maxlength="50" required="required"/><span class="text-muted">Parson job , charactor only</span><span class="help-block"></span></div></div><div class="col-lg-6 col-md-6 col-sm-6"><div class="form-group"><label for="" class="control-label">Location</label><input class="form-control" type="text" ng-model="address" id="location" maxlength="500" required="required"/><span class="text-muted">Full location &amp; address</span><span class="help-block"></span></div></div></div><div class="row"><hr/><div class="col-lg-12"><div class="btn-toolbar"><button class="btn btn-primary" ng-click="edit()">Update</button>  </div></div></div></div>')($scope);                                   
            angular.element(document.getElementsByClassName("view")).append(html);            
        };
        $scope.edit = function(){
            $http.post("https://swpdragon.herokuapp.com/upd_contact",
                {"id":$scope.id,"name":$scope.name,"number":$scope.number,"job":$scope.job,"address":$scope.address}).then(
                function mySuccess(res){
                    if(res.data.error == 0){                   
                        //$scope.errorEdit = $sce.trustAsHtml(notif("Successful updated","success"));
                        getAllContact($http,$scope);
                        init($rootScope,$sce,$scope);
                    }else{
                        $scope.errorEdit = $sce.trustAsHtml(notif(res.data.error_mess,"danger"));
                    }
                },function myError(res){
                    $scope.errorEdit = $sce.trustAsHtml(notif(res.data,"danger"));
                });
        }
        getAllContact($http,$scope);
        isAuth($http,$scope,$rootScope);
        $scope.delete = function(id,index){
            $http.delete("https://swpdragon.herokuapp.com/del_contact/"+id).then(
            function mySuccess(res){
                if(res.data.error == 0){
                    //$scope.error = $sce.trustAsHtml(notif("Deleted","success"));                    
                    $scope.records.splice(index,1);
                    init($rootScope,$sce,$scope);
                }else{
                    $scope.error = $sce.trustAsHtml(notif(res.data.error_mess,"danger"));
                }
            },function myError(res){
                $scope.error = $sce.trustAsHtml(notif(res.data,"danger"));
            });
        };
     
        $scope.add = function(){
            $http.post("https://swpdragon.herokuapp.com/add_contact",{name:$scope.name,number:$scope.number,job:$scope.job,address:$scope.address}).then(
            function mySuccess(res){
                if(res.data.error == 0){
                    //$scope.errorFormInsert= $sce.trustAsHtml(notif("Successfull inserted","success"));
                    getAllContact($http,$scope);
                    init($rootScope,$sce,$scope);
                }else{
                    $scope.errorFormInsert= $sce.trustAsHtml(notif(res.data.error_mess,"danger"));
                }
            },function myError(res){
                $scope.errorFormInsert = $sce.trustAsHtml(notif(res.data,"danger"));
            });
        };

   
        $scope.signout = function(){
            $http.delete("https://swpdragon.herokuapp.com/signout").then(
                function mySuccess(res){
                    if(res.data.error == 0){
                        $scope.auth = "";
                    }
                },function myError(res){
                    $scope.error = res;
                });
        }
 
        $scope.signup = function(){
            $http.post("https://swpdragon.herokuapp.com/signup",
                {"username":$scope.username,"password":$scope.password,"email":$scope.email}).then(
                function mySuccess(res){
                    if(res.data.error == 0){
                        //$scope.error = $sce.trustAsHtml(notif("Successful sign up .","success"));
                    }else{
                        $scope.error = $sce.trustAsHtml(notif(res.data.error_mess,"danger"));
                    }
                },function myError(res){
                    $scope.error = $sce.trustAsHtml(notif(res.data,"danger"));
                });
        }
 
        $scope.signin = function(){
            $http.post("https://swpdragon.herokuapp.com/signin",
                {"username":$scope.username,"password":$scope.password}).then(
                function mySuccess(res){
                    
                    if(Object.keys(res.data).length == 0  ){
                        $scope.errorSignin = $sce.trustAsHtml(notif("username or password is wrong","danger"));
                    }else{
                        $scope.errorSignin = "succ";                        
                        $rootScope.auth = true;
                        $location.path("/");
                    }
                },function myError(res){
                    $scope.errorSignin = res;
                });
        }
    }); 
    app.controller("member_control_signout",function($scope,$http,$rootScope,$location,$sce){
        $rootScope.signout = function(){
            $http.delete("https://swpdragon.herokuapp.com/signout").then(
                function mySuccess(res){
                    $scope.error = res.data;
                    $rootScope.auth = null;
                    $location.path("/");
                });
        }
    });     
    function notif(text,type){
        switch(type){
            case "danger":
                out = "<div class='alert alert-danger'>";
                break;
            case "warning":
                out = "<div class='alert alert-warning '>";
                break;
            case "success":
                out = "<div class='alert alert-success'>";
                break;                                
        }
        out += text+"</div>";    
        return out;
    }    
    angular.bootstrap(document.getElementById("list_contacts"), ['list_contacts']);
