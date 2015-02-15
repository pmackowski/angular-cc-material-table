angular.module('ccMaterialTable')
       .controller('MaterialTableCtrl', MaterialTableCtrl);

function MaterialTableCtrl($scope) {

    var self = this;
    
    self.sortColumn = null;
    self.sortReverse = null;
    self.items = [];
    self.totalItems = 0;
    self.pageSize = $scope.itemsPerPage || 10;
    self.currentPage = 1;

    self.pageChanged = pageChanged;
    self.addGroupingRow = addGroupingRow;
    self.sortable = sortable;
    self.itemsNotEmpty = itemsNotEmpty;

    function itemsNotEmpty() {
        return self.items.length > 0;
    }
    
    function addGroupingRow(isFirst, currentIndex) {
        return $scope.groupByColumn && (isFirst || self.items[currentIndex-1][$scope.groupByColumn] !== self.items[currentIndex][$scope.groupByColumn]);
    }
    
    function sortable(columnName) {
        if (self.sortColumn === columnName && self.sortReverse) {
            return ' (desc)';
        } else if (self.sortColumn === columnName && !self.sortReverse) {
            return ' (asc)';
        }
    }
    
    function updateSortable(sortColumn) {
        if (sortColumn) {
            self.sortReverse = sortColumn === self.sortColumn && !self.sortReverse;
            self.sortColumn = sortColumn;
        }
    }
    
    function pageChanged(newPage, sortColumn) {
        self.currentPage = newPage;
        updateSortable(sortColumn);
        
        var ret = $scope.onPageChange({
            newPageNumber: newPage,
            search: $scope.search,
            itemsPerPage: self.pageSize,
            groupByColumn: $scope.groupByColumn,
            sortColumn: self.sortColumn,
            sortReverse: self.sortReverse
        });

        self.totalItems = ret.totalItems;
        self.items = ret.items;
    }

    self.pageChanged(1);
    $scope.$watch('search', function(){
        self.pageChanged(1);
    });

    $scope.$watch('itemsPerPage', function(itemsPerPage){
        self.pageSize = itemsPerPage;
        self.pageChanged(1);
    });
}
