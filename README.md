#ReactSortableDataMixin

**A simple and easy ReactJS mixin to easily sort your data**

[Follow me on Twitter](http://twitter.com/andrewhathaway)

## Usage

Say we have the data being set on a components state like below. We bind
the `sortData` event handler and pass the fields name. Your data will be sorted though the correct-types method and reset on the state.

```Javascript
var SortableDataMixin = require('sortable-data-mixin');

var Component = React.createClass({
  mixins : [SortableDataMixin],

  sortableFields : {
    name  : 'text',
    age   : 'number',
    dob   : 'date',
    score : 'percentage'
  },

  getInitialState : function() {
    return {
      data : [
        {
          name  : 'Andrew Hathaway',
          age   : 18,
          dob   : '1996-02-27',
          score : '99%'
        },
        {
          name  : 'Michael Wright',
          age   : 24,
          dob   : '1990-04-21',
          score : '24%'
        },
        {
          name  : 'Jordan Appleson',
          age   : 20,
          dob   : '1994-09-01',
          score : '50%'
        }
      ]
    };
  },

  render : function() {
    var rows;
    for (var i = 0; i < this.state.data.length; i++) {
      var item = this.state.data[i];

      rows.push(
        <tr>
          <td>{item.name}</td>
          <td>{item.age}</td>
          <td>{item.dob}</td>
          <td>{item.score}</td>
        </tr>
      );
    }

    return (
        <table>
          <thead>
            <tr>
              <th onClick={this.sortData.bind(null, 'name')}>Name</th>
              <th onClick={this.sortData.bind(null, 'age')}>Age</th>
              <th onClick={this.sortData.bind(null, 'dob')}>D.O.B</th>
              <th onClick={this.sortData.bind(null, 'score')}>Score</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
    );
  }

});
```


## To do
 * Add testing
 * Add more sorting methods

## License

MIT License (MIT)

Copyright (c) 2014 Andrew Hathaway, https://github.com/AndrewHathaway/ReactSortableDataMixin

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.