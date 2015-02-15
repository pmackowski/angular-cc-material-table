'use strict';

var ccMaterialTable = angular.module('ccMaterialTable', [
    'ngMaterial',
    'angularUtils.directives.dirPagination'
]);

ccMaterialTable.directive('addFlex', function() {
    return {
        restrict: "A",
        link: function(scope, elem, attrs){

            var col = scope.$eval(attrs.addFlex);

            if (col.flex) {
                elem.attr('flex', col.flex);
            }
            if (col.flexSm) {
                elem.attr('flex-sm', col.flexSm);
            }

            if (col.hideSm) {
                elem.attr('hide-sm', '');
            }
        }
    };

});

ccMaterialTable.directive('ccMdTable', function(){
    return {
        restrict: 'E',
        scope: {
            columns: '=',
            search: '@',
            onPageChange: '&',
            rowExpanded: '@',
            itemsPerPage: '@',
            paginationId: '@',
            groupByColumn: '@',
            groupByTemplate: '@'
        },
        template: '\
            <div layout="column" class="cc-grid" ng-show="$materialTableCtrl.itemsNotEmpty()">\
                <div layout="row" layout-fill class="cc-grid-row-header" >\
                    <div class="cc-grid-row-content cc-grid-first-row-content" ng-show="rowExpanded">\
                    </div>\
                    <div flex layout="row" class="cc-grid-row-content">\
                        <div add-flex="{{column}}" layout-margin layout-fill layout-padding ng-repeat="column in columns" class="cc-grid-cell-content" ng-click="$materialTableCtrl.pageChanged(1, column.name)">\
                            {{ column.header }} {{ $materialTableCtrl.sortable(column.name) }} \
                        </div>\
                    </div>\
                </div>\
                <md-divider class=""></md-divider>\
                <div layout="column" layout-fill dir-paginate="item in $materialTableCtrl.items | itemsPerPage: $materialTableCtrl.pageSize" pagination-id="paginationId" current-page="$materialTableCtrl.currentPage" total-items="$materialTableCtrl.totalItems">\
                    <div layout="row" layout-margin layout-fill layout-padding class="cc-grid-row" ng-if="$materialTableCtrl.addGroupingRow($first, $index)">\
                        <ng-include src="groupByTemplate" ng-if="groupByTemplate"></ng-include>\
                        <span ng-if="!groupByTemplate">{{ $materialTableCtrl.items[$index][groupByColumn] }}</span>\
                    </div>\
                    <md-divider ng-if="$materialTableCtrl.addGroupingRow($first, $index)"></md-divider>\
                    <div layout="row" layout-fill class="cc-grid-row">\
                        <div class="cc-grid-row-content cc-grid-first-row-content" ng-show="rowExpanded" ng-click="checked = !checked">\
                            <div ng-show="checked">-</div>\
                            <div ng-show="!checked">+</div>\
                        </div>\
                        <div layout="column" layout-fill>\
                            <div flex layout="row" class="cc-grid-row-content" ng-class="{\'cc-grid-row-expanded-active\': checked}">\
                                <div add-flex="{{column}}" layout-margin layout-fill layout-padding ng-repeat="column in columns" class="cc-grid-cell-content {{column.class}}">\
                                    <ng-include src="column.custom" ng-if="column.custom"></ng-include>\
                                    <span ng-if="!column.custom">{{ item[column.name] }}</span>\
                                </div>\
                            </div>\
                            <div layout-margin layout-fill layout-padding class="cc-grid-row-content cc-grid-row-expanded-content" ng-if="checked && rowExpanded">\
                                <ng-include src="rowExpanded"></ng-include>\
                            </div>\
                        </div>\
                    </div>\
                    <md-divider></md-divider>\
                </div>\
                <div layout="row" layout-align="center" layout-padding>\
                     <dir-pagination-controls on-page-change="$materialTableCtrl.pageChanged(newPageNumber)" pagination-id="paginationId" boundary-links="true"></dir-pagination-controls>\
                </div>\
            </div>',

        controller: 'MaterialTableCtrl',
        controllerAs: '$materialTableCtrl',
        
        link: function($scope, $element, $attributes) {

        }
    };

});