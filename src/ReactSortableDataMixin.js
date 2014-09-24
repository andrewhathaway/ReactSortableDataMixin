/*
 * ReactSortableDataMixin - React JS Mixin to sort through data
 *
 * Copyright (c) 2014 Andrew Hathaway, https://github.com/AndrewHathaway/ReactSortableDataMixin
 *
 * The MIT License (MIT)
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var SortableDataMixin = {

  /**
   * lastSorted
   *
   * Store the last sorted field so instead
   * of resorting previous sorted data, we
   * just returned the data reversed.
   *
   * @type String
   */
  lastSorted : null,

  /**
   * SortData
   *
   * @param  String field Field to sort by
   */
  sortData : function(field) {
    if (typeof field !== 'string') {
      console.warn('String field names must be passed.');
      return;
    }

    if (!this.sortableFields[field]) {
      return;
    }

    var type = this.sortableFields[field];
    if (!this.sortingMethods[type]) {
      console.warn('No sorting method defined for type "' + type + '"');
      return;
    }

    var sortedData;
    var originalData = this.state.data;

    if (this.lastSorted == field) {
      sortedData = originalData.reverse();
    } else {
      sortedData = this.sortingMethods[type]
                       .call(this, originalData, field);
    }

    this.lastSorted = field;
    this.setState({
      data : sortedData
    });
  },

  /**
   * componentWillReceiveProps
   *
   * This is here so if the component receives new data,
   * it doesn't just keep reversing the previously sorted
   * data and therefore keeps showing correctly sorted data.
   */
  componentWillReceiveProps : function(nextProps) {
     this.lastSorted = null;
  },

  /*
   * Sorting Methods
   */
  sortingMethods : {

    /**
     * Sorts an array of objects alphabetically
     *
     * @param  Array  data  Array of objects to sort
     * @param  String field Field to sort by
     * @return Array        Sorted array of data
     *
     */
    text : function(data, field) {
      data.sort(function(a, b) {
        if (a[field] < b[field]) {
          return -1;
        }

        if (a[field] > b[field]) {
          return 1;
        }

        return 0;

      });

      return data;
    },

    /**
     * Sort an array of objects by dates
     *
     * @param  Array  data  Array of objects to sort
     * @param  String field Field to sort by
     * @return Array        Sorted array of data
     */
    date : function(data, field) {
      data.sort(function(a, b) {
        var dateOne = new Date(a[field]);
        var dateTwo = new Date(b[field]);

        if (dateOne > dateTwo) {
          return 1;
        }

        if (dateOne < dateTwo) {
          return -1;
        }

        return 0;
      });

      return data;
    },

    /**
     * Sort an array of objects by number
     *
     * @param  Array  data  Array of objects to sort
     * @param  String field Field to sort by
     * @return Array        Sorted array of data
     */
    number : function(data, field) {
      data.sort(function(a, b) {
        return a[field] - b[field];
      });

      return data;
    }
  }

};

module.exports = SortableDataMixin;