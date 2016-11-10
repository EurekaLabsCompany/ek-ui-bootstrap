(function(){

    'use strict'
    angular.module('ek-jhipster-angular').factory('SelectFactory', SelectFactory);

    SelectFactory.$inject = ['$injector'];
    function SelectFactory($injector) {
      SelectFactory.build = build;

      function build(options){
        var entity = options.entity;
        var field = options.field;
        var serviceApi = options.serviceApi;
        var key = options.key || options.entity;
        var trackBy = options.trackBy;
        var sort = options.sort;
        var contextualInfo = options.contextualInfo;

        function createTemplate() {
            return '<select class="form-control" name="'+entity+'" '
                        + (contextualInfo == true ? ' contextual-info ' : '')
                        + ' ng-options="'+ key +' as '+ field +' for '+ entity +' in '+ entity +'SelectProvider '
                        + (trackBy ? ' track by ' + trackBy : '') +' "> ' +
                        '<option value="" ng-show="showEmpty">{{emptyLabel}}</option> '+
                    '</select> ';
        }

        var selectDirective = {
                restrict      : 'E',
                template      : createTemplate(),
                replace       : true,
                link          : link
        };

        function link($scope, $element, $attrs){
                if(angular.isDefined($attrs.contextualInfo)){
                    $scope.$on('context-changed', loadProvider);
                }

                if(angular.isDefined($attrs.filterArgs)){
                    $attrs.$observe('filterArgs', onChangeFilterArgs);
                }

                $scope.showEmpty = angular.isDefined($attrs.showEmpty) ? angular.fromJson($attrs.showEmpty) : true;
                $scope.emptyLabel = angular.isDefined($attrs.emptyLabel) ? $attrs.emptyLabel : '';

                function onChangeFilterArgs(newValue){
                    var args = {};
                    var filterValue;
                    var filterArgsValue = newValue.replace(/\s/g, '');
                    filterArgsValue = newValue.split(';');

                    for (var i = filterArgsValue.length - 1; i >= 0; i--) {
                        filterValue = filterArgsValue[i];
                        filterValue = filterValue.split('=');
                        args[filterValue[0]] = filterValue[1];
                    }

                    $scope.filterArgs = angular.copy(args);
                    loadProvider();
                }

                loadProvider();

                function loadProvider(){
                    $injector.get(serviceApi).query($scope.filterArgs).$promise.then(onLoadProvider);

                    function onLoadProvider(values) {
                        if (sort) {
                            values = values.sort(sort);
                        }
                        $scope[entity + 'SelectProvider'] = values;
                    }
                }

            }

        return selectDirective;
      }

      return SelectFactory;
    }
})();